import { ChatMessageType } from "../enums";

export default class PF1 {
  static async ParseChatMessage(
    chatMessage: ChatMessage
  ): Promise<EncounterWorkflow | undefined> {
    const enemiesHit: Array<EnemyHit> = chatMessage.user?.targets.map(
      (m) =>
        <EnemyHit>{
          tokenId: m.id,
          name: m.name,
        }
    );

    const actor = game.actors?.get(chatMessage.speaker.actor);
    if (!actor) {
      return;
    }
    const itemMatch = chatMessage.content?.match(
      /data-item-id="([a-zA-Z0-9]+)"/
    );
    let itemId: string;

    if (itemMatch !== null && itemMatch !== undefined) {
      itemId = itemMatch[1];
    } else if (chatMessage.flags?.pf1.metadata.item) {
      itemId = chatMessage.flags.pf1.metadata.item;
    } else {
      return;
    }

    const actorItems = actor.items;
    const item = actorItems.find((f) => f.id === itemId) ?? {
      id: "Not Found",
      name: "Not Found",
      link: "",
      img: "",
      type: "Not Found",
      system: {
        actionType: "Not Found",
      },
    };

    return <EncounterWorkflow>{
      id: actor.id + item.id,
      actor: {
        id: actor.id,
      },
      item: item,
      actionType: "attack",
      attackRoll:
        chatMessage.flags.pf1.metadata.rolls.attacks[0].attack.total ?? 0,
      damageTotal:
        chatMessage.flags.pf1.metadata.rolls.attacks[0].damage["0"].roll
          .total ?? 0,
      attackTotal:
        chatMessage.flags.pf1.metadata.rolls.attacks[0].attack.total ?? 0,
      //advantage:        workflow.attackRoll?.options?.advantageMode === 1 ? true : false,
      //disadvantage:        workflow.attackRoll?.options?.advantageMode === -1 ? true : false,
      isCritical:
        chatMessage.flags.pf1.metadata.rolls.attacks[0].attack.terms[0]
          .results[0].result === 20,
      isFumble:
        chatMessage.flags.pf1.metadata.rolls.attacks[0].attack.terms[0]
          .results[0].result === 1,
      enemyHit: enemiesHit,
      type: ChatMessageType.PF1,
    };
  }
}
