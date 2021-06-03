import { GetStat, SaveStat } from "./StatManager.js";
import {
  MODULE_ID,
  OPT_COMPENDIUM_LINK_ENABLE,
  OPT_COMPENDIUM_LINK_SYSTEM,
} from "./Settings.js";

export async function AddAttackStandard(data) {
  let stat = GetStat();

  let combatantStat = stat.combatants.find(
    (f) => f.id === data.data.speaker.actor
  );

  let attackData = {
    id: null,
    round: stat.round,
    tokenId: null,
    actorId: null,
    advantage: false,
    isCritical: false,
    isFumble: false,
    disadvantage: false,
    attackTotal: 0,
    damageTotal: 0,
    item: {
      name: null,
      itemLink: null,
    },
  };

  if (data._roll) {
    attackData = combatantStat.events[combatantStat.events.length - 1];
  }

  attackData.tokenId = data.data.speaker.token;
  attackData.actorId = data.data.speaker.actor;

  if (data._roll) {
    let actor = game.actors.get(attackData.actorId);
    let getItem = actor.items.find(
      (i) => i.id === data.data.flags.dnd5e.roll.itemId
    );

    console.debug("FVTTEncounterStats createChatMessage - getItem", getItem);
    if (!getItem) {
      attackData.item.name = getItem.data.name;
      /*attackData.item.itemLink = _parseCompendiumItemLink(
    attackData.item.name,
    getItem.data.type
  );*/
    }

    switch (data.data.flags.dnd5e.roll.type) {
      case "attack":
        attackData.attackTotal = data._roll.total;
        attackData.advantage =
          data._roll.options.advantageMode === 1 ? true : false;
        attackData.disadvantage =
          data._roll.options.advantageMode === -1 ? true : false;
        break;
      case "damage":
        attackData.damageTotal = data._roll.total;
        if (data._roll.options.critical != null) {
          attackData.isCritical = data._roll.options.critical;
        }
        break;
    }
    //combatantStat.events[combatantStat.events.length - 1] = attackData;
  } else {
    combatantStat.events.push(attackData);
  }

  let damageTotalArray = combatantStat.events.map((m) => {
    return m.damageTotal;
  });
  combatantStat.summaryList = _getSummaryStatsFromArray(damageTotalArray);
  stat.top = _getTopStats(stat);

  await SaveStat(stat);

  return attackData;
}

export async function AddAttack(data) {
  if (!_isValidCombatant(data.actor.type)) return;

  let itemLink;

  if (game.settings.get(`${MODULE_ID}`, `${OPT_COMPENDIUM_LINK_ENABLE}`)) {
    itemLink = _parseCompendiumItemLink(data);
  }

  let stat = GetStat();

  const attackData = {
    id: data._id,
    round: stat.round,
    tokenId: data.tokenId,
    actorId: data.actor.data._id,
    advantage: data.advantage ? data.advantage : false,
    isCritical: data.isCritical,
    isFumble: data.isFumble,
    disadvantage: data.disadvantage ? data.advantage : false,
    attackTotal: data.attackTotal ? data.attackTotal : 0,
    damageTotal: data.damageTotal ? data.damageTotal : 0,
    item: {
      name: data.item.name,
      itemLink: itemLink,
    },
  };

  let combatantStat = stat.combatants.find((f) => f.id === attackData.actorId);
  combatantStat.events.push(attackData);
  let damageTotalArray = combatantStat.events.map((m) => {
    return m.damageTotal;
  });
  combatantStat.summaryList = _getSummaryStatsFromArray(damageTotalArray);
  stat.top = _getTopStats(stat);

  await SaveStat(stat);
}

export async function AddCombatants(combatants) {
  const combatant = combatants.data;
  if (!_isValidCombatant(combatant.type)) return;

  let stat = GetStat();

  const newCombatants = {
    name: combatant.name,
    id: combatant._id,
    img: combatant.img,
    type: combatant.type,
    hp: combatant.data.attributes.hp.value,
    max: combatant.data.attributes.hp.max,
    ac: combatant.data.attributes.ac.value,
    events: [],
    summaryList: {
      min: "0",
      max: "0",
      avg: "0",
      total: "0",
    },
  };

  if (!stat.combatants.find((f) => f.id === newCombatants.id)) {
    stat.combatants.push(newCombatants);
    await SaveStat(stat);
  }
}

function _isValidCombatant(type) {
  return type === "character" || type === "npc";
}

function _getTopStats(data) {
  let result = data.combatants.map((m) => {
    return {
      name: m.name,
      min: m.summaryList.min,
      max: m.summaryList.max,
      avg: m.summaryList.avg,
      total: m.summaryList.total,
    };
  });

  let maxDamage = result.reduce(function (max, obj) {
    return obj.total > max.total ? obj : max;
  });
  let highestAvgDamage = result.reduce(function (max, obj) {
    return obj.avg > max.avg ? obj : max;
  });
  let highestMaxDamage = result.reduce(function (max, obj) {
    return obj.max > max.max ? obj : max;
  });

  return {
    maxDamage: `${maxDamage.name}<br />${maxDamage.total}`,
    highestAvgDamage: `${highestAvgDamage.name}<br />${highestAvgDamage.avg}`,
    highestMaxDamage: `${highestMaxDamage.name}<br />${highestMaxDamage.max}`,
  };
}

function _add(accumulator, a) {
  return accumulator + a;
}

function _getSummaryStatsFromArray(arr) {
  return {
    min: Math.min(...arr),
    max: Math.max(...arr),
    avg: Math.round(arr.reduce(_add, 0) / arr.length),
    total: arr.reduce(_add, 0),
  };
}

function _parseCompendiumItemLink(data) {
  let itemLink;

  if (
    data.item &&
    data.item.flags &&
    data.item.flags.core &&
    data.item.flags.core.sourceId
  ) {
    let sourceId = data.item.flags.core.sourceId;
    if (sourceId.startsWith("Compendium")) {
      itemLink = `@Compendium[${sourceId.replace("Compendium.", "")}]{${
        entry.name
      }}`;
    }
  }

  if (!itemLink) {
    const gameSystem = game.settings.get(
      `${MODULE_ID}`,
      `${OPT_COMPENDIUM_LINK_SYSTEM}`
    );
    let type = "";

    switch (data.item.type) {
      case "spell":
        type = "spells";
        break;
      case "weapon":
        type = "items";
        break;
      default:
        break;
    }

    const pack = game.packs.get(`${gameSystem}.${type}`);
    let entry = pack.index.find((e) => e.name === data.item.name);
    if (entry) {
      itemLink = `@Compendium[${gameSystem}.${type}.${entry._id}]{${entry.name}}`;
    }
  }

  return itemLink;
}
