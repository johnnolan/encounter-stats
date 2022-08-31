import { ChatMessageType } from "../enums";

export default class DND5e {
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

    let type = ChatMessageType.None;
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
      type = ChatMessageType.ItemCard;
    } else if (chatMessage.flags?.dnd5e?.roll?.type) {
      itemId = chatMessage.flags.dnd5e.roll.itemId;
      type =
        chatMessage.flags.dnd5e.roll.type === "attack"
          ? ChatMessageType.Attack
          : ChatMessageType.Damage;
    } else {
      return;
    }

    if ((type as ChatMessageType) === ChatMessageType.None) {
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

    if (type === ChatMessageType.Damage) {
      return <EncounterWorkflow>{
        id: itemId + actor.id,
        actor: {
          id: actor.id,
        },
        damageRoll: chatMessage.rolls[0]?.dice[0].total ?? 0,
        damageTotal: chatMessage.rolls[0]?.total ?? 0,
        damageMultipleEnemiesTotal:
          chatMessage.rolls[0]?.total ?? 0 * enemiesHit.length,
        type: type,
      };
    } else if (type === ChatMessageType.Attack) {
      let isCritical = false;
      let isFumble = false;
      const dice: Die = chatMessage.rolls[0]?.dice[0];
      if (dice?.faces === 20) {
        if (dice.total === 1) {
          isFumble = true;
        }

        if (dice.total === 20) {
          isCritical = true;
        }
      }
      return <EncounterWorkflow>{
        id: itemId + actor.id,
        actor: {
          id: actor.id,
        },
        attackRoll: chatMessage.rolls[0]?.dice[0]?.total ?? 0,
        attackTotal: chatMessage.rolls[0]?.total ?? 0,
        isCritical: isCritical,
        isFumble: isFumble,
        advantage: chatMessage.rolls[0]?.hasAdvantage,
        disadvantage: chatMessage.rolls[0]?.hasDisadvantage,
        type: type,
      };
    } else if (type === ChatMessageType.ItemCard) {
      return <EncounterWorkflow>{
        id: itemId + actor.id,
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
