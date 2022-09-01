import { ChatMessageType } from "../enums";
import Logger from "../Logger";

class MidiQol {
  static ParseWorkflow(workflow: MidiQolWorkflow): EncounterWorkflow {
    const enemiesHit: Array<EnemyHit> = workflow.targets.map(
      (m) =>
        <EnemyHit>{
          tokenId: m.id,
          name: m.sheet.actor.name,
        }
    );

    return <EncounterWorkflow>{
      id: workflow.id,
      actor: {
        id: workflow.actor.id,
      },
      item: {
        id: workflow.item.id,
        name: workflow.item.name,
        link: workflow.item.link,
        type: workflow.item.type,
        img: workflow.item.img,
      },
      actionType: workflow.item.system.actionType,
      damageTotal: workflow.damageTotal ?? 0,
      damageMultipleEnemiesTotal: workflow.damageTotal
        ? workflow.damageTotal * Array.from(enemiesHit).length
        : 0,
      attackTotal: workflow.attackTotal ?? 0,
      workflowType: workflow.workflowType,
      advantage:
        workflow.attackRoll?.options?.advantageMode === 1 ? true : false,
      disadvantage:
        workflow.attackRoll?.options?.advantageMode === -1 ? true : false,
      isCritical: workflow.isCritical,
      isFumble: workflow.isFumble,
      enemyHit: enemiesHit,
      type: ChatMessageType.MidiQol,
    };
  }

  static RollCheck(workflow: MidiQolWorkflow): DiceTrackParse | undefined {
    const actorId = workflow.actor.id;

    if (actorId) {
      const actor = game.actors?.get(actorId);

      if (!actor) {
        Logger.log(
          `No actor found for actorId ${actorId}`,
          "midiqol.RollCheck",
          workflow
        );
        return;
      }

      return <DiceTrackParse>{
        isCritical: workflow.isCritical,
        isFumble: workflow.isFumble,
        flavor: workflow.item.name,
        name: actor.name,
      };
    }
  }
}

export default MidiQol;
