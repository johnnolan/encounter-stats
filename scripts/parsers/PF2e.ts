import { EncounterWorkflow } from "EncounterWorkflow";
import { CombatDetailType } from "../enums";

export default class PF2e {
  static async ParseHook(
    chatMessage: ChatMessage,
    actor: Actor,
    type: CombatDetailType,
    roll: Roll | undefined
  ): Promise<EncounterWorkflow | undefined> {
    const enemiesHit: Array<EnemyHit> = game.user?.targets.map(
      (m) =>
        <EnemyHit>{
          tokenId: m.id,
          name: m.name,
        }
    );

    const numberOfEnemiesHit =
      Array.from(enemiesHit).length > 0 ? Array.from(enemiesHit).length : 1;

    if (type === CombatDetailType.Damage) {
      return <EncounterWorkflow>{
        id: chatMessage.id + actor.id,
        actor: {
          id: actor.id,
          actorName: actor.name,
        },
        damageTotal: roll?.total ?? 0,
        damageMultipleEnemiesTotal: roll?.total
          ? roll.total * numberOfEnemiesHit
          : 0,
        isCritical: roll?.options.critical ?? false,
        type: type,
      };
    } else if (type === CombatDetailType.Attack) {
      return <EncounterWorkflow>{
        id: chatMessage.id + actor.id,
        actor: {
          id: actor.id,
        },
        item: {
          id: chatMessage.id,
          name: chatMessage.name,
          link: chatMessage.link,
          type: chatMessage.type,
          img: chatMessage.img,
        },
        attackTotal: roll?.total ?? 0,
        isFumble:
          roll?.terms[0]?.results?.find((f) => f.active === true).result === 1,
        advantage: roll?.options.advantageMode === 1 ? true : false,
        disadvantage: roll?.options.advantageMode === -1 ? true : false,
        actionType: "mwak", // TODO: Parse different attack types
        enemyHit: enemiesHit,
        type: type,
        diceTotal: roll?.dice[0]?.total,
      };
    }
  }
}
