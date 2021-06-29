/**
 * @jest-environment jsdom
 */
import PF1 from "./PF1.js";
import { duplicate } from "../mocks/helpers.js";
global.duplicate = duplicate;
import { combatantStatsPf1 } from "../mockdata/combatantStatsPf1.js";
import { pf1DataCrit } from "../mockdata/pf1DataCrit.js";
import { pf1Data } from "../mockdata/pf1Data.js";
jest.mock("../StatManager.js");
import { ATTACK_DATA_TEMPLATE } from "../Settings.js";
import { GetStat, SaveStat } from "../StatManager.js";
import Collection from "../mocks/Collection.js";
import CompendiumCollection from "../mocks/CompendiumCollection.js";

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
          _id: "BFxFCgkXppOnKSUN",
          data: {
            name: "Bastard Sword",
            data: { actionType: "mwak" },
          },
        },
      ],
      token: {
        _id: "nfvD5GA7i1qjZpwA",
      },
    }),
  },
  packs: packs,
};

GetStat.mockImplementation(() => combatantStatsPf1);
SaveStat.mockImplementation(() => true);

describe("PF1", () => {
  test("it returns the correct parsing on a crit", async () => {
    let attackData = duplicate(ATTACK_DATA_TEMPLATE);
    const result = await PF1(combatantStatsPf1, attackData, pf1DataCrit);
    expect(result.stat).toStrictEqual({
      encounterId: "PHXV2yQWJriyFCeW",
      round: 1,
      combatants: [
        {
          name: "test1",
          id: "Cou0L73lWFc7wJUb",
          img: "ddb-images/characters/lorena_topdown_battle.png",
          type: "character",
          tokenId: "nfvD5GA7i1qjZpwA",
          hp: -83,
          max: 5,
          events: [
            {
              id: null,
              actionType: "mwak",
              round: 1,
              tokenId: null,
              actorId: "Cou0L73lWFc7wJUb",
              advantage: false,
              isCritical: false,
              isFumble: false,
              disadvantage: false,
              attackTotal: 14,
              damageTotal: 0,
              item: {
                name: "Bastard Sword",
                itemLink:
                  "@Compendium[pf1.weapons-and-ammo.KtgSPHGqIRTwhwZM]{Bastard Sword}",
              },
            },
            {
              id: null,
              actionType: "mwak",
              round: null,
              tokenId: null,
              actorId: "Cou0L73lWFc7wJUb",
              advantage: false,
              isCritical: true,
              isFumble: false,
              disadvantage: false,
              attackTotal: 20,
              damageTotal: 14,
              item: {
                name: "Bastard Sword",
                itemLink:
                  "@Compendium[dnd5e.items.BFxFCgkXppOnKSUN]{Bastard Sword}",
              },
            },
          ],
          summaryList: { min: 0, max: 14, avg: 7, total: 14 },
        },
      ],
      templateHealthCheck: [],
      top: {
        highestAvgDamage: "test1<br />5",
        highestMaxDamage: "test1<br />10",
        maxDamage: "test1<br />154",
      },
    });
  });
  test("it returns the correct parsing on a normal hit", async () => {
    let attackData = duplicate(ATTACK_DATA_TEMPLATE);
    const result = await PF1(combatantStatsPf1, attackData, pf1Data);
    expect(result.stat).toStrictEqual({
      encounterId: "PHXV2yQWJriyFCeW",
      round: 1,
      combatants: [
        {
          name: "test1",
          id: "Cou0L73lWFc7wJUb",
          img: "ddb-images/characters/lorena_topdown_battle.png",
          type: "character",
          tokenId: "nfvD5GA7i1qjZpwA",
          hp: -83,
          max: 5,
          events: [
            {
              id: null,
              actionType: "mwak",
              round: 1,
              tokenId: null,
              actorId: "Cou0L73lWFc7wJUb",
              advantage: false,
              isCritical: false,
              isFumble: false,
              disadvantage: false,
              attackTotal: 14,
              damageTotal: 0,
              item: {
                name: "Bastard Sword",
                itemLink:
                  "@Compendium[pf1.weapons-and-ammo.KtgSPHGqIRTwhwZM]{Bastard Sword}",
              },
            },
            {
              id: null,
              actionType: "mwak",
              round: null,
              tokenId: null,
              actorId: "Cou0L73lWFc7wJUb",
              advantage: false,
              isCritical: true,
              isFumble: false,
              disadvantage: false,
              attackTotal: 20,
              damageTotal: 14,
              item: {
                name: "Bastard Sword",
                itemLink:
                  "@Compendium[dnd5e.items.BFxFCgkXppOnKSUN]{Bastard Sword}",
              },
            },
            {
              id: null,
              actionType: "mwak",
              round: null,
              tokenId: null,
              actorId: "Cou0L73lWFc7wJUb",
              advantage: false,
              isCritical: false,
              isFumble: false,
              disadvantage: false,
              attackTotal: 9,
              damageTotal: 5,
              item: {
                name: "Bastard Sword",
                itemLink:
                  "@Compendium[dnd5e.items.BFxFCgkXppOnKSUN]{Bastard Sword}",
              },
            },
          ],
          summaryList: { min: 0, max: 14, avg: 6, total: 19 },
        },
      ],
      templateHealthCheck: [],
      top: {
        highestAvgDamage: "test1<br />5",
        highestMaxDamage: "test1<br />10",
        maxDamage: "test1<br />154",
      },
    });
  });
});
