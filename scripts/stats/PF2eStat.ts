import { CombatDetailType } from "../enums";
import Logger from "../Helpers/Logger";
import Stat from "./Stat";

export default class PF2eStat extends Stat {
  AddAttack(workflow: EncounterWorkflow) {
    if (!workflow?.actor?.id) {
      Logger.error(`No Actor ID in encounter`, "dnd5estat.AddAttack", workflow);
      return;
    }
    const combatantStat: EncounterCombatant | undefined =
      this.GetCombatantStats(workflow.actor.id);
    if (!combatantStat) return;

    // Get any existing event, if so merge object and update
    const isExistingEvent: boolean =
      combatantStat.events.find(
        (f) => f.id === workflow.id && f.round === this.currentRound
      ) !== undefined;

    if (isExistingEvent && workflow.type === CombatDetailType.Damage) {
      const newCombatantEvent = combatantStat.events
        .filter((f) => f.id === workflow.id)
        .reverse()[0];

      newCombatantEvent.damageTotal = workflow.damageTotal;
      newCombatantEvent.damageMultipleEnemiesTotal =
        workflow.damageMultipleEnemiesTotal;
      newCombatantEvent.isCritical = workflow.isCritical;
    } else {
      if (workflow.type === CombatDetailType.Attack) {
        const newCombatantEvent = <CombatantEvent>{
          id: workflow.id,
          actorId: workflow.actor.id,
          item: workflow.item,
          round: this.currentRound,
          attackTotal: 0,
          damageTotal: 0,
          actionType: workflow.actionType,
        };
        newCombatantEvent.attackTotal = workflow.attackTotal;
        newCombatantEvent.isFumble = workflow.isFumble;
        newCombatantEvent.advantage = workflow.advantage;
        newCombatantEvent.disadvantage = workflow.disadvantage;
        combatantStat.events.push(newCombatantEvent);
      }
    }
  }
}
