/**
 * @jest-environment jsdom
 */
import MidiQol from "./MidiQol.js";
import { duplicate } from "../mocks/helpers.js";
global.duplicate = duplicate;
import { combatantStats } from "../mockdata/combatantStatsMidiQol.js";
import { midiQolData } from "../mockdata/midiQolData.js";
jest.mock("../StatManager.js");
import { ATTACK_DATA_TEMPLATE } from "../Settings.js";
import { GetStat, SaveStat } from "../StatManager.js";
import Collection from "../mocks/Collection.js";
import CompendiumCollection from "../mocks/CompendiumCollection.js";

GetStat.mockImplementation(() => combatantStats);
SaveStat.mockImplementation(() => true);

const packs = new Collection();
let pack = new CompendiumCollection({
  entity: "Item",
  label: "Items (SRD)",
  name: "items",
  package: "dnd5e",
  path: "./packs/items.db",
  private: false,
  system: "dnd5e",
});
packs.set("dnd5e.items", pack);

global.game = {
  actors: {
    get: jest.fn().mockReturnValue({
      items: [
        {
          id: "WWb4vAmh18sMAxfY",
          data: {
            name: "Flame Tongue Greatsword",
            data: { actionType: "mwak" },
          },
          token: {
            _id: "5H4YnyD6zf9vcJ3Q",
          },
        },
      ],
    }),
  },
  packs: packs,
};

describe("MidiQol", () => {
  test("it returns the correct parsing", async () => {
    let attackData = duplicate(ATTACK_DATA_TEMPLATE);
    const result = await MidiQol(combatantStats, attackData, midiQolData);
    expect(result.stat).toStrictEqual({
      encounterId: "RwzeJBOvutLp3eeL",
      round: 1,
      templateHealthCheck: [],
      combatants: [
        {
          name: "Lorena Aldabra",
          id: "5H4YnyD6zf9vcJ3P",
          img: "tokens/pcs/lorena/lorena_topdown_resting.png",
          type: "character",
          hp: 71,
          max: 76,
          ac: 16,
          events: [
            {
              id: null,
              actionType: "mwak",
              round: 1,
              tokenId: null,
              actorId: "5H4YnyD6zf9vcJ3P",
              advantage: false,
              isCritical: false,
              isFumble: false,
              disadvantage: false,
              attackTotal: 18,
              damageTotal: 0,
              item: {
                name: "Flame Tongue Greatsword",
                itemLink:
                  "@Compendium[dnd5e.items.WWb4vAmh18sMAxfY]{Flame Tongue Greatsword}",
              },
            },
            {
              id: null,
              actionType: "mwak",
              round: 1,
              tokenId: null,
              actorId: "5H4YnyD6zf9vcJ3P",
              advantage: false,
              isCritical: false,
              isFumble: false,
              disadvantage: false,
              attackTotal: 0,
              damageTotal: 0,
              item: {
                name: "Flame Tongue Greatsword",
                itemLink:
                  "@Compendium[dnd5e.items.WWb4vAmh18sMAxfY]{Flame Tongue Greatsword}",
              },
            },
            {
              id: "d75gppsau45ypm2m",
              actionType: "mwak",
              round: null,
              tokenId: null,
              actorId: "5H4YnyD6zf9vcJ3P",
              advantage: false,
              isCritical: false,
              isFumble: false,
              disadvantage: false,
              attackTotal: 12,
              damageTotal: 0,
              item: {
                name: "Flame Tongue Greatsword",
                itemLink:
                  "@Compendium[dnd5e.items.WWb4vAmh18sMAxfY]{Flame Tongue Greatsword}",
              },
            },
          ],
          health: [],
          roundSummary: {
            individual: {
              1: [
                {
                  damageTotal: 0,
                  round: 1,
                },
                {
                  damageTotal: 0,
                  round: 1,
                },
              ],
              null: [
                {
                  damageTotal: 0,
                  round: null,
                },
              ],
            },
            totals: [
              {
                damageTotal: 0,
                round: "1",
              },
              {
                damageTotal: 0,
                round: "null",
              },
            ],
          },
          summaryList: { min: 0, max: 0, avg: 0, total: 0 },
        },
        {
          name: "Displacer Beast",
          id: "39qXw7GSzTEwGW2G",
          img: "tokens/npcs/Phase_Panther_Large_Monstrosity_05.png",
          type: "npc",
          hp: 85,
          max: 85,
          ac: 13,
          events: [],
          health: [],
          summaryList: { min: "0", max: "0", avg: "0", total: "0" },
          roundSummary: {
            individual: {
              1: [
                {
                  damageTotal: 2,
                  round: 1,
                },
              ],
              2: [
                {
                  damageTotal: 4,
                  round: 2,
                },
                {
                  damageTotal: 4,
                  round: 2,
                },
              ],
            },
            totals: [
              {
                damageTotal: 2,
                round: "1",
              },
              {
                damageTotal: 8,
                round: "2",
              },
            ],
          },
        },
      ],
      top: {
        maxDamage: "Lorena Aldabra<br />0",
        mostDamageInOneTurn: "Lorena Aldabra<br />16",
        highestAvgDamage: "Lorena Aldabra<br />0",
        highestMaxDamage: "Lorena Aldabra<br />0",
      },
    });
  });
});
