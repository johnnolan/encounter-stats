import { ATTACKTYPES } from "./Settings.js";

export function IsValidAttack(attackType) {
  const validTypes = ["mwak", "rwak", "msak", "rsak", "save"];

  return validTypes.indexOf(attackType) > -1;
}

export function IsHealingSpell(attackType) {
  const validTypes = ["heal"];

  return validTypes.indexOf(attackType) > -1;
}

function getItemId(content) {
  let re = /(data-item-id="([a-zA-Z0-9]+)")/;
  let match = re.exec(content);
  return match;
}

export async function ChatType(data) {
  if (data?.data?.content) {
    let match = getItemId(data.data.content);
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

  // If other forumla TODO: This will cause issues with translations
  if (data.data?.flavor?.toLowerCase().indexOf("other formula") > -1) {
    return ATTACKTYPES.DAMAGE_FORMULA;
  }
  return ATTACKTYPES.NONE;
}

export async function getIndex({ name = "" }) {
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

export function GetCombatantStats(stat, actorId) {
  if (!stat?.combatants) return;
  return stat.combatants.find((f) => f.id === actorId);
}

export async function GetItemData(attackData, actorId, content, itemId = null) {
  if (!itemId) {
    let match = getItemId(content);
    if (match) {
      itemId = match[2];
    }
  }
  let actor = game.actors.get(actorId);
  let getItem = await actor.items.find((i) => i._id === itemId);

  let itemData = await getIndex({ name: getItem.data.name });
  if (itemData) {
    attackData.item.name = itemData.name;
    attackData.item.itemLink = itemData.link;
  }

  return attackData;
}

export function nullChecks(attackData) {
  if (
    isNaN(attackData.attackTotal) ||
    attackData.attackTotal === null ||
    attackData.attackTotal === undefined
  ) {
    attackData.attackTotal = 0;
  }
  if (
    isNaN(attackData.damageTotal) ||
    attackData.damageTotal === null ||
    attackData.damageTotal === undefined
  ) {
    attackData.damageTotal = 0;
  }

  return attackData;
}

export async function CombatantStats(combatantStat) {
  let damageTotalArray = combatantStat.events.map((m) => {
    return m.damageTotal;
  });

  combatantStat.summaryList = _getSummaryStatsFromArray(damageTotalArray);
  return combatantStat;
}

export function _add(accumulator, a) {
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
