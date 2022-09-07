import {
  OnCreateCombat,
  OnDeleteCombat,
  OnEncounterWorkflowComplete,
  OnRenderCombatTracker,
  OnTrackDice,
  OnTrackDiceRoll,
  OnTrackKill,
  OnUpdateCombat,
  OnUpdateHealth,
} from "./Handlers";
import CampaignStat from "./CampaignStat";
import { ChatType, RoleType } from "./enums";
import Logger from "./Logger";
import Stat from "./stats/Stat";
import StatManager from "./StatManager";
import EncounterJournal from "./EncounterJournal";
import DND5eStat from "./stats/DND5eStat";
import MidiQolStat from "./stats/MidiQolStat";

const mockCampaignStatAddRole = jest.fn();
const mockCampaignStatAddKill = jest.fn();
const mockCampaignStatAddHeal = jest.fn();
CampaignStat.AddRole = mockCampaignStatAddRole;
CampaignStat.AddKill = mockCampaignStatAddKill;
CampaignStat.AddHeal = mockCampaignStatAddHeal;

const mockStatManagerIsInCombat = jest.fn();
StatManager.IsInCombat = mockStatManagerIsInCombat;

const mockEncounterJournalCreateJournalEntryPage = jest.fn();
EncounterJournal.CreateJournalEntryPage =
  mockEncounterJournalCreateJournalEntryPage;

const mockStatUpdateRound = jest
  .spyOn(Stat.prototype, "UpdateRound")
  .mockImplementation(() => {});
const mockStatAddCombatant = jest
  .spyOn(Stat.prototype, "AddCombatant")
  .mockImplementation(() => {});
const mockStatUpdateHealth = jest.spyOn(Stat.prototype, "UpdateHealth").mockImplementation();
const mockStatGetCombatantStatsByTokenId = jest.spyOn(Stat.prototype, "GetCombatantStatsByTokenId").mockImplementation();
const mockStatGetCombatantStats = jest.spyOn(Stat.prototype, "GetCombatantStats").mockImplementation();
const mockStatAddKill = jest.spyOn(Stat.prototype, "AddKill").mockImplementation();
const mockStatSave = jest.spyOn(Stat.prototype, "Save").mockImplementation();
const mockStatDelete = jest
.spyOn(Stat.prototype, "Delete")
.mockImplementation();

const mockDND5eStatAddAttack = jest.spyOn(DND5eStat.prototype, "AddAttack").mockImplementation();
const mockMidiQolStatAddAttack = jest.spyOn(MidiQolStat.prototype, "AddAttack").mockImplementation();

const mockLoggerLog = jest.fn();
const mockLoggerDebug = jest.fn();
const mockLoggerError = jest.fn();
const mockLoggerWarn = jest.fn();
Logger.log = mockLoggerLog;
Logger.debug = mockLoggerDebug;
Logger.error = mockLoggerError;
Logger.warn = mockLoggerWarn;

beforeEach(() => {
  mockCampaignStatAddRole.mockClear();
  mockCampaignStatAddHeal.mockClear();
  mockCampaignStatAddKill.mockClear();
  mockLoggerLog.mockClear();
  mockLoggerDebug.mockClear();
  mockLoggerError.mockClear();
  mockEncounterJournalCreateJournalEntryPage.mockClear();
  mockStatManagerIsInCombat.mockClear();
  mockStatUpdateRound.mockClear();
  mockStatAddCombatant.mockClear();
  mockStatGetCombatantStatsByTokenId.mockClear();
  mockStatGetCombatantStats.mockClear();
  mockStatSave.mockClear();
  mockStatDelete.mockClear();
  mockStatUpdateHealth.mockClear();
  mockStatAddKill.mockClear();
  mockDND5eStatAddAttack.mockClear();
  mockMidiQolStatAddAttack.mockClear();
});

describe("Handlers", () => {
  describe("OnTrackDiceRoll", () => {
    test("it adds a Fumble", async () => {
      OnTrackDiceRoll(1, "Lorena Aldabra", "Intelligence Check");
      expect(mockCampaignStatAddRole).toBeCalled();
      expect(mockCampaignStatAddRole).toBeCalledWith(
        RoleType.Fumble,
        "Lorena Aldabra",
        "Intelligence Check"
      );
    });

    test("it adds a Critical", async () => {
      OnTrackDiceRoll(20, "Lorena Aldabra", "Intelligence Check");
      expect(mockCampaignStatAddRole).toBeCalled();
      expect(mockCampaignStatAddRole).toBeCalledWith(
        RoleType.Critial,
        "Lorena Aldabra",
        "Intelligence Check"
      );
    });

    test("it adds nothing", async () => {
      OnTrackDiceRoll(18, "Lorena Aldabra", "Intelligence Check");
      expect(mockCampaignStatAddRole).not.toBeCalled();
    });

    test("it adds nothing", async () => {
      OnTrackDiceRoll(undefined, "Lorena Aldabra", "Intelligence Check");
      expect(mockCampaignStatAddRole).not.toBeCalled();
    });
  });

  describe("OnUpdateCombat", () => {
    test("it returns if no round set", async () => {
      OnUpdateCombat(undefined);
      expect(mockLoggerLog).toBeCalled();
      expect(mockLoggerLog).toBeCalledWith(
        "No new round",
        "handlers.OnUpdateCombat",
        undefined
      );
      expect(mockStatUpdateRound).not.toBeCalled();
      expect(mockStatSave).not.toBeCalled();
      expect(mockLoggerDebug).not.toBeCalled();
    });

    test("it returns if no round set", async () => {
      await OnUpdateCombat(1);
      expect(mockLoggerLog).not.toBeCalled();
      expect(mockStatUpdateRound).toBeCalledWith(1);
      expect(mockStatSave).toBeCalled();
      expect(mockLoggerDebug).toBeCalledWith(
        "Start of round 1",
        "handlers.OnUpdateCombat"
      );
    });
  });

  describe("OnRenderCombatTracker", () => {
    test("it should return if Combat Tracker Event has no combat active", async () => {
      await OnRenderCombatTracker({ hasCombat: false });
      expect(mockLoggerLog).toBeCalled();
      expect(mockLoggerLog).toBeCalledWith(
        "Combat Tracker Event has no combat active",
        "handlers.OnRenderCombatTracker",
        { hasCombat: false }
      );
      expect(mockStatAddCombatant).not.toBeCalled();
      expect(mockStatSave).not.toBeCalled();
      expect(mockLoggerDebug).not.toBeCalled();
    });

    test("it should add the combatant", async () => {
      (global as any).game = {
        actors: {
          get: jest.fn().mockReturnValue({ name: "Actor Name" }),
        },
      };
      await OnRenderCombatTracker({
        hasCombat: true,
        combat: {
          combatants: [
            {
              actorId: "actorId",
              tokenId: "tokenId",
            },
          ],
        },
      });
      expect(mockLoggerLog).not.toBeCalled();
      expect(mockStatAddCombatant).toBeCalledWith(
        { name: "Actor Name" },
        "tokenId"
      );
      expect(mockStatSave).toBeCalled();
      expect(mockLoggerDebug).toBeCalledWith(
        "Combatants Added",
        "handlers.OnRenderCombatTracker"
      );
    });
  });

  describe("OnCreateCombat", () => {
    test("it should return if Missing encounterId", async () => {
      await OnCreateCombat({});
      expect(mockLoggerError).toBeCalled();
      expect(mockLoggerError).toBeCalledWith(
        "Missing encounterId",
        "handlers.OnCreateCombat",
        {}
      );
      expect(mockStatSave).not.toBeCalled();
      expect(mockLoggerDebug).not.toBeCalled();
    });

    test("it should Create a journal entry and new Stat", async () => {
      await OnCreateCombat({ id: "encounterId" });
      expect(mockLoggerError).not.toBeCalled();
      expect(mockEncounterJournalCreateJournalEntryPage).toBeCalledWith(
        "encounterId"
      );
      expect(mockStatSave).toBeCalled();
      expect(mockLoggerDebug).toBeCalledWith(
        "Combat Started",
        "handlers.OnCreateCombat"
      );
    });
  });

  describe("OnDeleteCombat", () => {
    test("it should Delete the stat", async () => {
      await OnDeleteCombat();
      expect(mockStatDelete).toBeCalled();
      expect(mockLoggerDebug).toBeCalledWith(
        "Combat Ended",
        "handlers.OnDeleteCombat"
      );
    });
  });

  describe("OnTrackDice", () => {
    test("it return if nothing passes", async () => {
      await OnTrackDice(undefined);
      expect(mockCampaignStatAddRole).not.toBeCalled();
    });

    test("it return if no critical or fumble passed", async () => {
      await OnTrackDice({ id: "testId" });
      expect(mockCampaignStatAddRole).not.toBeCalled();
    });

    test("it return if critical", async () => {
      await OnTrackDice({
        isCritical: true,
        isFumble: false,
        name: "Lorena Aldabra",
        flavor: "intelligence",
      });
      expect(mockCampaignStatAddRole).toBeCalledWith(
        RoleType.Critial,
        "Lorena Aldabra",
        "intelligence"
      );
    });

    test("it return if fumble", async () => {
      await OnTrackDice({
        isCritical: false,
        isFumble: true,
        name: "Lorena Aldabra",
        flavor: "intelligence",
      });
      expect(mockCampaignStatAddRole).toBeCalledWith(
        RoleType.Fumble,
        "Lorena Aldabra",
        "intelligence"
      );
    });
  });

  //TODO: OnEncounterWorkflowComplete
  describe("OnEncounterWorkflowComplete", () => {
    test("it should not enter the workflow if in not in combat", async () => {
      mockStatManagerIsInCombat.mockReturnValueOnce(false);
      await OnEncounterWorkflowComplete({}, ChatType.DND5e);
      expect(mockDND5eStatAddAttack).not.toBeCalled();
      expect(mockStatSave).not.toBeCalled();
    });

    test("it should not enter the workflow if workflow is undefined", async () => {
      mockStatManagerIsInCombat.mockReturnValueOnce(true);
      await OnEncounterWorkflowComplete(undefined, ChatType.DND5e);
      expect(mockDND5eStatAddAttack).not.toBeCalled();
      expect(mockStatSave).not.toBeCalled();
    });

    test("it should not enter the workflow if chattype is wrong", async () => {
      mockStatManagerIsInCombat.mockReturnValueOnce(true);
      await OnEncounterWorkflowComplete({}, "asd");
      expect(mockDND5eStatAddAttack).not.toBeCalled();
      expect(mockStatSave).not.toBeCalled();
    });

    test("it should Add a DND5e Attack if that type", async () => {
      mockStatManagerIsInCombat.mockReturnValueOnce(true);
      await OnEncounterWorkflowComplete({}, ChatType.DND5e);
      expect(mockDND5eStatAddAttack).toBeCalledWith({});
      expect(mockMidiQolStatAddAttack).not.toBeCalled();
      expect(mockStatSave).toBeCalled();
    });

    test("it should Add a Midi Attack if that type", async () => {
      mockStatManagerIsInCombat.mockReturnValueOnce(true);
      await OnEncounterWorkflowComplete({}, ChatType.MidiQol);
      expect(mockDND5eStatAddAttack).not.toBeCalled();
      expect(mockMidiQolStatAddAttack).toBeCalledWith({});
      expect(mockStatSave).toBeCalled();
    });

    test("it should Add a Heal if that type", async () => {
      mockStatManagerIsInCombat.mockReturnValueOnce(true);
      mockStatGetCombatantStats.mockReturnValueOnce({ name: "Lorena Aldabra" });
      
      await OnEncounterWorkflowComplete({
        actor: {
          id: "actorId",
        }
        actionType: "heal",
        damageTotal: 12,
        item: {
          name: "Healing Hands",
          link: "@itemLink",
        }
      }, ChatType.MidiQol);
      expect(mockDND5eStatAddAttack).not.toBeCalled();
      expect(mockCampaignStatAddHeal).toBeCalledWith("Lorena Aldabra", "@itemLink", "Healing Hands", 12);
      expect(mockStatSave).toBeCalled();
    });

    test("it should Add a Heal with 0 damage if null", async () => {
      mockStatManagerIsInCombat.mockReturnValueOnce(true);
      mockStatGetCombatantStats.mockReturnValueOnce({ name: "Lorena Aldabra" });
      
      await OnEncounterWorkflowComplete({
        actor: {
          id: "actorId",
        }
        actionType: "heal",
        item: {
          name: "Healing Hands",
          link: "@itemLink",
        }
      }, ChatType.MidiQol);
      expect(mockDND5eStatAddAttack).not.toBeCalled();
      expect(mockCampaignStatAddHeal).toBeCalledWith("Lorena Aldabra", "@itemLink", "Healing Hands", 0);
      expect(mockStatSave).toBeCalled();
    });

    test("it should Log a warning if no combatant for the heal", async () => {
      mockStatManagerIsInCombat.mockReturnValueOnce(true);
      mockStatGetCombatantStats.mockReturnValueOnce(undefined);
      
      await OnEncounterWorkflowComplete({
        actor: {
          id: "actorId",
        }
        actionType: "heal",
        damageTotal: 12,
        item: {
          name: "Healing Hands",
          link: "@itemLink",
        }
      }, ChatType.MidiQol);
      expect(mockDND5eStatAddAttack).not.toBeCalled();
      expect(mockCampaignStatAddHeal).not.toBeCalled();
      expect(mockStatSave).toBeCalled();
      expect(mockLoggerWarn).toBeCalledWith("Missing Combatant for Heal", "handlers.OnEncounterWorkflowComplete", 
      {
        actor: {
          id: "actorId",
        }
        actionType: "heal",
        damageTotal: 12,
        item: {
          name: "Healing Hands",
          link: "@itemLink",
        }
      });
    });
  });

  describe("OnUpdateHealth", () => {
    test("it should not update health in not in combat", async () => {
      mockStatManagerIsInCombat.mockReturnValueOnce(false);
      await OnUpdateHealth({});
      expect(mockStatUpdateHealth).not.toBeCalled();
      expect(mockStatSave).not.toBeCalled();
    });

    test("it should update health if in combat", async () => {
      mockStatManagerIsInCombat.mockReturnValueOnce(true);
      await OnUpdateHealth({ name: "Lorena Aldabra" });
      expect(mockStatUpdateHealth).toBeCalledWith({ name: "Lorena Aldabra" });
      expect(mockStatSave).toBeCalled();
    });
  });

  describe("OnTrackKill", () => {
    test("it should not track the kill while not in combat", async () => {
      mockStatManagerIsInCombat.mockReturnValueOnce(false);
      await OnTrackKill({});
      expect(mockStatAddKill).not.toBeCalled();
      expect(mockStatSave).not.toBeCalled();
      expect(mockStatGetCombatantStatsByTokenId).not.toBeCalled();
      expect(mockCampaignStatAddKill).not.toBeCalled();
    });

    test("it should track the kill if in combat", async () => {
      mockStatManagerIsInCombat.mockReturnValueOnce(true);
      mockStatGetCombatantStatsByTokenId.mockReturnValueOnce({ name: "Lorena Aldabra" });
      await OnTrackKill("targetName", "tokenId");
      expect(mockStatAddKill).toBeCalledWith("targetName", "tokenId");
      expect(mockStatSave).toBeCalled();
      expect(mockStatGetCombatantStatsByTokenId).toBeCalledWith("tokenId");
      expect(mockCampaignStatAddKill).toBeCalledWith("Lorena Aldabra", "targetName");
    });
  });
});
