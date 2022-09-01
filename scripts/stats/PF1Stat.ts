import Logger from "../Logger";
import Stat from "./Stat";

export default class PF1Stat extends Stat {
  AddAttack(workflow: EncounterWorkflow) {
    if (!workflow?.actor?.id) {
      Logger.error(`No Actor ID in encounter`, "pf1stat.AddAttack", workflow);
      return;
    }
    const combatantStat: EncounterCombatant | undefined =
      this.GetCombatantStats(workflow.actor.id);
    if (!combatantStat) return;

    const newCombatantEvent = <CombatantEvent>{
      id: workflow.id,
      actorId: workflow.actor.id,
      item: workflow.item,
      round: this.currentRound,
      damageTotal: workflow.damageTotal,

      attackTotal: workflow.attackTotal,
      isCritical: workflow.isCritical,
      isFumble: workflow.isFumble,
      advantage: workflow.advantage,
      disadvantage: workflow.disadvantage,

      actionType: workflow.actionType,
    };
    combatantStat.events.push(newCombatantEvent);
  }
}
