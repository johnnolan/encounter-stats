import MidiQolStat from "./MidiQolStat";
import Logger from "../Helpers/Logger";
jest.mock("../StatManager");
import { actor } from "../mockdata/actor";
import { CombatDetailType } from "../enums";

const mockLoggerLog = jest.fn();
const mockLoggerWarn = jest.fn();
const mockLoggerError = jest.fn();
Logger.log = mockLoggerLog;
Logger.warn = mockLoggerWarn;
Logger.error = mockLoggerError;

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
  type: CombatDetailType.MidiQol,
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
  type: CombatDetailType.MidiQol,
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
  type: CombatDetailType.MidiQol,
};

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

    test("and it has a missing actor id", () => {
      midiQolStat.AddCombatant(actor, "tokenId", 12);
      midiQolStat.AddAttack({ actor: {} });
      midiQolStat.Save();
      expect(mockLoggerError).toHaveBeenCalled();
    });
    test("and actor does not match the combatant", () => {
      midiQolStat.AddCombatant(actor, "tokenId", 13);
      midiQolStat.AddAttack({ actor: { id: "wrongId" } });
      midiQolStat.Save();
      expect(mockLoggerError).toHaveBeenCalled();
    });
    test("the initial midiQolStats all return 0", () => {
      midiQolStat.AddCombatant(actor, "tokenId", 14);
      midiQolStat.Save();
      expect(midiQolStat.encounter.combatants.length).toBe(1);
      const combatantResult = midiQolStat.GetCombatantStats("eMyoELkOwFNPGEK8");

      expect(midiQolStat.encounter.combatants.length).toBe(1);
      expect(combatantResult?.events.length).toBe(0);

      expect(midiQolStat.encounter.top.maxDamage).toBe("None<br />0");
      expect(midiQolStat.encounter.top.mostDamageInOneTurn).toBe("None<br />0");
      expect(midiQolStat.encounter.top.highestAvgDamage).toBe("None<br />0");
      expect(midiQolStat.encounter.top.highestMaxDamage).toBe("None<br />0");
      expect(midiQolStat.encounter.top.mostKills).toBe("None<br />0");
      expect(midiQolStat.encounter.top.mostHealing).toBe("None<br />0");
      expect(midiQolStat.encounter.top.mostSupportActions).toBe("None<br />0");
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
      const combatantResult = midiQolStat.GetCombatantStats("eMyoELkOwFNPGEK8");
      expect(midiQolStat.encounter.combatants.length).toBe(1);
      expect(combatantResult?.events.length).toBe(3);

      expect(midiQolStat.encounter.top.maxDamage).toBe("Graa S'oua<br />35");
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
      expect(midiQolStat.encounter.top.mostHealing).toBe("Graa S'oua<br />1");
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
});
