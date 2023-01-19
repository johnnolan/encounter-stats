import { EncounterWorkflow } from "EncounterWorkflow";
import { CombatDetailType } from "../enums";
import Logger from "../Helpers/Logger";

class ReadySetRoll {
  static ParseWorkflow(workflow: ReadySetRollWorkflow): EncounterWorkflow {
    const enemiesHit: Array<EnemyHit> = []; /*workflow.targets.map(
      (m) =>
        <EnemyHit>{
          tokenId: m.id,
          name: m.sheet.actor.name,
        }
    );*/

    const attackData = workflow.fields.find((f) => f[0] === "attack");
    const damageData = workflow.fields.find((f) => f[0] === "damage");

    return <EncounterWorkflow>{
      id: workflow.messageId,
      actor: {
        id: workflow.actorId,
      },
      item: {
        id: workflow.item.id,
        name: workflow.item.name,
        link: workflow.item.link,
        type: workflow.item.type,
        img: workflow.item.img,
      },
      actionType: workflow.item.system.actionType,
      damageTotal: damageData ? damageData[1].baseRoll?.total : 0,
      attackTotal: attackData ? attackData[1].roll?.total : 0,
      advantage: workflow.params.hasAdvantage,
      disadvantage: workflow.params.hasDisadvantage,
      isCritical: workflow.params.isCrit,
      isFumble: workflow.params.isFumble,
      enemyHit: enemiesHit,
      type: CombatDetailType.ReadySetRoll,
      diceTotal: attackData ? attackData[1].roll?.total : undefined,
    };
  }

  static RollCheck(workflow: ReadySetRollWorkflow): DiceTrackParse | undefined {
    const actorId = workflow.actorId;

    if (actorId) {
      const actor = game.actors?.get(actorId);

      if (!actor) {
        Logger.log(
          `No actor found for actorId ${actorId}`,
          "rsr5e.rollProcessed",
          workflow
        );
        return;
      }

      if (actor.type !== "character") {
        return;
      }

      return <DiceTrackParse>{
        isCritical: workflow.params.isCrit,
        isFumble: workflow.params.isFumble,
        flavor: workflow.item.name,
        name: actor.name,
      };
    }
  }
}

export default ReadySetRoll;
