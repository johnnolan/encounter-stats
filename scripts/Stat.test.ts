import {
  Encounter,
  EncounterWorkflow,
  CombatEventSummaryList,
  EncounterRoundSummary,
} from "./types/globals";
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

const encoutnerMidiWorkflow: EncounterWorkflow = {
  id: "d75gppsau45ypm2m",
  actionType: "mwak",
  actor: {
    id: "eMyoELkOwFNPGEK8",
  },
  advantage: true,
  isCritical: false,
  isFumble: false,
  disadvantage: false,
  attackRoll: 18,
  damageRoll: 20,
  damageMultipleEnemiesTotal: 0,
  workflowType: "test",
  attackTotal: 12,
  damageTotal: 20,
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
const encoutnerMidiWorkflow2: EncounterWorkflow = {
  id: "d75gppsau45ypm2b",
  actionType: "mwak",
  actor: {
    id: "eMyoELkOwFNPGEK8",
  },
  advantage: true,
  isCritical: false,
  isFumble: false,
  disadvantage: false,
  attackRoll: 18,
  damageRoll: 18,
  damageMultipleEnemiesTotal: 0,
  workflowType: "test",
  attackTotal: 12,
  damageTotal: 15,
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

const encoutnerMidiWorkflowHeal: EncounterWorkflow = {
  id: "d75gppsau45ypm2c",
  actionType: "heal",
  actor: {
    id: "eMyoELkOwFNPGEK8",
  },
  advantage: true,
  isCritical: false,
  isFumble: false,
  disadvantage: false,
  attackRoll: 18,
  damageRoll: 18,
  damageMultipleEnemiesTotal: 0,
  workflowType: "test",
  attackTotal: 12,
  damageTotal: 15,
  item: {
    id: "itemId",
    name: "Flame Tongue Greatsword",
    link: "@Compendium[dnd5e.items.WWb4vAmh18sMAxfY]{Flame Tongue Greatsword}",
    type: "sword",
    img: "itemImageUrl",
  },
};

describe("Stat", () => {
  describe("If it is a new encounter", () => {
    let stat: Stat;
    const encounterId = "encounterId";
    beforeEach(() => {
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
          mostKills: "",
          mostHealing: "",
          mostSupportActions: "",
          mostBattlefieldActions: ",",
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
    beforeEach(() => {
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
      test("the initial stats all return 0", () => {
        stat.AddCombatant(actor, "tokenId");
        stat.Save();
        expect(stat.encounter.combatants.length).toBe(1);
        const combatantResult = stat.GetCombatantStats("eMyoELkOwFNPGEK8");

        expect(stat.encounter.combatants.length).toBe(1);
        expect(combatantResult?.events.length).toBe(0);

        expect(stat.encounter.top.maxDamage).toBe("None<br />0");
        expect(stat.encounter.top.mostDamageInOneTurn).toBe("None<br />0");
        expect(stat.encounter.top.highestAvgDamage).toBe("None<br />0");
        expect(stat.encounter.top.highestMaxDamage).toBe("None<br />0");
        expect(stat.encounter.top.mostKills).toBe("None<br />0");
        expect(stat.encounter.top.mostHealing).toBe("None<br />0");
        expect(stat.encounter.top.mostSupportActions).toBe("None<br />0");
        expect(stat.encounter.top.mostBattlefieldActions).toBe("None<br />0");

        expect(combatantResult?.summaryList).toStrictEqual(<
          CombatEventSummaryList
        >{ min: 0, max: 0, avg: 0, total: 0 });
        expect(combatantResult?.roundSummary).toStrictEqual(<
          EncounterRoundSummary
        >{
          totals: [],
        });
      });
      test("you can get the combatant by actor id", () => {
        stat.AddCombatant(actor, "tokenId");
        stat.AddAttack(encoutnerMidiWorkflow);
        stat.AddAttack(encoutnerMidiWorkflow2);
        stat.AddAttack(encoutnerMidiWorkflowHeal);
        stat.AddKill("Acolyte", "tokenId");
        stat.Save();
        expect(stat.encounter.combatants.length).toBe(1);
        const combatantResult = stat.GetCombatantStats("eMyoELkOwFNPGEK8");
        expect(stat.encounter.combatants.length).toBe(1);
        expect(combatantResult?.events.length).toBe(3);

        expect(stat.encounter.top.maxDamage).toBe("Graa S'oua<br />35");
        expect(stat.encounter.top.mostDamageInOneTurn).toBe(
          "Graa S'oua<br />35"
        );
        expect(stat.encounter.top.highestAvgDamage).toBe("Graa S'oua<br />18");
        expect(stat.encounter.top.highestMaxDamage).toBe("Graa S'oua<br />20");
        expect(stat.encounter.top.mostKills).toBe("Graa S'oua<br />1");
        expect(stat.encounter.top.mostHealing).toBe("Graa S'oua<br />1");
        expect(stat.encounter.top.mostSupportActions).toBe("Graa S'oua<br />1");
        expect(stat.encounter.top.mostBattlefieldActions).toBe(
          "Graa S'oua<br />0"
        );

        expect(combatantResult?.summaryList).toStrictEqual(<
          CombatEventSummaryList
        >{ min: 15, max: 20, avg: 18, total: 35 });
        expect(combatantResult?.roundSummary).toStrictEqual(<
          EncounterRoundSummary
        >{
          totals: [
            {
              round: 1,
              damageTotal: 35,
            },
          ],
        });
      });
    });

    describe("If you add a new Kill", () => {
      test("you can see the kill added", () => {
        stat.AddCombatant(actor, "tokenId");
        stat.AddKill("Acolyte", "tokenId");
        stat.Save();
        expect(stat.encounter.combatants.length).toBe(1);
        expect(stat.GetCombatantStats("eMyoELkOwFNPGEK8")?.kills.length).toBe(
          1
        );
      });
    });

    describe("If you update Health", () => {
      test("you can see healing done", () => {
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
        stat.Save();
        expect(stat.encounter.combatants.length).toBe(1);
        const combatantResult = stat.GetCombatantStats("eMyoELkOwFNPGEK8");
        expect(combatantResult?.health.length).toBe(1);
        expect(combatantResult?.health[0].current).toBe(60);
        expect(combatantResult?.health[0].previous).toBe(80);
      });
    });
  });
});
