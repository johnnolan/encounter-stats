import { EncounterWorkflow } from "../types/globals";
import DND5e from "./DND5e";
import { chatActor } from "../mockdata/chatActor";

const chatMessageItem: ChatMessage = {
  content: '<div data-item-id="C3c6l9SPMCqMiceV"></div>',
  speaker: {
    actor: "5H4YnyD6zf9vcJ3P",
  },
  user: {
    targets: [
      {
        id: "tokenId",
        name: "Acolyte",
      },
    ],
  },
  flags: {
    /*dnd5e: {
      roll: {
        itemId: "C3c6l9SPMCqMiceV",
        type: "attack",
      }
    }*/
  },
};

const chatMessageItemAttack: ChatMessage = {
  speaker: {
    actor: "5H4YnyD6zf9vcJ3P",
  },
  user: {
    targets: [
      {
        id: "tokenId",
        name: "Actolyte",
      },
    ],
  },
  flags: {
    dnd5e: {
      roll: {
        itemId: "C3c6l9SPMCqMiceV",
        type: "attack",
      },
    },
  },
  rolls: [
    {
      hasAdvantage: true,
      hasDisadvantage: false,
      total: 19,
      dice: [
        {
          faces: 20,
          total: 18,
        },
      ],
    },
  ],
};

const chatMessageItemDamage: ChatMessage = {
  speaker: {
    actor: "5H4YnyD6zf9vcJ3P",
  },
  user: {
    targets: [
      {
        id: "tokenId",
        name: "Actolyte",
      },
    ],
  },
  flags: {
    dnd5e: {
      roll: {
        itemId: "C3c6l9SPMCqMiceV",
        type: "damage",
      },
    },
  },
  rolls: [
    {
      total: 41,
      dice: [
        {
          options: {
            critical: true,
          },
          total: 41,
        },
      ],
    },
  ],
};

describe("Default", () => {
  describe("ParseChatMessage", () => {
    describe("If it is a standard role", () => {
      beforeEach(() => {
        (global as any).game = {
          actors: {
            get: jest.fn().mockReturnValue(chatActor),
          },
        };
      });
      test("it returns the correct EncounterWorkflow", async () => {
        const result = await DND5e.ParseChatMessage(chatMessageItem);
        expect(result).toStrictEqual(<EncounterWorkflow>{
          id: `C3c6l9SPMCqMiceV${chatMessageItem.speaker.actor}`,
          actionType: "mwak",
          actor: {
            id: "5H4YnyD6zf9vcJ3P",
          },
          item: {
            id: "C3c6l9SPMCqMiceV",
            name: "Flame Tongue Greatsword",
            link: "@Compendium[dnd5e.items.WWb4vAmh18sMAxfY]{Flame Tongue Greatsword}",
            type: "sword",
            img: "itemImageUrl",
          },
          enemyHit: [
            {
              name: "Acolyte",
              tokenId: "tokenId",
            },
          ],
          type: "itemCard",
        });
      });
    });

    describe("If it is a attack role", () => {
      beforeEach(() => {
        (global as any).game = {
          actors: {
            get: jest.fn().mockReturnValue(chatActor),
          },
        };
      });
      test("it returns the correct EncounterWorkflow", async () => {
        const result = await DND5e.ParseChatMessage(chatMessageItemAttack);
        expect(result).toStrictEqual(<EncounterWorkflow>{
          id: `C3c6l9SPMCqMiceV${chatMessageItemAttack.speaker.actor}`,
          actor: {
            id: "5H4YnyD6zf9vcJ3P",
          },
          attackTotal: 19,
          attackRoll: 18,
          advantage: true,
          disadvantage: false,
          isCritical: false,
          isFumble: false,
          type: "attack",
        });
      });
    });

    describe("If it is a damage role", () => {
      beforeEach(() => {
        (global as any).game = {
          actors: {
            get: jest.fn().mockReturnValue(chatActor),
          },
        };
      });
      test("it returns the correct EncounterWorkflow", async () => {
        const result = await DND5e.ParseChatMessage(chatMessageItemDamage);
        expect(result).toStrictEqual(<EncounterWorkflow>{
          id: `C3c6l9SPMCqMiceV${chatMessageItemDamage.speaker.actor}`,
          actor: {
            id: "5H4YnyD6zf9vcJ3P",
          },
          damageRoll: 41,
          damageTotal: 41,
          damageMultipleEnemiesTotal: 41,
          type: "damage",
        });
      });
    });
  });
});
