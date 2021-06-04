import { GetStat, SaveStat } from "./StatManager.js";

const ATTACKTYPES = {
  INFO: "info",
  ATTACK: "attack",
  DAMAGE: "damage",
  NONE: "none",
};

async function getIndex({ name = "" }) {
  var itemPacks = await game.packs
    .filter((f) => f.metadata.entity === "Item")
    .map((m) => {
      return `${m.metadata.package}.${m.metadata.name}`;
    });

  for (let key of itemPacks) {
    let pack = game.packs.get(key);
    let pack_index = pack.index.length > 1 ? pack.index : await pack.getIndex();
    let item_index = pack_index.find(
      (i) => i.name.toLowerCase() === name.toLowerCase()
    );
    if (item_index)
      return {
        link: `@Compendium[${key}.${item_index._id}]{${item_index.name}}`,
        name: item_index.name,
      };
  }
  return undefined;
}

async function ChatType(data) {
  if (data.data.content) {
    let re = /(data-item-id="([a-zA-Z0-9]+)")/;
    let match = re.exec(data.data.content);
    if (match) {
      return ATTACKTYPES.INFO;
    }
  }

  if (data._roll && data.data?.flags?.dnd5e) {
    switch (data.data.flags.dnd5e.roll.type) {
      case "attack":
        return ATTACKTYPES.ATTACK;
      case "damage":
        return ATTACKTYPES.DAMAGE;
    }
  }
  return ATTACKTYPES.NONE;
}

export async function AddAttack5e(data) {
  let chatType = await ChatType(data);
  if (chatType === ATTACKTYPES.NONE) return;

  let stat = GetStat();

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

  let combatantStat = stat.combatants.find(
    (f) => f.id === data.data.speaker.actor
  );

  if (chatType === ATTACKTYPES.INFO) {
    attackData.tokenId = data.data.speaker.token;
    attackData.actorId = data.data.speaker.actor;
    let re = /(data-item-id="([a-zA-Z0-9]+)")/;
    let match = re.exec(data.data.content);
    if (match) {
      let itemId = match[2];
      let actor = game.actors.get(attackData.actorId);
      let getItem = await actor.items.find((i) => i._id === itemId);

      let itemData = await getIndex({ name: getItem.data.name });

      if (itemData) {
        attackData.item.name = itemData.name;
        attackData.item.itemLink = itemData.link;
      }
    }

    combatantStat.events.push(attackData);
  }

  if (chatType === ATTACKTYPES.ATTACK || chatType === ATTACKTYPES.DAMAGE) {
    attackData = combatantStat.events[combatantStat.events.length - 1];

    if (chatType === ATTACKTYPES.ATTACK) {
      attackData.attackTotal = data._roll.total;
      attackData.advantage =
        data._roll.options.advantageMode === 1 ? true : false;
      attackData.disadvantage =
        data._roll.options.advantageMode === -1 ? true : false;
    }
    if (chatType === ATTACKTYPES.DAMAGE) {
      attackData.damageTotal = data._roll.total;
      if (data._roll.options.critical != null) {
        attackData.isCritical = data._roll.options.critical;
      }
    }
  }

  let damageTotalArray = combatantStat.events.map((m) => {
    return m.damageTotal;
  });
  combatantStat.summaryList = _getSummaryStatsFromArray(damageTotalArray);
  stat.top = _getTopStats(stat);

  await SaveStat(stat);

  return attackData;
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
