import { GetStat, SaveStat } from "./StatManager.js";
import {
  MODULE_ID,
  OPT_COMPENDIUM_LINK_ENABLE,
  OPT_COMPENDIUM_LINK_SYSTEM,
} from "./Settings.js";

export async function AddAttack(data) {
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

  await SaveStat(stat);
}

export async function AddCombatants(combatants) {
  const combatant = combatants.data;
  if (combatant.type !== "character") return null;

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
