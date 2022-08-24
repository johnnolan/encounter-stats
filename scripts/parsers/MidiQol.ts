import {
  DiceTrackParse,
  EncounterWorkflow,
  EnemyHit,
  MidiQolWorkflow,
} from "../types/globals";

class MidiQol {
  static ParseWorkflow(workflow: MidiQolWorkflow): EncounterWorkflow {
    const enemiesHit: Array<EnemyHit> = workflow.applicationTargets
      .filter(
        (f) => workflow.attackTotal >= f.sheet.actor.system.attributes.ac.value
      )
      .map(
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
      attackRoll: workflow.attackRoll?.total ?? 0,
      damageRoll: workflow.damageRoll ?? 0,
      damageTotal: workflow.damageTotal ?? 0,
      damageMultipleEnemiesTotal: workflow.damageTotal ?? 0 * enemiesHit.length,
      attackTotal: workflow.attackTotal ?? 0,
      workflowType: workflow.workflowType,
      advantage:
        workflow.attackRoll?.options?.advantageMode === 1 ? true : false,
      disadvantage:
        workflow.attackRoll?.options?.advantageMode === -1 ? true : false,
      isCritical: workflow.isCritical,
      isFumble: workflow.isFumble,
      enemyHit: enemiesHit,
    };
  }

  static async RollCheck(workflow: MidiQolWorkflow): Promise<DiceTrackParse> {
    const actorId = workflow.actor.id;
    let actor;

    if (actorId) {
      actor = await game.actors.get(actorId);
    }

    return <DiceTrackParse>{
      isCritical: workflow.isCritical,
      isFumble: workflow.isFumble,
      flavor: workflow.item.name,
      name: actor.name,
    };
  }
}

export default MidiQol;
