import {
  nullChecks,
  resetDamageIfAreaEffect,
  GetItemData,
  GetCombatantStats,
  CombatantStats,
  _add,
} from "../Utils.js";

export default async function Mars5e(stat, attackData, data) {
  if (!data.mars5eStatistics || !data.id) return;
  const rollContent = $(data.data.content);
  const actorId = rollContent.data("actor-id");
  const itemId = rollContent.data("item-id");

  let combatantStat = GetCombatantStats(stat, actorId);

  if (!combatantStat) return;
  const eventsLength = combatantStat.events.length;
  attackData.actorId = actorId;
  attackData.id = data.id;

  attackData = await GetItemData(attackData, attackData.actorId, null, itemId);

  const attackContent = rollContent.find(".mars5e-action.attack").first();

  attackData.attackTotal = parseInt(
    $(attackContent).find(".result-total").text()
  );
  attackData.advantage =
    parseInt($(attackContent).find(".mars5e-result").data("advantage")) === 2
      ? true
      : false;
  attackData.disadvantage =
    parseInt($(attackContent).find(".mars5e-result").data("advantage")) === 0
      ? true
      : false;

  const damageContent = rollContent.find(".mars5e-action.damage").first();

  attackData.damageTotal = parseInt(
    $(damageContent).find(".result-total").text()
  );

  let isNewAttack = false;
  if (combatantStat.events.find((f) => f.id === attackData.id)) {
    combatantStat.events[combatantStat.events.length - 1] = attackData;
  } else {
    combatantStat.events.push(attackData);
    isNewAttack = true;
  }

  resetDamageIfAreaEffect(attackData, stat.templateHealthCheck.length > 1);

  nullChecks(attackData);

  CombatantStats(combatantStat);

  return {
    stat: stat,
    isNewAttack: isNewAttack,
  };
}
