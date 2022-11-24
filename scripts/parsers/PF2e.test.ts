import PF2e from "./PF2e";
import { CombatDetailType } from "../enums";
import { HookPF2eChatMessageAttack } from "../mockdata/hooks/attack/pf2e.ChatMessage.Attack";
import { HookPF2eChatMessageDamage } from "../mockdata/hooks/attack/pf2e.ChatMessage.Damage";

describe("Default", () => {
  describe("ParseChatMessage", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
      (global as any).game = {
        user: {
          targets: [
            {
              id: "id1",
              name: "Acolyte",
            },
          ],
        },
      };
    });

    describe("If it is a attack role", () => {
      test("it returns the correct EncounterWorkflow", async () => {
        const result = await PF2e.ParseHook(
          HookPF2eChatMessageAttack.item,
          HookPF2eChatMessageAttack.actor,
          CombatDetailType.Attack,
          HookPF2eChatMessageAttack.rolls
        );
        expect(result).toStrictEqual(<EncounterWorkflow>{
          id: `${HookPF2eChatMessageAttack.item.id}${HookPF2eChatMessageAttack.actor.id}`,
          actor: {
            id: HookPF2eChatMessageAttack.actor.id,
          },
          attackTotal: 20,
          actionType: "mwak",
          diceTotal: 20,
          advantage: true,
          disadvantage: false,
          isFumble: false,
          enemyHit: [
            {
              name: "Acolyte",
              tokenId: "id1",
            },
          ],
          item: {
            id: "C3c6l9SPMCqMiceV",
            img: "systems/dnd5e/icons/spells/beam-orange-2.jpg",
            link: "@UUID[Actor.7KWt35CYuQyQMnsh.Item.C3c6l9SPMCqMiceV]{Fire Bolt}",
            name: "Fire Bolt",
            type: "spell",
          },
          type: CombatDetailType.Attack,
        });
      });
    });

    describe("If it is a Damage role", () => {
      test("it returns the correct EncounterWorkflow", async () => {
        const result = await PF2e.ParseHook(
          HookPF2eChatMessageDamage.item,
          HookPF2eChatMessageDamage.actor,
          CombatDetailType.Damage,
          HookPF2eChatMessageDamage.rolls
        );
        expect(result).toStrictEqual(<EncounterWorkflow>{
          id: `${HookPF2eChatMessageDamage.item.id}${HookPF2eChatMessageDamage.actor.id}`,
          actor: {
            actorName: "JB Player",
            id: HookPF2eChatMessageDamage.actor.id,
          },
          damageTotal: 20,
          damageMultipleEnemiesTotal: 20,
          isCritical: true,
          type: CombatDetailType.Damage,
        });
      });
    });
  });
});
