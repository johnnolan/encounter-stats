import { ATTACKTYPES } from "./Settings.js";
import { GetStat, SaveStat } from "./StatManager.js";

function isTokenInside(template, token, wallsBlockTargeting) {
  const grid = canvas.scene.data.grid,
    templatePos = { x: template.data.x, y: template.data.y };

  const startX = token.width >= 1 ? 0.5 : token.width / 2;
  const startY = token.height >= 1 ? 0.5 : token.height / 2;

  for (let x = startX; x < token.width; x++) {
    for (let y = startY; y < token.height; y++) {
      const currGrid = {
        x: token.x + x * grid - templatePos.x,
        y: token.y + y * grid - templatePos.y,
      };
      let contains = template.shape?.contains(currGrid.x, currGrid.y);
      if (contains && wallsBlockTargeting) {
        const r = new Ray(
          { x: currGrid.x + templatePos.x, y: currGrid.y + templatePos.y },
          templatePos
        );
        contains = !canvas.walls.checkCollision(r);
      }
      if (contains) return true;
    }
  }
  return false;
}

async function templateTokens(template) {
  const tokens = canvas.tokens.placeables.map((t) => t.data);
  let targets = [];
  let tokenInside = isTokenInside;
  for (const tokenData of tokens) {
    if (tokenInside(template, tokenData, true)) {
      targets.push(tokenData._id);
    }
  }
  if (targets.length > 0) {
    let stat = GetStat();
    stat.templateHealthCheck = targets;

    if (game.modules.get("midi-qol")?.active) {
      let combatantAttackerStat = GetCombatantStatsByTokenId(
        stat,
        game.combat.current.tokenId
      );
      if (!combatantAttackerStat) return;
      let attackData =
        combatantAttackerStat.events[combatantAttackerStat.events.length - 1];
      if (attackData) {
        attackData.damageTotal = 0;
      }
    }

    await SaveStat(stat);
  }
}

export async function TargetsHit(measuredTemplateData) {
  templateTokens(measuredTemplateData._object);
}

export async function ResetTemplateHealthCheck() {
  let stat = GetStat();
  stat.templateHealthCheck = [];
  await SaveStat(stat);
}

export function IsValidRollEvent(attackType) {
  const validTypes = ["mwak", "rwak", "msak", "rsak", "save", "heal"];

  return validTypes.indexOf(attackType) > -1;
}

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

async function getIndex({ name = "", itemId = "" }) {
  var itemPacks = game.packs
    .filter((f) => f.metadata.documentName === "Item")
    .map((m) => {
      return `${m.metadata.package}.${m.metadata.name}`;
    });

  for (let key of itemPacks) {
    let pack = game.packs.get(key);
    let pack_index = pack.index.length > 1 ? pack.index : await pack.getIndex();

    if (name) {
      let item_index = pack_index.find(
        (i) => i.name.toLowerCase() === name.toLowerCase()
      );
      if (item_index) {
        let itemId = item_index._id;
        if (!itemId) {
          itemId = item_index.id;
        }
        return {
          link: `@Compendium[${key}.${itemId}]{${item_index.name}}`,
          name: item_index.name,
        };
      }
    }

    if (itemId) {
      let item_index = pack_index.find((i) => i._id === itemId);
      if (item_index) {
        let itemId = item_index._id;
        if (!itemId) {
          itemId = item_index.id;
        }
        return {
          link: `@Compendium[${key}.${itemId}]{${item_index.name}}`,
          name: item_index.name,
        };
      }
    }
  }

  if (name !== "") {
    return {
      link: undefined,
      name: name,
    };
  }
  return undefined;
}

export function GetCombatantStats(stat, actorId) {
  if (!stat?.combatants) return;
  return stat.combatants.find((f) => f.id === actorId);
}

export function GetCombatantStatsByTokenId(stat, tokenId) {
  if (!stat?.combatants) return;
  return stat.combatants.find((f) => f.tokenId === tokenId);
}

export async function GetItemData(attackData, actorId, content, itemId = null) {
  if (!itemId) {
    let match = getItemId(content);
    if (match) {
      itemId = match[2];
    }
  }
  let itemData;
  let actor = game.actors.get(actorId);
  let getItem = await actor.items.find((i) => i.id === itemId);

  if (!getItem) {
    itemData = await getIndex({ itemId: itemId });
  } else {
    itemData = await getIndex({ name: getItem.data.name });
  }

  if (!itemData) {
    attackData.actionType = "unknown";
    attackData.item.name = "unknown";
    attackData.item.itemLink = "unknown";

    if (getItem?.link && getItem?.data?.name) {
      attackData.item.name = getItem.data.name;
      attackData.item.itemLink = getItem.link;
    }
  } else {
    if (!getItem) {
      attackData.actionType = "unknown";
    } else {
      attackData.actionType = getItem.data.data.actionType;
    }

    attackData.item.name = itemData.name;
    attackData.item.itemLink = itemData.link;
  }

  return attackData;
}

export async function GetItemDataTODO(
  attackData,
  actorId,
  content,
  itemId = null
) {
  let actor = game.actors.get(actorId);

  if (!itemId) {
    let match = getItemId(content);
    if (match) {
      itemId = match[2];
    }
  }

  if (!itemId) {
    return attackData;
  }

  let compendiumOwnedItem = await getIndex({ itemId: itemId });
  let actorOwnedItem;

  if (compendiumOwnedItem) {
    attackData.item.name = compendiumOwnedItem.name;
    attackData.item.itemLink = compendiumOwnedItem.link;
    attackData.actionType = "unknown";
  } else {
    actorOwnedItem = await actor.items.find((i) => i.id === itemId);
    if (actorOwnedItem) {
      attackData.item.name = actorOwnedItem.data.name;
      attackData.item.itemLink = actorOwnedItem.link;
      attackData.actionType = actorOwnedItem.data.data.actionType;
    }
  }

  if (!compendiumOwnedItem && !actorOwnedItem) {
    attackData.actionType = "unknown";
    attackData.item.name = "unknown";
    attackData.item.itemLink = "unknown";
  }

  return attackData;
}

export function resetDamageIfAreaEffect(attackData, isAreaEffect = false) {
  if (isAreaEffect) {
    attackData.damageTotal = 0;
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
  let damageTotalArray = combatantStat.events
    .filter((f) => {
      return IsValidAttack(f.actionType);
    })
    .map((m) => {
      return m.damageTotal;
    });

  combatantStat.summaryList = _getSummaryStatsFromArray(damageTotalArray);

  let damageTotalPerRoundArray = combatantStat.events
    .filter((f) => {
      return IsValidAttack(f.actionType);
    })
    .map((m) => {
      return {
        damageTotal: m.damageTotal,
        round: m.round,
      };
    });

  combatantStat.roundSummary = _getRoundSummaryStats(damageTotalPerRoundArray);
  return combatantStat;
}

let groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

function _getRoundSummaryStats(obj) {
  let rounds = {};
  rounds.individual = groupBy(obj, "round");
  rounds.totals = [];

  for (const round in rounds.individual) {
    rounds.totals.push({
      round: round,
      damageTotal: rounds.individual[round]
        .map((m) => {
          return m.damageTotal;
        })
        .reduce(_add, 0),
    });
  }

  return rounds;
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

export function IsInCombat() {
  let stat = GetStat();
  return stat;
}
