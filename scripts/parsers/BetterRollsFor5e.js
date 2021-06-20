import {
  nullChecks,
  GetItemData,
  GetCombatantStats,
  CombatantStats,
  _add,
} from "../Utils.js";

export default async function BetterRollsFor5e(stat, attackData, $html, isNew) {
  let combatantStat = GetCombatantStats(stat, $html.attr("data-actor-id"));
  if (!combatantStat) return;
  attackData.actorId = $html.attr("data-actor-id");

  if (!isNew) {
    attackData = combatantStat.events[combatantStat.events.length - 1];
  } else {
    attackData = await GetItemData(
      attackData,
      attackData.actorId,
      $html,
      $html.attr("data-item-id")
    );
  }

  $html.find(".die-icon").remove();
  let $attackRollData = $html.find('[data-type="attack"]');
  let $damageRollData = $html.find('[data-type="damage"]');
  let damageTotal = $damageRollData
    .find(".red-base-die")
    .not(".ignored")
    .map(function () {
      return parseInt($(this).attr("data-value"));
    })
    .get()
    .reduce(_add, 0);

  let attackTotal = parseInt(
    $attackRollData.find(".dice-total").not(".ignored").text().trim()
  );
  if (isNaN(attackTotal)) attackTotal = 0;
  if (isNaN(damageTotal)) damageTotal = 0;

  attackData.advantage =
    $attackRollData.attr("data-rollState") === "highest" ? true : false;
  attackData.isCritical = $html.attr("data-critical") === "true" ? true : false;
  attackData.isFumble = false;
  attackData.disadvantage =
    $attackRollData.attr("data-rollState") === "lowest" ? true : false;
  attackData.attackTotal = attackTotal;
  attackData.damageTotal = damageTotal;
  attackData.itemId = $html.attr("data-item-id");

  attackData = nullChecks(attackData);

  if (isNew) {
    combatantStat.events.push(attackData);
  }

  combatantStat = CombatantStats(combatantStat);

  return stat;
}
