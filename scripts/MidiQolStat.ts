import Stat from "./Stat";

export default class MidiQolStat extends Stat {
  AddAttack(workflow: EncounterWorkflow) {
    if (!workflow?.actor?.id) {
      return;
    }

    const combatantStat: EncounterCombatant | undefined =
      this.GetCombatantStats(workflow.actor.id);

    const newCombatantEvent = <CombatantEvent>{
      id: workflow.id,
      actorId: workflow.actor.id,
      item: workflow.item,
      advantage: workflow.advantage,
      disadvantage: workflow.disadvantage,
      actionType: workflow.actionType,
      round: this.currentRound,
      enemyHit: workflow.enemyHit,
      attackTotal: 0,
      damageTotal: 0,
      isCritical: false,
    };

    if (this.IsValidAttack(newCombatantEvent.actionType)) {
      if (workflow.attackRoll) {
        newCombatantEvent.attackTotal = workflow.attackTotal;
      }
    }
    if (this.IsValidRollEvent(newCombatantEvent.actionType)) {
      if (workflow.damageRoll) {
        newCombatantEvent.damageTotal = workflow.damageTotal;
        newCombatantEvent.isCritical = workflow.isCritical;
      }
    }
    combatantStat.events.push(newCombatantEvent);
  }
}
