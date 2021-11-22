import {
  IsValidAttack,
  IsValidRollEvent,
  nullChecks,
  GetItemData,
  GetCombatantStats,
  CombatantStats,
  _add,
} from "../Utils.js";

export async function MidiQolRollCheck(workflow) {
  const actorId = workflow.actor._id;
  let actor;

  if (actorId) {
    actor = await game.actors.get(actorId);
  }

  return {
    isCritical: workflow.isCritical,
    isFumble: workflow.isFumble,
    flavor: "",
    name: actor.name,
  };
}

export async function MidiQol(stat, attackData, workflow) {
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
    if (workflow.workflowType === "BetterRollsWorkflow") {
      attackData.attackTotal = workflow.attackTotal;
      attackData.advantage = workflow.advantage;
      attackData.disadvantage = workflow.disadvantage;
    } else if (workflow.attackRoll) {
      attackData.attackTotal = workflow.attackRoll.total;
      attackData.advantage =
        workflow.attackRoll.options.advantageMode === 1 ? true : false;
      attackData.disadvantage =
        workflow.attackRoll.options.advantageMode === -1 ? true : false;
    }
  }
  if (IsValidRollEvent(attackData.actionType)) {
    if (workflow.workflowType === "BetterRollsWorkflow") {
      attackData.damageTotal = workflow.damageTotal;
      attackData.isCritical = workflow.isCritical;
    } else if (workflow.damageRoll) {
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

  return { stat: stat, isNewAttack: isNewAttack, attackData: attackData };
}
