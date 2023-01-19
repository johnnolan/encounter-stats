import Logger from "../Helpers/Logger";
import Stat from "./Stat";

export default class ReadySetRollStat extends Stat {
  AddAttack(workflow: EncounterWorkflow) {
    if (!workflow?.actor?.id) {
      Logger.error(`No Actor ID in encounter`, "rsr5e.rollProcessed", workflow);
      return;
    }

    const combatantStat: EncounterCombatant | undefined =
      this.GetCombatantStats(workflow.actor.id);

    if (!combatantStat) {
      Logger.log(
        `No combatant found for Actor ID ${workflow.actor.id}`,
        "rsr5e.rollProcessed",
        workflow
      );
      return;
    }

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
      damageMultipleEnemiesTotal: 0,
      isCritical: false,
    };

    if (this.IsValidAttack(newCombatantEvent.actionType)) {
      if (workflow.attackTotal) {
        newCombatantEvent.attackTotal = workflow.attackTotal;
      }
    }
    if (this.IsValidRollEvent(newCombatantEvent.actionType)) {
      if (workflow.damageTotal) {
        newCombatantEvent.damageMultipleEnemiesTotal =
          workflow.damageMultipleEnemiesTotal;
        newCombatantEvent.damageTotal = workflow.damageTotal;
        newCombatantEvent.isCritical = workflow.isCritical;
      }
    }
    combatantStat.events.push(newCombatantEvent);
  }
}
