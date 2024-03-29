import CampaignRenderer from "./CampaignRenderer";
import CampaignStat from "./CampaignStat";
import EncounterJournal from "./EncounterJournal";
import { ChatRollMode, RoleType } from "./enums";
import Gamemaster from "./Helpers/Gamemaster";
import "../__mocks__/chat-message";

const mockGamemasterGetStats = jest.spyOn(Gamemaster, "GetStats", "get");
const mockGamemasterSetStats = jest.fn();
Gamemaster.SetStats = mockGamemasterSetStats;
const mock_sendRollStreakChatMessage = jest.fn();
CampaignStat._sendRollStreakChatMessage = mock_sendRollStreakChatMessage;

const mockEncounterJournalUpdateJournalData = jest.fn();
EncounterJournal.UpdateJournalData = mockEncounterJournalUpdateJournalData;

const mockCampaignRendererRender = jest.fn().mockResolvedValue("<html></html>");
CampaignRenderer.Render = mockCampaignRendererRender;

beforeEach(() => {
  mockGamemasterGetStats.mockClear();
  mockGamemasterSetStats.mockClear();
  mockEncounterJournalUpdateJournalData.mockClear();
  (global as any).game = {
    i18n: {
      format: jest.fn().mockReturnValue("TestKeyValue"),
    },
    actors: {
      get: jest.fn().mockReturnValueOnce({
        name: "Graa S'oua",
      }),
    },
  };
});

describe("CampaignStat", () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date("01 January 2020"));
  });

  describe("If I have no provious Roll Streak setup", () => {
    beforeEach(() => {
      (global as any).game = {
        i18n: {
          format: jest.fn().mockReturnValue("TestKeyValue"),
        },
        settings: {
          get: jest.fn()
          .mockReturnValueOnce(true).mockReturnValueOnce("2")
          .mockReturnValueOnce(true).mockReturnValueOnce("2").mockReturnValueOnce(true)
          .mockReturnValueOnce(true).mockReturnValueOnce("2").mockReturnValueOnce(true)
          .mockReturnValueOnce(true).mockReturnValueOnce("2").mockReturnValueOnce(true),
        },
      };
      mockGamemasterGetStats.mockReturnValue({
        kills: [],
        heals: [],
        nat20: [],
        nat1: [],
        custom: [],
      });
      jest.spyOn(CampaignStat, "Save");
    });

    test("it adds the Roll Streak correctly", async () => {
      await CampaignStat.AddRollStreak(9, "Graa", "2ybHnw0DeYqwDPyV", ChatRollMode.publicroll);
      await CampaignStat.AddRollStreak(9, "Graa", "2ybHnw0DeYqwDPyV", ChatRollMode.publicroll);
      await CampaignStat.AddRollStreak(9, "Graa", "2ybHnw0DeYqwDPyV", ChatRollMode.publicroll);
      await CampaignStat.AddRollStreak(1, "Graa", "2ybHnw0DeYqwDPyV", ChatRollMode.publicroll);
      expect(mockEncounterJournalUpdateJournalData).toBeCalled();
      expect(mock_sendRollStreakChatMessage).toBeCalled();
      expect(mock_sendRollStreakChatMessage).toBeCalledTimes(2);
      expect(mockGamemasterSetStats).toBeCalled();
      expect(mockGamemasterSetStats).toBeCalledWith({
        kills: [],
        heals: [],
        nat20: [],
        nat1: [],
        custom: [],
        rollstreak: [
          {
            "actorId": "2ybHnw0DeYqwDPyV",
            "actorName": "Graa",
            "dateDisplay": "01 January 2020",
            "roll": 9,
            "total": 3
          }
        ],
        rollstreaklog: [
          {
            actorId: "2ybHnw0DeYqwDPyV",
            results: [1],
          },
        ],
      });
    });
  });

  describe("If I add a new Roll Streak", () => {
    beforeEach(() => {
      (global as any).game = {
        i18n: {
          format: jest.fn().mockReturnValue("TestKeyValue"),
        },
        settings: {
          get: jest.fn()
          .mockReturnValueOnce(true).mockReturnValueOnce("2")
          .mockReturnValueOnce(true).mockReturnValueOnce("2").mockReturnValueOnce(true)
          .mockReturnValueOnce(true).mockReturnValueOnce("2").mockReturnValueOnce(true)
          .mockReturnValueOnce(true).mockReturnValueOnce("2").mockReturnValueOnce(true),
        },
      };
      mockGamemasterGetStats.mockReturnValue({
        kills: [],
        heals: [],
        nat20: [],
        nat1: [],
        custom: [],
        rollstreak: [
          {
            "actorId": "2ybHnw0DeYqwDPyV",
            "actorName": "Graa",
            "dateDisplay": "01 November 2022",
            "roll": 4,
            "total": 3
          }
        ],
        rollstreaklog: [
          {
            actorId: "2ybHnw0DeYqwDPyV",
            results: [9],
          },
        ],
      });
      jest.spyOn(CampaignStat, "Save");
    });

    test("it adds the Roll Streak correctly", async () => {
      await CampaignStat.AddRollStreak(9, "Graa", "2ybHnw0DeYqwDPyV", ChatRollMode.publicroll);
      await CampaignStat.AddRollStreak(9, "Graa", "2ybHnw0DeYqwDPyV", ChatRollMode.publicroll);
      await CampaignStat.AddRollStreak(9, "Graa", "2ybHnw0DeYqwDPyV", ChatRollMode.blindroll);
      await CampaignStat.AddRollStreak(9, "Graa", "2ybHnw0DeYqwDPyV", ChatRollMode.blindroll);
      await CampaignStat.AddRollStreak(1, "Graa", "2ybHnw0DeYqwDPyV", ChatRollMode.blindroll);
      expect(mockEncounterJournalUpdateJournalData).toBeCalled();
      expect(mock_sendRollStreakChatMessage).toBeCalled();
      expect(mock_sendRollStreakChatMessage).toBeCalledTimes(3);
      expect(mockGamemasterSetStats).toBeCalled();
      expect(mockGamemasterSetStats).toBeCalledWith({
        kills: [],
        heals: [],
        nat20: [],
        nat1: [],
        custom: [],
        rollstreak: [
          {
            "actorId": "2ybHnw0DeYqwDPyV",
            "actorName": "Graa",
            "dateDisplay": "01 November 2022",
            "roll": 4,
            "total": 3
          }
        ],
        rollstreaklog: [
          {
            actorId: "2ybHnw0DeYqwDPyV",
            results: [9,9,9,9,9],
          },
        ],
      });
    });
  });

  describe("If I add a new Kill", () => {
    beforeEach(() => {
      mockGamemasterGetStats.mockReturnValue({
        kills: [],
        heals: [],
        nat20: [],
        nat1: [],
        custom: [],
        rollstreak: [],
        rollstreaklog: [],
      });
      jest.spyOn(CampaignStat, "Save");
    });

    test("it adds the kill correctly", async () => {
      await CampaignStat.AddKill("Lorena Aldabra", "Acolyte");
      await CampaignStat.AddKill("Lorena Aldabra", "Ancient Red Dragon");
      expect(mockEncounterJournalUpdateJournalData).toBeCalled();
      expect(mockGamemasterSetStats).toBeCalled();
      expect(mockGamemasterSetStats).toBeCalledWith({
        kills: [
          {
            id: "20200101",
            dateDisplay: "01 January 2020",
            data: [
              {
                actorName: "Lorena Aldabra",
                tokenName: "Acolyte",
                date: "01 January 2020 00:00",
              },
              {
                actorName: "Lorena Aldabra",
                tokenName: "Ancient Red Dragon",
                date: "01 January 2020 00:00",
              },
            ],
          },
        ],
        heals: [],
        nat20: [],
        nat1: [],
        custom: [],
        rollstreak: [],
        rollstreaklog: [],
      });
    });
  });

  describe("If I add a new heal", () => {
    beforeEach(() => {
      mockGamemasterGetStats.mockReturnValue({
        kills: [],
        heals: [],
        nat20: [],
        nat1: [],
        custom: [],
        rollstreak: [],
        rollstreaklog: [],
      });
      jest.spyOn(CampaignStat, "Save");
    });

    test("it adds the heal correctly", async () => {
      await CampaignStat.AddHeal(
        "Lorena Aldabra",
        "@Item Link",
        "Heal Wounds",
        20
      );
      await CampaignStat.AddHeal(
        "Lorena Aldabra",
        undefined,
        "Heal Wounds",
        10
      );
      expect(mockEncounterJournalUpdateJournalData).toBeCalled();
      expect(mockGamemasterSetStats).toBeCalled();
      expect(mockGamemasterSetStats).toBeCalledWith({
        kills: [],
        heals: [
          {
            id: "20200101",
            dateDisplay: "01 January 2020",
            data: [
              {
                actorName: "Lorena Aldabra",
                itemLink: "@Item Link",
                spellName: "Heal Wounds",
                total: 20,
                date: "01 January 2020 00:00",
              },
              {
                actorName: "Lorena Aldabra",
                itemLink: undefined,
                spellName: "Heal Wounds",
                total: 10,
                date: "01 January 2020 00:00",
              },
            ],
          },
        ],
        nat20: [],
        nat1: [],
        custom: [],
        rollstreak: [],
        rollstreaklog: [],
      });
    });
  });

  describe("If I add a new fumble", () => {
    beforeEach(() => {
      mockGamemasterGetStats.mockReturnValue({
        kills: [],
        heals: [],
        nat20: [],
        nat1: [],
        custom: [],
        rollstreak: [],
        rollstreaklog: [],
      });
      jest.spyOn(CampaignStat, "Save");
    });

    test("it adds the fumble correctly", async () => {
      await CampaignStat.AddRole(
        RoleType.Fumble,
        "Lorena Aldabra",
        "Wisdom Check"
      );
      await CampaignStat.AddRole(
        RoleType.Fumble,
        "Lorena Aldabra",
        "Wisdom Check"
      );
      expect(mockEncounterJournalUpdateJournalData).toBeCalled();
      expect(mockGamemasterSetStats).toBeCalled();
      expect(mockGamemasterSetStats).toBeCalledWith({
        kills: [],
        heals: [],
        nat20: [],
        nat1: [
          {
            id: "20200101",
            dateDisplay: "01 January 2020",
            data: [
              {
                actorName: "Lorena Aldabra",
                flavor: "Wisdom Check",
                date: "01 January 2020 00:00",
              },
              {
                actorName: "Lorena Aldabra",
                flavor: "Wisdom Check",
                date: "01 January 2020 00:00",
              },
            ],
          },
        ],
        custom: [],
        rollstreak: [],
        rollstreaklog: [],
      });
    });
  });

  describe("If I add a new critical", () => {
    beforeEach(() => {
      mockGamemasterGetStats.mockReturnValue({
        kills: [],
        heals: [],
        nat20: [],
        nat1: [],
        custom: [],
        rollstreak: [],
        rollstreaklog: [],
      });
      jest.spyOn(CampaignStat, "Save");
    });

    test("it adds the critical correctly", async () => {
      await CampaignStat.AddRole(
        RoleType.Critial,
        "Lorena Aldabra",
        "Insight Check"
      );
      await CampaignStat.AddRole(
        RoleType.Critial,
        "Lorena Aldabra",
        "Insight Check"
      );
      expect(mockEncounterJournalUpdateJournalData).toBeCalled();
      expect(mockGamemasterSetStats).toBeCalled();
      expect(mockGamemasterSetStats).toBeCalledWith({
        kills: [],
        heals: [],
        nat20: [
          {
            id: "20200101",
            dateDisplay: "01 January 2020",
            data: [
              {
                actorName: "Lorena Aldabra",
                flavor: "Insight Check",
                date: "01 January 2020 00:00",
              },
              {
                actorName: "Lorena Aldabra",
                flavor: "Insight Check",
                date: "01 January 2020 00:00",
              },
            ],
          },
        ],
        nat1: [],
        custom: [],
        rollstreak: [],
        rollstreaklog: [],
      });
    });

    test("it adds a custom event", async () => {
      await CampaignStat.AddCustomEvent({
        EventName: "WMS2",
        actorId: "actorId",
        FlavorText: "Wild Magic Surge",
      });
      await CampaignStat.AddCustomEvent({
        EventName: "WMS",
        actorId: "actorId",
        FlavorText: "Wild Magic Surge",
      });
      expect(mockEncounterJournalUpdateJournalData).toBeCalled();
      expect(mockGamemasterSetStats).toBeCalled();
      expect(mockGamemasterSetStats).toBeCalledWith({
        kills: [],
        heals: [],
        nat20: [],
        nat1: [],
        custom: [
          {
            id: "20200101",
            dateDisplay: "01 January 2020",
            data: [
              {
                EventName: "WMS2",
                actorName: "Graa S'oua",
                FlavorText: "Wild Magic Surge",
                date: "01 January 2020 00:00",
              },
              {
                EventName: "WMS",
                actorName: "",
                FlavorText: "Wild Magic Surge",
                date: "01 January 2020 00:00",
              },
            ],
          },
        ],
        rollstreak: [],
        rollstreaklog: [],
      });
    });
  });
});
