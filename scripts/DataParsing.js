import { CreateSummaryRow } from "./Markup.js";
import {
  MODULE_ID,
  OPT_COMPENDIUM_LINK_ENABLE,
  OPT_COMPENDIUM_LINK_SYSTEM,
} from "./Settings.js";

export function CleanseCombatants(combatants) {
  const combatant = combatants.data;
  if (combatant.type !== "character") return null;

  const newCombatants = {
    name: combatant.name,
    id: combatant._id,
    img: combatant.img,
    type: combatant.type,
    hp: combatant.data.attributes.hp.value,
    max: combatant.data.attributes.hp.max,
    ac: combatant.data.attributes.ac.value,
  };

  return newCombatants;
}

function add(accumulator, a) {
  return accumulator + a;
}

export function GetSummaryStatsFromArray(arr) {
  return {
    min: Math.min(...arr),
    max: Math.max(...arr),
    avg: arr.reduce(add, 0) / arr.length,
    total: arr.reduce(add, 0),
  };
}

function parseCompendiumItemLink(data) {
  const gameSystem = game.settings.get(
    `${MODULE_ID}`,
    `${OPT_COMPENDIUM_LINK_SYSTEM}`
  );
  let itemLink;
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
  } else {
    if (
      data.item.flags &&
      data.item.flags.core &&
      data.item.flags.core.sourceId
    ) {
      let sourceId = data.item.flags.core.sourceId;
      let sourceArray = sourceId.split(".");
      if (sourceArray[0] === "Compendium") {
        itemLink = `@Compendium[${sourceArray[1]}.${sourceArray[2]}.${sourceArray[3]}]{${entry.name}}`;
      }
    }
  }

  return itemLink;
}

export function ParseAttackData(data) {
  let itemLink;

  if (game.settings.get(`${MODULE_ID}`, `${OPT_COMPENDIUM_LINK_ENABLE}`)) {
    itemLink = parseCompendiumItemLink(data);
  }

  const attackData = {
    id: data._id,
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

  return attackData;
}

export function AttackArrayFromHtml($currentHtml) {
  let combatantsList = $currentHtml.find(".fvtt-enc-stats_combatant");

  for (let i = 0; i < combatantsList.length; i++) {
    let damageTotalList = $(combatantsList[i]).find(`[data-damage-total]`);
    let damageArray = [];
    let actorId = $(combatantsList[i]).attr("data-fvtt-id");

    for (let j = 0; j < damageTotalList.length; j++) {
      damageArray.push(
        parseInt($(damageTotalList[j]).attr("data-damage-total"))
      );
    }
    const summaryList = GetSummaryStatsFromArray(damageArray);

    $currentHtml
      .find(`[data-fvtt-attack-summary-id="${actorId}"]`)
      .append(CreateSummaryRow(summaryList));
  }

  return $currentHtml;
}
