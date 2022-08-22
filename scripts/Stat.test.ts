import { Encounter, EncounterMidiWorkflow } from "./types/globals";
import Stat from "./Stat";
jest.mock("./StatManager");
import { GetStat, RemoveStat, SaveStat } from "./StatManager";
import { actor } from "./mockdata/actor";

const encounter: Encounter = {
  encounterId: "t98gppsau45ypm3t",
  round: 1,
  combatants: [],
  top: {
    maxDamage: "",
    mostDamageInOneTurn: "",
    highestAvgDamage: "",
    highestMaxDamage: "",
  },
  templateHealthCheck: [],
};

const encoutnerMidiWorkflow: EncounterMidiWorkflow = {
  id: "d75gppsau45ypm2m",
  actionType: "mwak",
  actor: {
    id: "eMyoELkOwFNPGEK8",
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
};

describe("Stat", () => {
  describe("If it is a new encounter", () => {
    let stat: Stat;
    const encounterId = "encounterId";
    beforeAll(() => {
      stat = new Stat(encounterId);
      RemoveStat.mockImplementation(() => true);
      SaveStat.mockImplementation(() => true);
    });

    test("it returns true to hasEncounter", () => {
      expect(stat.hasEncounter).toBeTruthy();
    });

    test("it returns a blank Encounter", () => {
      expect(stat.encounter).toStrictEqual(<Encounter>{
        encounterId: encounterId,
        round: 1,
        combatants: [],
        top: {
          maxDamage: "",
          mostDamageInOneTurn: "",
          highestAvgDamage: "",
          highestMaxDamage: "",
        },
        templateHealthCheck: [],
      });
    });

    test("it calls RemoveStat", () => {
      stat.Delete();
      expect(RemoveStat).toBeCalled();
    });

    test("it calls SaveStat", () => {
      stat.Save();
      expect(SaveStat).toBeCalled();
    });

    test("it Updates the Round correctly", () => {
      expect(stat.currentRound).toBe(1);
      stat.UpdateRound(2);
      expect(stat.currentRound).toBe(2);
      stat.UpdateRound(2);
      expect(stat.currentRound).toBe(2);
      stat.UpdateRound(1);
      expect(stat.currentRound).toBe(1);
    });

    describe("Does its parsing work correctly", () => {
      test("it returns true to correct IsValidRollEvent", () => {
        expect(stat.IsValidRollEvent("mwak")).toBeTruthy();
      });
      test("it returns false to correct IsValidRollEvent", () => {
        expect(stat.IsValidRollEvent("mwaks")).toBeFalsy();
      });

      test("it returns true to correct IsValidAttack", () => {
        expect(stat.IsValidAttack("mwak")).toBeTruthy();
      });
      test("it returns false to correct IsValidAttack", () => {
        expect(stat.IsValidAttack("heal")).toBeFalsy();
      });

      test("it returns true to correct IsHealingSpell", () => {
        expect(stat.IsHealingSpell("heal")).toBeTruthy();
      });
      test("it returns false to correct IsHealingSpell", () => {
        expect(stat.IsHealingSpell("mwak")).toBeFalsy();
      });

      test("it returns true to correct IsValidCombatant", () => {
        expect(stat.IsValidCombatant("character")).toBeTruthy();
      });
      test("it returns false to correct IsValidCombatant", () => {
        expect(stat.IsValidCombatant("characters")).toBeFalsy();
      });

      test("it returns true to correct IsNPC", () => {
        expect(stat.IsNPC("npc")).toBeTruthy();
      });
      test("it returns false to correct IsNPC", () => {
        expect(stat.IsNPC("character")).toBeFalsy();
      });
    });
  });

  describe("If it pulls from localstorage", () => {
    let stat: Stat;
    beforeAll(() => {
      GetStat.mockImplementation(() => encounter);
      stat = new Stat();
    });

    test("it returns true to hasEncounter", () => {
      expect(stat.hasEncounter).toBeTruthy();
    });

    test("it returns a Encounter type", () => {
      expect(stat.encounter.encounterId).toBe("t98gppsau45ypm3t");
    });
  });

  describe("If you add a new combatant", () => {
    let stat: Stat;
    const encounterId = "encounterId";
    beforeAll(() => {
      (global as any).canvas = {
        tokens: {
          get: jest.fn().mockReturnValue({
            img: "testImageUrl",
          }),
        },
      };
      stat = new Stat(encounterId);
    });

    test("it shows the Encounter has one combatant", () => {
      stat.AddCombatant(actor, "tokenId");
      expect(stat.encounter.combatants.length).toBe(1);
    });

    test("you can get the combatant by actor id", () => {
      stat.AddCombatant(actor, "tokenId");
      expect(stat.encounter.combatants.length).toBe(1);
      expect(stat.GetCombatantStats("eMyoELkOwFNPGEK8")?.id).toBe(
        "eMyoELkOwFNPGEK8"
      );
    });

    test("you can get the combatant by actor id", () => {
      stat.AddCombatant(actor, "tokenId");
      expect(stat.encounter.combatants.length).toBe(1);
      expect(stat.GetCombatantStatsByTokenId("tokenId")?.id).toBe(
        "eMyoELkOwFNPGEK8"
      );
    });

    describe("If you add a new Attack", () => {
      test("you can get the combatant by actor id", () => {
        stat.AddCombatant(actor, "tokenId");
        stat.AddAttack(encoutnerMidiWorkflow);
        expect(stat.encounter.combatants.length).toBe(1);
        expect(stat.GetCombatantStats("eMyoELkOwFNPGEK8")?.events.length).toBe(
          1
        );
      });
    });

    describe("If you add a new Kill", () => {
      test("you can see the kill added", () => {
        stat.AddCombatant(actor, "tokenId");
        stat.AddKill("Acolyte", "tokenId");
        expect(stat.encounter.combatants.length).toBe(1);
        expect(stat.GetCombatantStats("eMyoELkOwFNPGEK8")?.kills.length).toBe(
          1
        );
      });
    });

    describe("If you update Health", () => {
      test("you can see the kill added", () => {
        stat.AddCombatant(actor, "tokenId");
        stat.UpdateHealth({
          id: "eMyoELkOwFNPGEK8",
          system: {
            attributes: {
              hp: {
                value: 60,
                max: 100,
              },
            },
          },
        });
        expect(stat.encounter.combatants.length).toBe(1);
        expect(stat.GetCombatantStats("eMyoELkOwFNPGEK8")?.kills.length).toBe(
          1
        );
      });
    });
  });
});
