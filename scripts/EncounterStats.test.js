import { beforeAll } from "@jest/globals";
import EncounterStats from "./EncounterStats.js";
const mockDataCreateCombat = require("../mockData/hookcreateCombat.json");
const hookupdateCombatarg2 = require("../mockData/hookupdateCombatarg2.json");

const hookMidiQolAttackRollComplete = require("../mockData/hookmidi-qolAttackRollComplete.json");
const hookMidiQolAttackRollComplete2 = require("../mockData/hookmidi-qolAttackRollComplete2.json");
const hookMidiQolAttackRollComplete3 = require("../mockData/hookmidi-qolAttackRollComplete3.json");
const hookMidiQolAttackRollComplete4 = require("../mockData/hookmidi-qolAttackRollComplete4.json");
const hookMidiQolAttackRollComplete5 = require("../mockData/hookmidi-qolAttackRollComplete5.json");

const stats = new EncounterStats(false);

let statsData;
beforeAll(() => {
  stats._createCombat(mockDataCreateCombat);
  statsData = stats.getEncounterStats()[0];
});

describe("On first creating a new Encounter", () => {
  test("Expect top level structure to be okay", () => {
    expect(statsData.encounterId).toBe(mockDataCreateCombat._id);
    expect(statsData.sceneId).toBe(mockDataCreateCombat.scene);
    expect(statsData.timestamp).toBe("");
  });

  test("Expect correct number of combatants to be available", () => {
    expect(statsData.combatants.length).toBe(3);
  });

  describe("On setting up the first Round", () => {
    test("Expect there to be 1 round", () => {
      expect(statsData.rounds.length).toBe(1);
    });
    test("Expect there to be a round number", () => {
      expect(statsData.rounds[0].round).toBe(1);
    });
    test("Expect there to be an empty list of events", () => {
      expect(statsData.rounds[0].events.length).toBe(0);
    });
  });

  describe("On parsing the Combatants", () => {
    let combatant;
    beforeAll(() => {
      combatant = statsData.combatants[2];
    });
    test("Expect the combatants to have 3 entries", () => {
      expect(statsData.combatants.length).toBe(3);
    });
    test("Expect the combatant name to be Ugly Skeleton", () => {
      expect(combatant.name).toBe("Lorena Aldabra");
    });
    test("Expect the combatant id to be correct", () => {
      expect(combatant.id).toBe("BpmrhDs3t2aqUVvP");
    });
    test("Expect the combatant img to be correct", () => {
      expect(combatant.img).toBe("lorena.png");
    });
    test("Expect the combatant actor id to be correct", () => {
      expect(combatant.actor.id).toBe("fu5tuPUTYIqlFJLt");
    });
    test("Expect the combatant actor hp to be correct", () => {
      expect(combatant.actor.hp).toBe(35);
    });
    test("Expect the combatant actor max hp to be correct", () => {
      expect(combatant.actor.max).toBe(67);
    });
    test("Expect the combatant actor ac to be correct", () => {
      expect(combatant.actor.ac).toBe(16);
    });
  });
});

describe("On an attack made", () => {
  beforeAll(() => {
    stats._trackAttack(hookMidiQolAttackRollComplete);
    statsData = stats.getEncounterStats()[0];
  });

  describe("On adding attack event data to the round", () => {
    let event;
    beforeAll(() => {
      event = statsData.rounds[0].events[0];
    });
    test("Expect the combatants to have 1 entry", () => {
      expect(statsData.rounds[0].events.length).toBe(1);
    });
    test("Expect the event to display advantage", () => {
      expect(event.advantage).toBe(false);
    });
    test("Expect the event to have required result", () => {
      expect(event).toEqual({
        actor: {
          id: "fu5tuPUTYIqlFJLt",
          hp: 35,
          max: 67,
        },
        advantage: false,
        attackRoll: {
          class: "Roll",
          dice: [],
          formula: "27",
          results: [27],
          terms: [27],
          total: 27,
        },
        attackTotal: 27,
        damageDetail: [
          {
            damage: 22,
            type: "slashing",
          },
          {
            damage: 22,
            type: "fire",
          },
        ],
        damageTotal: 44,
        disadvantage: false,
        isCritical: true,
        isFumble: false,
        item: {
          id: "LcCBgAO3XtvkZEgt",
          name: "Flame Tongue Greatsword",
          type: "weapon",
        },
        itemId: "LcCBgAO3XtvkZEgt",
        tokenId: "xmovvGboWTyajjpb",
        type: "character",
        uuid: "Actor.fu5tuPUTYIqlFJLt.OwnedItem.LcCBgAO3XtvkZEgt",
      });
    });
  });
});
describe("On a second attack made", () => {
  beforeAll(() => {
    stats._trackAttack(hookMidiQolAttackRollComplete2);
    statsData = stats.getEncounterStats()[0];
  });

  describe("On adding 2 attack event data to the round", () => {
    let event;
    beforeAll(() => {
      event = statsData.rounds[0].events[0];
    });
    test("Expect the combatants to have 2 entries", () => {
      expect(statsData.rounds[0].events.length).toBe(2);
    });
  });
});

describe("On a new round", () => {
  beforeAll(() => {
    stats._updateCombat(hookupdateCombatarg2);
    statsData = stats.getEncounterStats()[0];
  });

  describe("A new round should be created", () => {
    test("Expect the combatants to have 2 entries", () => {
      expect(statsData.rounds.length).toBe(2);
    });

    test("Expect the rounds to be ordered and numbered correctly", () => {
      expect(statsData.rounds[0].round).toBe(2);
      expect(statsData.rounds[1].round).toBe(1);
    });
  });

  describe("On an attack made", () => {
    beforeAll(() => {
      stats._trackAttack(hookMidiQolAttackRollComplete3);
      statsData = stats.getEncounterStats()[0];
    });

    describe("On adding attack event data to the round", () => {
      let event;
      beforeAll(() => {
        event = statsData.rounds[0].events[0];
      });
      test("Expect the combatants to have 1 entry", () => {
        expect(statsData.rounds[0].events.length).toBe(1);
      });
      test("Expect the event to display advantage", () => {
        expect(event.advantage).toBe(false);
      });
      test("Expect the event to have required result", () => {
        expect(event).toEqual({
          actor: {
            id: "fu5tuPUTYIqlFJLt",
            hp: 35,
            max: 67,
          },
          advantage: false,
          attackRoll: {
            class: "Roll",
            dice: [],
            formula: "27",
            results: [27],
            terms: [27],
            total: 27,
          },
          attackTotal: 27,
          damageDetail: [
            {
              damage: 22,
              type: "slashing",
            },
            {
              damage: 22,
              type: "fire",
            },
          ],
          damageTotal: 25,
          disadvantage: false,
          isCritical: true,
          isFumble: false,
          item: {
            id: "LcCBgAO3XtvkZEgt",
            name: "Flame Tongue Greatsword",
            type: "weapon",
          },
          itemId: "LcCBgAO3XtvkZEgt",
          tokenId: "xmovvGboWTyajjpb",
          type: "character",
          uuid: "Actor.fu5tuPUTYIqlFJLt.OwnedItem.LcCBgAO3XtvkZEgt",
        });
      });
    });
  });
  describe("On a second attack made", () => {
    beforeAll(() => {
      stats._trackAttack(hookMidiQolAttackRollComplete4);
      statsData = stats.getEncounterStats()[0];
    });

    describe("On adding 2 attack event data to the round", () => {
      let event;
      beforeAll(() => {
        event = statsData.rounds[0].events[0];
      });
      test("Expect the combatants to have 2 entries", () => {
        expect(statsData.rounds[0].events.length).toBe(2);
      });
    });
  });
});

describe("On ending an Encounter", () => {
  beforeAll(() => {
    stats._endCombat();
    statsData = stats.getEncounterStats()[0];

    /*console.log(statsData);
    console.log(statsData.rounds);
    console.log(statsData.rounds[0]);
    console.log(JSON.stringify(statsData));*/
  });

  test("Summary and total grouping should exist", () => {
    expect(statsData.summary).not.toBeUndefined();
    expect(statsData.summary.total).not.toBeUndefined();
    expect(statsData.summary.total.groups).not.toBeUndefined();
  });

  test("Group information available", () => {
    expect(statsData.summary.total.groups).not.toBeUndefined();
    expect(statsData.summary.total.groups.characters).not.toBeUndefined();
    expect(statsData.summary.total.groups.npcs).not.toBeUndefined();
  });

  test("Group Characters information available", () => {
    expect(statsData.summary.total.groups.characters.min).not.toBeUndefined();
    expect(statsData.summary.total.groups.characters.max).not.toBeUndefined();
    expect(statsData.summary.total.groups.characters.avg).not.toBeUndefined();
    expect(statsData.summary.total.groups.characters.total).not.toBeUndefined();
  });
});
