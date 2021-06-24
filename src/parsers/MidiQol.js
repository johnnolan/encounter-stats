import {
  IsValidAttack,
  IsValidRollEvent,
  nullChecks,
  resetDamageIfAreaEffect,
  GetItemData,
  GetCombatantStats,
  CombatantStats,
  _add,
} from "../Utils.js";

export default async function MidiQol(stat, attackData, workflow) {
  let combatantStat = GetCombatantStats(stat, workflow.actor._id);
  if (!combatantStat) return;
  stat.templateHealthCheck = [];
  attackData.id = workflow._id;
  attackData.actorId = workflow.actor._id;

  attackData = await GetItemData(
    attackData,
    attackData.actorId,
    null,
    workflow.item._id
  );

  if (IsValidAttack(attackData.actionType)) {
    if (workflow.attackRoll) {
      attackData.attackTotal = workflow.attackRoll.total;
      attackData.advantage =
        workflow.attackRoll.options.advantageMode === 1 ? true : false;
      attackData.disadvantage =
        workflow.attackRoll.options.advantageMode === -1 ? true : false;
    }
  }
  if (IsValidRollEvent(attackData.actionType)) {
    if (workflow.damageRoll) {
      attackData.damageTotal = workflow.damageRoll.total;
      attackData.isCritical = workflow.damageRoll.options.critical;
    }
  }

  nullChecks(attackData);

  let isNewAttack = false;
  if (combatantStat.events.find((f) => f.id === attackData.id)) {
    combatantStat.events[combatantStat.events.length - 1] = attackData;
  } else {
    combatantStat.events.push(attackData);
    isNewAttack = true;
  }

  CombatantStats(combatantStat);

  return { stat: stat, isNewAttack: isNewAttack };
}
