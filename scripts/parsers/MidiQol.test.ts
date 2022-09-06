import { CombatDetailType } from "../enums";
import MidiQol from "./MidiQol";

const midiWorkflow: MidiQolWorkflow = {
  id: "d75gppsau45ypm2m",
  actor: {
    id: "5H4YnyD6zf9vcJ3P",
  },
  isCritical: false,
  isFumble: false,
  attackRoll: {
    total: 18,
    options: {
      advantageMode: 1,
    },
  },
  workflowType: "test",
  attackTotal: 12,
  damageTotal: 21,
  item: {
    id: "itemId",
    name: "Flame Tongue Greatsword",
    link: "@Compendium[dnd5e.items.WWb4vAmh18sMAxfY]{Flame Tongue Greatsword}",
    type: "sword",
    img: "itemImageUrl",
    system: {
      actionType: "mwak",
    },
  },
  targets: [
    {
      id: "tokenId",
      sheet: {
        actor: {
          name: "Acolyte",
          system: {
            attributes: {
              ac: {
                value: 10,
              },
            },
          },
        },
      },
    },
    {
      id: "tokenId2",
      sheet: {
        actor: {
          name: "Troll",
          system: {
            attributes: {
              ac: {
                value: 8,
              },
            },
          },
        },
      },
    },
  ],
};

const midiWorkflowNoDiceRoll: MidiQolWorkflow = {
  id: "d75gppsau45ypm2m",
  actor: {
    id: "5H4YnyD6zf9vcJ3P",
  },
  isCritical: false,
  isFumble: false,
  workflowType: "test",
  item: {
    id: "itemId",
    name: "Flame Tongue Greatsword",
    link: "@Compendium[dnd5e.items.WWb4vAmh18sMAxfY]{Flame Tongue Greatsword}",
    type: "sword",
    img: "itemImageUrl",
    system: {
      actionType: "mwak",
    },
  },
  targets: [
    {
      id: "tokenId",
      sheet: {
        actor: {
          name: "Acolyte",
          system: {
            attributes: {
              ac: {
                value: 10,
              },
            },
          },
        },
      },
    },
  ],
};

describe("MidiQol", () => {
  describe("ParseWorkflow", () => {
    describe("If it has a attack and damage roll", () => {
      test("it returns the correct EncounterMidiWorkflow", async () => {
        const result: EncounterWorkflow = MidiQol.ParseWorkflow(midiWorkflow);
        expect(result).toStrictEqual(<EncounterWorkflow>{
          id: "d75gppsau45ypm2m",
          actionType: "mwak",
          actor: {
            id: "5H4YnyD6zf9vcJ3P",
          },
          advantage: true,
          isCritical: false,
          isFumble: false,
          disadvantage: false,
          damageMultipleEnemiesTotal: 42,
          workflowType: "test",
          attackTotal: 12,
          damageTotal: 21,
          item: {
            id: "itemId",
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
            {
              name: "Troll",
              tokenId: "tokenId2",
            },
          ],
          type: CombatDetailType.MidiQol,
        });
      });
    });

    describe("If it has no attack and damage roll", () => {
      test("it returns the correct EncounterMidiWorkflow", async () => {
        const result: EncounterWorkflow = MidiQol.ParseWorkflow(
          midiWorkflowNoDiceRoll
        );
        expect(result).toStrictEqual(<EncounterWorkflow>{
          id: "d75gppsau45ypm2m",
          actionType: "mwak",
          actor: {
            id: "5H4YnyD6zf9vcJ3P",
          },
          advantage: false,
          isCritical: false,
          isFumble: false,
          disadvantage: false,
          damageMultipleEnemiesTotal: 0,
          workflowType: "test",
          attackTotal: 0,
          damageTotal: 0,
          item: {
            id: "itemId",
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
          type: CombatDetailType.MidiQol,
        });
      });
    });
  });
});
