import { ChatMessageType } from "./enums";
import Stat from "./Stat";

export default class DND5eStat extends Stat {
  AddAttack(workflow: EncounterWorkflow) {
    if (!workflow?.actor?.id) {
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

    if (isExistingEvent && workflow.type !== ChatMessageType.ItemCard) {
      const newCombatantEvent = combatantStat.events
        .filter((f) => f.id === workflow.id)
        .reverse()[0];

      if (workflow.type === ChatMessageType.Damage) {
        newCombatantEvent.damageTotal = workflow.damageTotal;
      } else if (workflow.type === ChatMessageType.Attack) {
        newCombatantEvent.attackTotal = workflow.attackTotal;
        newCombatantEvent.isCritical = workflow.isCritical;
        newCombatantEvent.isFumble = workflow.isFumble;
        newCombatantEvent.advantage = workflow.advantage;
        newCombatantEvent.disadvantage = workflow.disadvantage;
      }
    } else {
      if (workflow.type === ChatMessageType.ItemCard) {
        const newCombatantEvent = <CombatantEvent>{
          id: workflow.id,
          actorId: workflow.actor.id,
          item: workflow.item,
          round: this.currentRound,
          attackTotal: 0,
          damageTotal: 0,
        };
        combatantStat.events.push(newCombatantEvent);
      }
    }
  }
}
