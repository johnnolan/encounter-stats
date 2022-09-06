import { CombatDetailType } from "../enums";

export default class DND5e {
  static async ParseChatMessage(
    item: Item,
    actor: Actor,
    type: CombatDetailType,
    roll: Roll | undefined
  ): Promise<EncounterWorkflow | undefined> {
    /*const enemiesHit: Array<EnemyHit> = chatMessage.user?.targets.map(
      (m) =>
        <EnemyHit>{
          tokenId: m.id,
          name: m.name,
        }
    );*/

    const enemiesHit: Array<EnemyHit> = [];
    const numberOfEnemiesHit =
      Array.from(enemiesHit).length > 0 ? Array.from(enemiesHit).length : 1;

    if (type === CombatDetailType.Damage) {
      return <EncounterWorkflow>{
        id: item.id + actor.id,
        actor: {
          id: actor.id,
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
        id: item.id + actor.id,
        actor: {
          id: actor.id,
        },
        attackTotal: roll?.total ?? 0,
        isFumble:
          roll?.terms[0]?.results?.find((f) => f.active === true).result === 1,
        advantage: roll?.options.advantageMode === 1 ? true : false,
        disadvantage: roll?.options.advantageMode === -1 ? true : false,
        type: type,
      };
    } else if (type === CombatDetailType.ItemCard) {
      return <EncounterWorkflow>{
        id: item.id + actor.id,
        actor: {
          id: actor.id,
        },
        item: {
          id: item.id,
          name: item.name,
          link: item.link,
          type: item.type,
          img: item.img,
        },
        actionType: item.system.actionType,
        enemyHit: enemiesHit,
        type: type,
      };
    }
  }
}
