import { EncounterMidiWorkflow, MidiQolWorkflow } from "../types/globals";
import MidiQol from "./MidiQol";

const midiWorkflow: MidiQolWorkflow = {
  id: "d75gppsau45ypm2m",
  actor: {
    id: "5H4YnyD6zf9vcJ3P",
  },
  isCritical: false,
  isFumble: false,
  attackRoll: {
    total: 0,
    options: {
      advantageMode: 1,
    },
  },
  damageRoll: 0,
  workflowType: "test",
  attackTotal: 12,
  damageTotal: 0,
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
  applicationTargets: [
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
        const result: EncounterMidiWorkflow =
          MidiQol.ParseWorkflow(midiWorkflow);
        expect(result).toStrictEqual(<EncounterMidiWorkflow>{
          id: "d75gppsau45ypm2m",
          actionType: "mwak",
          actor: {
            id: "5H4YnyD6zf9vcJ3P",
          },
          advantage: true,
          isCritical: false,
          isFumble: false,
          disadvantage: false,
          attackRoll: 0,
          damageRoll: 0,
          damageMultipleEnemiesTotal: 0,
          workflowType: "test",
          attackTotal: 12,
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
        });
      });
    });
  });
});
