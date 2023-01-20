import { EncounterWorkflow } from "EncounterWorkflow";
import { CombatDetailType } from "../enums";
import Logger from "../Helpers/Logger";

class ReadySetRoll {
  static ParseRollData(workflow: ReadySetRollWorkflow): ReadySetRollRollData {
    //const regRollResult = /(\d+).*/g;
    const attackData = workflow.fields.find((f) => f[0] === "attack");
    const damageData = workflow.fields.find((f) => f[0] === "damage");
    /*const rollResult = parseInt(
      attackData[1].roll?.result.replace(regRollResult, "$1")
    );*/
    return {
      attackData: attackData,
      damageData: damageData,
      //rollResult: rollResult,
    };
  }

  static ParseWorkflow(workflow: ReadySetRollWorkflow): EncounterWorkflow {
    const enemiesHit: Array<EnemyHit> = []; /*workflow.targets.map(
      (m) =>
        <EnemyHit>{
          tokenId: m.id,
          name: m.sheet.actor.name,
        }
    );*/

    const rollData = this.ParseRollData(workflow);

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
      damageTotal: rollData.damageData
        ? rollData.damageData[1].baseRoll?.total
        : 0,
      attackTotal: rollData.attackData ? rollData.attackData[1].roll?.total : 0,
      advantage: workflow.params.hasAdvantage,
      disadvantage: workflow.params.hasDisadvantage,
      isCritical: workflow.params.isCrit,
      isFumble: workflow.params.isFumble,
      enemyHit: enemiesHit,
      type: CombatDetailType.ReadySetRoll,
      diceTotal: undefined,
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
