import { CombatDetailType } from "../enums";
import Logger from "../Logger";
import Stat from "./Stat";

export default class DND5eStat extends Stat {
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

    if (isExistingEvent && workflow.type !== CombatDetailType.ItemCard) {
      const newCombatantEvent = combatantStat.events
        .filter((f) => f.id === workflow.id)
        .reverse()[0];

      if (workflow.type === CombatDetailType.Damage) {
        newCombatantEvent.damageTotal = workflow.damageTotal;
        newCombatantEvent.damageMultipleEnemiesTotal =
          workflow.damageMultipleEnemiesTotal;
      } else if (workflow.type === CombatDetailType.Attack) {
        newCombatantEvent.attackTotal = workflow.attackTotal;
        newCombatantEvent.isCritical = workflow.isCritical;
        newCombatantEvent.isFumble = workflow.isFumble;
        newCombatantEvent.advantage = workflow.advantage;
        newCombatantEvent.disadvantage = workflow.disadvantage;
      }
    } else {
      if (workflow.type === CombatDetailType.ItemCard) {
        const newCombatantEvent = <CombatantEvent>{
          id: workflow.id,
          actorId: workflow.actor.id,
          item: workflow.item,
          round: this.currentRound,
          attackTotal: 0,
          damageTotal: 0,
          actionType: workflow.actionType,
        };
        combatantStat.events.push(newCombatantEvent);
      }
    }
  }
}
