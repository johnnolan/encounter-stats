import CampaignRenderer from "./CampaignRenderer";
import { campaignStats1 } from "./mockdata/campaignStats1";

beforeEach(() => {
  (global as any).game = {
    i18n: {
      format: jest.fn().mockReturnValue("TestKeyValue"),
    },
  };
  (global as any).renderTemplate = jest.fn().mockResolvedValue("<html></html>");
});

describe("CampaignRenderer", () => {
  describe("Render", () => {
    test("it generates the journal entry and saves the json data", async () => {
      const resultFunction = await CampaignRenderer.Render(campaignStats1);
      const result = resultFunction.data;

      expect(result.nat1).toStrictEqual([
        { name: "Fighter", value: 7 },
        { name: "Orc", value: 1 },
        { name: "Lorena Aldabra", value: 1 },
      ]);

      expect(result.nat20).toStrictEqual([
        { name: "Fighter", value: 3 },
        { name: "Orc", value: 1 },
        { name: "Lorena Aldabra", value: 1 },
      ]);

      expect(result.heals).toStrictEqual([{ name: "Graa", value: 1 }]);

      expect(result.kills).toStrictEqual([
        { name: "Graa", value: 1 },
        { name: "Lorena Aldabra", value: 1 },
        { name: "Fighter", value: 1 },
      ]);

      expect(result.criticalHistory).toStrictEqual([
        {
          date: "30 September 2022",
          entries: [
            {
              actorName: "Orc",
              flavor: "Greataxe",
              date: "30 September 2022 20:17",
            },
            {
              actorName: "Lorena Aldabra",
              flavor: "Unarmed Strike",
              date: "30 September 2022 20:47",
            },
          ],
        },
        {
          date: "29 September 2022",
          entries: [
            {
              actorName: "Fighter",
              flavor: "Battleaxe",
              date: "29 September 2022 19:19",
            },
            {
              actorName: "Fighter",
              flavor: "Battleaxe",
              date: "29 September 2022 19:19",
            },
            {
              actorName: "Fighter",
              flavor: "Battleaxe",
              date: "29 September 2022 19:21",
            },
          ],
        },
      ]);

      expect(result.fumbleHistory).toStrictEqual([
        {
          date: "29 September 2022",
          entries: [
            {
              actorName: "Fighter",
              flavor: "Battleaxe",
              date: "29 September 2022 19:16",
            },
            {
              actorName: "Fighter",
              flavor: "Battleaxe",
              date: "29 September 2022 19:21",
            },
            {
              actorName: "Fighter",
              flavor: "Battleaxe",
              date: "29 September 2022 19:21",
            },
            {
              actorName: "Fighter",
              flavor: "Battleaxe",
              date: "29 September 2022 19:26",
            },
          ],
        },
        {
          date: "30 September 2022",
          entries: [
            {
              actorName: "Fighter",
              flavor: "Battleaxe",
              date: "30 September 2022 18:10",
            },
            {
              actorName: "Fighter",
              flavor: "Battleaxe",
              date: "30 September 2022 18:22",
            },
            {
              actorName: "Fighter",
              flavor: "Battleaxe",
              date: "30 September 2022 18:22",
            },
            {
              actorName: "Orc",
              flavor: "Greataxe",
              date: "30 September 2022 20:28",
            },
            {
              actorName: "Lorena Aldabra",
              flavor: "Unarmed Strike",
              date: "30 September 2022 20:34",
            },
          ],
        },
      ]);

      expect(result.healsHistory).toStrictEqual([
        {
          date: "30 September 2022",
          entries: [
            {
              actorName: "Graa",
              flavor:
                "@UUID[Actor.2ybHnw0DeYqwDPyV.Item.yAmmCAv5PSEM8X5f]{Potion of Healing (Greater)}",
              date: "30 September 2022 20:03",
              total: 15,
            },
          ],
        },
      ]);

      expect(result.killsHistory).toStrictEqual([
        {
          date: "29 September 2022",
          entries: [
            {
              actorName: "Fighter",
              flavor: "Orc",
              date: "29 September 2022 19:22",
            },
          ],
        },
        {
          date: "30 September 2022",
          entries: [
            {
              actorName: "Graa",
              flavor: "Orc",
              date: "30 September 2022 20:00",
            },
            {
              actorName: "Lorena Aldabra",
              flavor: "Orc Boss",
              date: "30 September 2022 20:04",
            },
          ],
        },
      ]);

      expect(result.customEventHistory).toStrictEqual([
        {
          name: "HDYWTDT",
          events: [
            {
              date: "19 September 2022",
              entries: [
                {
                  actorName: "Graa S'oua",
                  flavor: "How do you want to do this?",
                  date: "19 September 2022 19:49",
                },
              ],
            },
            {
              date: "18 September 2022",
              entries: [
                {
                  actorName: "Graa S'oua",
                  flavor: "How do you want to do this?",
                  date: "19 September 2022 19:49",
                },
              ],
            },
          ],
        },
        {
          name: "You can certainly try",
          events: [
            {
              date: "19 September 2022",
              entries: [
                {
                  actorName: "",
                  flavor: "Said it!",
                  date: "19 September 2022 19:50",
                },
                {
                  actorName: "",
                  flavor: "Said it!",
                  date: "19 September 2022 19:51",
                },
                {
                  actorName: "",
                  flavor: "Said it!",
                  date: "19 September 2022 19:52",
                },
              ],
            },
            {
              date: "18 September 2022",
              entries: [
                {
                  actorName: "",
                  flavor: "Said it!",
                  date: "19 September 2022 19:50",
                },
                {
                  actorName: "",
                  flavor: "Said it!",
                  date: "19 September 2022 19:51",
                },
                {
                  actorName: "",
                  flavor: "Said it!",
                  date: "19 September 2022 19:52",
                },
              ],
            },
          ],
        },
        {
          name: "Wild Magic Surge",
          events: [
            {
              date: "24 September 2022",
              entries: [
                {
                  actorName: "Graa S'oua",
                  flavor:
                    "The caster begins to glow. (As Light spell, no save)",
                  date: "24 September 2022 08:58",
                },
                {
                  actorName: "Graa S'oua",
                  flavor:
                    "The next piece of metal the caster touches turns to gold.",
                  date: "24 September 2022 08:59",
                },
                {
                  actorName: "Graa S'oua",
                  flavor: "Wild Magic Surge with Roll 1",
                  date: "24 September 2022 09:01",
                },
                {
                  actorName: "Graa S'oua",
                  flavor: "Tides of Chaos Wild Magic Surge",
                  date: "24 September 2022 09:01",
                },
                {
                  actorName: "Graa S'oua",
                  flavor: "Tides of Chaos Wild Magic Surge",
                  date: "24 September 2022 09:18",
                },
              ],
            },
            {
              date: "30 September 2022",
              entries: [
                {
                  actorName: "Graa",
                  flavor: "Tides of Chaos Wild Magic Surge",
                  date: "30 September 2022 20:00",
                },
              ],
            },
          ],
        },
      ]);
    });
  });
});
