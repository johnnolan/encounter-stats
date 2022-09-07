import DND5e from "./DND5e";
import { CombatDetailType } from "../enums";
import { HookDND5eUseItem } from "../mockdata/hooks/attack/dnd5e.useItem";
import { HookDND5e_rollAttack_item } from "../mockdata/hooks/attack/dnd5e.rollAttack.item";
import { HookDND5e_rollAttack_d20roll } from "../mockdata/hooks/attack/dnd5e.rollAttack.d20roll";
import { HookDND5e_rollDamage_item } from "../mockdata/hooks/attack/dnd5e.rollDamage.item";
import { HookDND5e_rollDamage_damageroll } from "../mockdata/hooks/attack/dnd5e.rollDamage.damagerole";

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

    describe("If it is a standard role", () => {
      test("it returns the correct EncounterWorkflow", async () => {
        const result = await DND5e.ParseHook(
          HookDND5eUseItem,
          HookDND5eUseItem.actor,
          CombatDetailType.ItemCard,
          undefined
        );
        expect(result).toStrictEqual(<EncounterWorkflow>{
          id: `${HookDND5eUseItem.id}${HookDND5eUseItem.actor.id}`,
          actionType: "rsak",
          actor: {
            id: HookDND5eUseItem.actor.id,
          },
          item: {
            id: HookDND5eUseItem.id,
            name: "Fire Bolt",
            link: "@UUID[Actor.7KWt35CYuQyQMnsh.Item.C3c6l9SPMCqMiceV]{Fire Bolt}",
            type: "spell",
            img: "systems/dnd5e/icons/spells/beam-orange-2.jpg",
          },
          enemyHit: [
            {
              name: "Acolyte",
              tokenId: "id1",
            },
          ],
          type: CombatDetailType.ItemCard,
        });
      });
    });

    describe("If it is a attack role", () => {
      test("it returns the correct EncounterWorkflow", async () => {
        const result = await DND5e.ParseHook(
          HookDND5e_rollAttack_item,
          HookDND5e_rollAttack_item.actor,
          CombatDetailType.Attack,
          HookDND5e_rollAttack_d20roll
        );
        expect(result).toStrictEqual(<EncounterWorkflow>{
          id: `${HookDND5eUseItem.id}${HookDND5e_rollAttack_item.actor.id}`,
          actor: {
            id: HookDND5e_rollAttack_item.actor.id,
          },
          attackTotal: 20,
          advantage: true,
          disadvantage: false,
          isFumble: false,
          type: CombatDetailType.Attack,
        });
      });
    });

    describe("If it is a damage role", () => {
      test("it returns the correct EncounterWorkflow", async () => {
        const result = await DND5e.ParseHook(
          HookDND5e_rollDamage_item,
          HookDND5e_rollDamage_item.actor,
          CombatDetailType.Damage,
          HookDND5e_rollDamage_damageroll
        );
        expect(result).toStrictEqual(<EncounterWorkflow>{
          id: `${HookDND5eUseItem.id}${HookDND5e_rollDamage_item.actor.id}`,
          actor: {
            id: HookDND5e_rollDamage_item.actor.id,
          },
          damageTotal: 33,
          damageMultipleEnemiesTotal: 33,
          isCritical: true,
          type: CombatDetailType.Damage,
        });
      });
    });
    test("it returns the correct EncounterWorkflow for multiple damagers", async () => {
      (global as any).game = {
        user: {
          targets: [
            {
              id: "id1",
              name: "Acolyte",
            },
            {
              id: "id2",
              name: "Ancient Red Dragon",
            },
          ],
        },
      };

      const result = await DND5e.ParseHook(
        HookDND5e_rollDamage_item,
        HookDND5e_rollDamage_item.actor,
        CombatDetailType.Damage,
        HookDND5e_rollDamage_damageroll
      );
      expect(result).toStrictEqual(<EncounterWorkflow>{
        id: `${HookDND5eUseItem.id}${HookDND5e_rollDamage_item.actor.id}`,
        actor: {
          id: HookDND5e_rollDamage_item.actor.id,
        },
        damageTotal: 33,
        damageMultipleEnemiesTotal: 66,
        isCritical: true,
        type: CombatDetailType.Damage,
      });
    });
  });
});
