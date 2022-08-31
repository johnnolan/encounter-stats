import Stat from "./Stat";
import DND5eStat from "./DND5eStat";
import MidiQolStat from "./MidiQolStat";
import Logger from "../Logger";
jest.mock("../StatManager");
import StatManager from "../StatManager";
import { actor } from "../mockdata/actor";
import { chatActor } from "../mockdata/chatActor";
import { ChatMessageType } from "../enums";

const mockLoggerLog = jest.fn();
const mockLoggerWarn = jest.fn();
Logger.log = mockLoggerLog;
Logger.warn = mockLoggerWarn;

const encounter: Encounter = {
  encounterId: "t98gppsau45ypm3t",
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
    mostBattlefieldActions: "",
  },
  templateHealthCheck: [],
};

const encounterMidiWorkflow: EncounterWorkflow = {
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
  type: ChatMessageType.MidiQol,
};

const encounterMidiWorkflow2: EncounterWorkflow = {
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
  type: ChatMessageType.MidiQol,
};

const encounterMidiWorkflowHeal: EncounterWorkflow = {
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
  type: ChatMessageType.MidiQol,
};

const encounterDefaultWorkflowItemCard: EncounterWorkflow = {
  id: `C3c6l9SPMCqMiceV5H4YnyD6zf9vcJ3P`,
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
  type: ChatMessageType.ItemCard,
};

const encounterDefaultWorkflowAttack: EncounterWorkflow = {
  id: `C3c6l9SPMCqMiceV5H4YnyD6zf9vcJ3P`,
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
};

const encounterDefaultWorkflowDamage: EncounterWorkflow = {
  id: `C3c6l9SPMCqMiceV5H4YnyD6zf9vcJ3P`,
  actor: {
    id: "5H4YnyD6zf9vcJ3P",
  },
  damageRoll: 41,
  damageTotal: 41,
  damageMultipleEnemiesTotal: 41,
  type: ChatMessageType.Damage,
};

describe("Stat", () => {
  describe("If it is a new encounter", () => {
    let stat: Stat;
    const encounterId = "encounterId";
    beforeEach(() => {
      stat = new Stat(encounterId);
      StatManager.RemoveStat.mockImplementation(() => true);
      StatManager.SaveStat.mockImplementation(() => true);
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
      expect(StatManager.RemoveStat).toBeCalled();
    });

    test("it calls SaveStat", () => {
      stat.Save();
      expect(StatManager.SaveStat).toBeCalled();
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
        expect(Stat.IsNPC("npc")).toBeTruthy();
      });
      test("it returns false to correct IsNPC", () => {
        expect(Stat.IsNPC("character")).toBeFalsy();
      });
    });
  });

  describe("If it pulls from localstorage", () => {
    let stat: Stat;
    beforeAll(() => {
      StatManager.GetStat.mockImplementation(() => encounter);
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

    describe("MidiQol", () => {
      let midiQolStat: MidiQolStat;
      const encounterId = "encounterId";
      beforeEach(() => {
        (global as any).canvas = {
          tokens: {
            get: jest.fn().mockReturnValue({
              img: "testImageUrl",
            }),
          },
        };
        midiQolStat = new MidiQolStat(encounterId);
      });
      describe("If you add a new Attack", () => {
        test("the initial midiQolStats all return 0", () => {
          midiQolStat.AddCombatant(actor, "tokenId");
          midiQolStat.Save();
          expect(midiQolStat.encounter.combatants.length).toBe(1);
          const combatantResult =
            midiQolStat.GetCombatantStats("eMyoELkOwFNPGEK8");

          expect(midiQolStat.encounter.combatants.length).toBe(1);
          expect(combatantResult?.events.length).toBe(0);

          expect(midiQolStat.encounter.top.maxDamage).toBe("None<br />0");
          expect(midiQolStat.encounter.top.mostDamageInOneTurn).toBe(
            "None<br />0"
          );
          expect(midiQolStat.encounter.top.highestAvgDamage).toBe(
            "None<br />0"
          );
          expect(midiQolStat.encounter.top.highestMaxDamage).toBe(
            "None<br />0"
          );
          expect(midiQolStat.encounter.top.mostKills).toBe("None<br />0");
          expect(midiQolStat.encounter.top.mostHealing).toBe("None<br />0");
          expect(midiQolStat.encounter.top.mostSupportActions).toBe(
            "None<br />0"
          );
          expect(midiQolStat.encounter.top.mostBattlefieldActions).toBe(
            "None<br />0"
          );

          expect(combatantResult?.summaryList).toStrictEqual(<
            CombatantEventSummaryList
          >{ min: 0, max: 0, avg: 0, total: 0 });
          expect(combatantResult?.roundSummary).toStrictEqual(<
            EncounterRoundSummary
          >{
            totals: [],
          });
        });
        test("you can get the combatant by actor id", () => {
          midiQolStat.AddCombatant(actor, "tokenId");
          midiQolStat.AddAttack(encounterMidiWorkflow);
          midiQolStat.AddAttack(encounterMidiWorkflow2);
          midiQolStat.AddAttack(encounterMidiWorkflowHeal);
          midiQolStat.AddKill("Acolyte", "tokenId");
          midiQolStat.Save();
          expect(midiQolStat.encounter.combatants.length).toBe(1);
          const combatantResult =
            midiQolStat.GetCombatantStats("eMyoELkOwFNPGEK8");
          expect(midiQolStat.encounter.combatants.length).toBe(1);
          expect(combatantResult?.events.length).toBe(3);

          expect(midiQolStat.encounter.top.maxDamage).toBe(
            "Graa S'oua<br />35"
          );
          expect(midiQolStat.encounter.top.mostDamageInOneTurn).toBe(
            "Graa S'oua<br />35"
          );
          expect(midiQolStat.encounter.top.highestAvgDamage).toBe(
            "Graa S'oua<br />18"
          );
          expect(midiQolStat.encounter.top.highestMaxDamage).toBe(
            "Graa S'oua<br />20"
          );
          expect(midiQolStat.encounter.top.mostKills).toBe("Graa S'oua<br />1");
          expect(midiQolStat.encounter.top.mostHealing).toBe(
            "Graa S'oua<br />1"
          );
          expect(midiQolStat.encounter.top.mostSupportActions).toBe(
            "Graa S'oua<br />1"
          );
          expect(midiQolStat.encounter.top.mostBattlefieldActions).toBe(
            "Graa S'oua<br />0"
          );

          expect(combatantResult?.summaryList).toStrictEqual(<
            CombatantEventSummaryList
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
          midiQolStat.AddCombatant(actor, "tokenId");
          midiQolStat.AddKill("Acolyte", "tokenId");
          midiQolStat.Save();
          expect(midiQolStat.encounter.combatants.length).toBe(1);
          expect(
            midiQolStat.GetCombatantStats("eMyoELkOwFNPGEK8")?.kills.length
          ).toBe(1);
        });

        test("you can see a Log message if not valid", () => {
          midiQolStat.AddCombatant(actor, "tokenId");
          midiQolStat.AddKill("Acolyte", "tokenIdError");
          midiQolStat.Save();
          expect(mockLoggerWarn).toBeCalled();
          expect(midiQolStat.encounter.combatants.length).toBe(1);
          expect(
            midiQolStat.GetCombatantStats("eMyoELkOwFNPGEK8")?.kills.length
          ).toBe(0);
        });
      });

      describe("If you update Health", () => {
        test("you can see healing done", () => {
          midiQolStat.AddCombatant(actor, "tokenId");
          midiQolStat.UpdateHealth({
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
          midiQolStat.Save();
          expect(midiQolStat.encounter.combatants.length).toBe(1);
          const combatantResult =
            midiQolStat.GetCombatantStats("eMyoELkOwFNPGEK8");
          expect(combatantResult?.health.length).toBe(1);
          expect(combatantResult?.health[0].current).toBe(60);
          expect(combatantResult?.health[0].previous).toBe(80);
        });

        test("you can a log message when no actor passes", () => {
          midiQolStat.AddCombatant(actor, "tokenId");
          midiQolStat.UpdateHealth({
            system: {
              attributes: {
                hp: {
                  value: 60,
                  max: 100,
                },
              },
            },
          });
          midiQolStat.Save();
          expect(mockLoggerWarn).toBeCalled();
          expect(midiQolStat.encounter.combatants.length).toBe(1);
          const combatantResult =
            midiQolStat.GetCombatantStats("eMyoELkOwFNPGEK8");
          expect(combatantResult?.health.length).toBe(0);
        });
      });
      test("you can a log message when no actor can be found", () => {
        midiQolStat.AddCombatant(actor, "tokenId");
        midiQolStat.UpdateHealth({
          id: "eMyoELkOwFNPGEK9",
          system: {
            attributes: {
              hp: {
                value: 60,
                max: 100,
              },
            },
          },
        });
        midiQolStat.Save();
        expect(mockLoggerWarn).toBeCalled();
        expect(midiQolStat.encounter.combatants.length).toBe(1);
        const combatantResult =
          midiQolStat.GetCombatantStats("eMyoELkOwFNPGEK8");
        expect(combatantResult?.health.length).toBe(0);
      });
    });
    });
    describe("Default", () => {
      let dnd5eStat: DND5eStat;
      const encounterId = "encounterId";
      beforeEach(() => {
        (global as any).canvas = {
          tokens: {
            get: jest.fn().mockReturnValue({
              img: "testImageUrl",
            }),
          },
        };
        dnd5eStat = new DND5eStat(encounterId);
      });
      describe("If you add a new Attack", () => {
        test("The basic Item Card is added", () => {
          dnd5eStat.AddCombatant(chatActor, "tokenId");
          dnd5eStat.AddAttack(encounterDefaultWorkflowItemCard);
          dnd5eStat.Save();
          expect(dnd5eStat.encounter.combatants.length).toBe(1);
          const combatantResult =
            dnd5eStat.GetCombatantStats("5H4YnyD6zf9vcJ3P");
          expect(combatantResult?.events.length).toBe(1);
          expect(combatantResult?.events[0]).toStrictEqual({
            id: "C3c6l9SPMCqMiceV5H4YnyD6zf9vcJ3P",
            actorId: "5H4YnyD6zf9vcJ3P",
            item: {
              id: "C3c6l9SPMCqMiceV",
              name: "Flame Tongue Greatsword",
              link: "@Compendium[dnd5e.items.WWb4vAmh18sMAxfY]{Flame Tongue Greatsword}",
              type: "sword",
              img: "itemImageUrl",
            },
            round: 1,
            attackTotal: 0,
            damageTotal: 0,
          });
        });

        test("The Attack is added to the same item card", async () => {
          dnd5eStat.AddCombatant(chatActor, "tokenId");
          dnd5eStat.AddAttack(encounterDefaultWorkflowItemCard);
          dnd5eStat.AddAttack(encounterDefaultWorkflowAttack);
          dnd5eStat.Save();
          expect(dnd5eStat.encounter.combatants.length).toBe(1);
          const combatantResult =
            dnd5eStat.GetCombatantStats("5H4YnyD6zf9vcJ3P");
          expect(combatantResult?.events.length).toBe(1);
          expect(combatantResult?.events[0]).toStrictEqual({
            id: "C3c6l9SPMCqMiceV5H4YnyD6zf9vcJ3P",
            actorId: "5H4YnyD6zf9vcJ3P",
            item: {
              id: "C3c6l9SPMCqMiceV",
              name: "Flame Tongue Greatsword",
              link: "@Compendium[dnd5e.items.WWb4vAmh18sMAxfY]{Flame Tongue Greatsword}",
              type: "sword",
              img: "itemImageUrl",
            },
            round: 1,
            attackTotal: 19,
            isCritical: false,
            isFumble: false,
            advantage: true,
            disadvantage: false,
            damageTotal: 0,
          });
        });

        test("The Damage is added to the same item card", async () => {
          dnd5eStat.AddCombatant(chatActor, "tokenId");
          dnd5eStat.AddAttack(encounterDefaultWorkflowItemCard);
          dnd5eStat.AddAttack(encounterDefaultWorkflowAttack);
          dnd5eStat.AddAttack(encounterDefaultWorkflowDamage);
          dnd5eStat.Save();
          expect(dnd5eStat.encounter.combatants.length).toBe(1);
          const combatantResult =
            dnd5eStat.GetCombatantStats("5H4YnyD6zf9vcJ3P");
          expect(combatantResult?.events.length).toBe(1);
          expect(combatantResult?.events[0]).toStrictEqual({
            id: "C3c6l9SPMCqMiceV5H4YnyD6zf9vcJ3P",
            actorId: "5H4YnyD6zf9vcJ3P",
            item: {
              id: "C3c6l9SPMCqMiceV",
              name: "Flame Tongue Greatsword",
              link: "@Compendium[dnd5e.items.WWb4vAmh18sMAxfY]{Flame Tongue Greatsword}",
              type: "sword",
              img: "itemImageUrl",
            },
            round: 1,
            attackTotal: 19,
            isCritical: false,
            isFumble: false,
            advantage: true,
            disadvantage: false,
            damageTotal: 41,
          });
        });
      });
    });
  });
});
