import { beforeAll } from "@jest/globals";
import { Generate } from "./Template";

let statsDataWithNoEvents;
let statsData;
global.game = {
  i18n: {
    format: jest.fn().mockReturnValue("Mocked Translation"),
  },
};
beforeAll(() => {
  statsDataWithNoEvents = {
    encounterId: "sze0mlf69xCj913F",
    combatants: [
      {
        name: "Graa",
        id: "WTi2ws6xbFXJBhAb",
        img: "/test/img.png",
        hp: "13",
        type: "character",
        max: "16",
        ac: "11",
        events: [],
        summaryList: {
          min: "18",
          max: "18",
          avg: "18",
          total: "18",
        },
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
              round: "1",
              damageTotal: 2,
            },
            {
              round: "2",
              damageTotal: 8,
            },
          ],
        },
        health: [
          {
            id: null,
            round: 1,
            tokenId: null,
            actorId: null,
            max: 0,
            diff: 0,
            previous: 0,
            current: 0,
            isdamage: false,
            isheal: false,
          },
        ],
      },
    ],
    top: {
      maxDamage: "Lorena Aldabra<br />57",
      mostDamageInOneTurn: "Graa S'oua<br />16",
      highestAvgDamage: "Graa S'oua<br />49",
      highestMaxDamage: "Graa S'oua<br />49",
    },
  };
  statsData = {
    encounterId: "sze0mlf69xCj913F",
    combatants: [
      {
        name: "Graa",
        id: "WTi2ws6xbFXJBhAb",
        img: "/test/img.png",
        hp: "13",
        type: "character",
        max: "16",
        ac: "11",
        events: [
          {
            id: "sze0mlf69xCj913G",
            actionType: "rsak",
            round: "2",
            advantage: false,
            disadvantage: false,
            attackTotal: "15",
            damageTotal: "18",
            tokenId: "WTi2ws6xbFXJBhAv",
            actorId: "WTi2ws6xbFXJBhAd",
            isCritical: false,
            isFumble: false,
            item: {
              itemLink:
                "@Compendium[dnd5e.spells.5SuJewoa1CRWaj1F]{Burning Hands}",
              name: "Burning Hands",
            },
          },
          {
            id: "sze0mlf69xCj913G",
            actionType: "heal",
            round: "2",
            advantage: false,
            disadvantage: false,
            attackTotal: "0",
            damageTotal: "12",
            tokenId: "WTi2ws6xbFXJBhAv",
            actorId: "WTi2ws6xbFXJBhAd",
            isCritical: false,
            isFumble: false,
            item: {
              itemLink:
                "@Compendium[dnd5e.spells.5SuJewoa1CRWaj1F]{Healing Hands}",
              name: "Healing Hands",
            },
          },
        ],
        summaryList: {
          min: "18",
          max: "18",
          avg: "18",
          total: "18",
        },
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
              round: "1",
              damageTotal: 2,
            },
            {
              round: "2",
              damageTotal: 8,
            },
          ],
        },
        health: [
          {
            id: null,
            round: 1,
            tokenId: null,
            actorId: null,
            max: 0,
            diff: 0,
            previous: 0,
            current: 0,
            isdamage: false,
            isheal: false,
          },
        ],
      },
    ],
    top: {
      maxDamage: "Lorena Aldabra<br />57",
      mostDamageInOneTurn: "Graa S'oua<br />16",
      highestAvgDamage: "Graa S'oua<br />49",
      highestMaxDamage: "Graa S'oua<br />49",
    },
  };
});

describe("On generating the markup from an object with no events", () => {
  test("Expect the HTML to be valid", () => {
    const markup = Generate(statsDataWithNoEvents);
    expect(markup.replace(/\s+/g, "")).toStrictEqual(
      `<divclass=\"fvtt-enc-stats\"><hr/><divclass=\"fvtt-enc-stats_top\"><divclass=\"fvtt-enc-stats_actor_statlistflexrow\"><divclass=\"fvtt-enc-stats_actor_stat\"><divclass=\"fvtt-enc-stats_actor_stat-key\">MockedTranslation</div><divclass=\"fvtt-enc-stats_actor_stat-value\">LorenaAldabra<br/>57</div></div><divclass=\"fvtt-enc-stats_actor_stat\"><divclass=\"fvtt-enc-stats_actor_stat-key\">MockedTranslation</div><divclass=\"fvtt-enc-stats_actor_stat-value\">GraaS'oua<br/>16</div></div><divclass=\"fvtt-enc-stats_actor_stat\"><divclass=\"fvtt-enc-stats_actor_stat-key\">MockedTranslation</div><divclass=\"fvtt-enc-stats_actor_stat-value\">GraaS'oua<br/>49</div></div><divclass=\"fvtt-enc-stats_actor_stat\"><divclass=\"fvtt-enc-stats_actor_stat-key\">MockedTranslation</div><divclass=\"fvtt-enc-stats_actor_stat-value\">GraaS'oua<br/>49</div></div></div></div><hr/><divclass=\"fvtt-enc-stats_top\"><divclass=\"fvtt-enc-stats_actor_statlistflexrow\"><divclass=\"fvtt-enc-stats_actor_stat\"><divclass=\"fvtt-enc-stats_actor_stat-key\">MockedTranslation</div><divclass=\"fvtt-enc-stats_actor_stat-value\">undefined</div></div><divclass=\"fvtt-enc-stats_actor_stat\"><divclass=\"fvtt-enc-stats_actor_stat-key\">MockedTranslation</div><divclass=\"fvtt-enc-stats_actor_stat-value\">undefined</div></div><divclass=\"fvtt-enc-stats_actor_stat\"><divclass=\"fvtt-enc-stats_actor_stat-key\">MockedTranslation</div><divclass=\"fvtt-enc-stats_actor_stat-value\">undefined</div></div><divclass=\"fvtt-enc-stats_actor_stat\"><divclass=\"fvtt-enc-stats_actor_stat-key\">MockedTranslation</div><divclass=\"fvtt-enc-stats_actor_stat-value\">undefined</div></div></div></div><divclass=\"fvtt-enc-stats_combatants\"><div><divclass=\"fvtt-enc-stats_combatant\"data-fvtt-id=\"WTi2ws6xbFXJBhAb\"><divclass=\"fvtt-enc-stats_combatants_overview\"><headerclass=\"fvtt-enc-stats_combatants_actorflexrow\"><divclass=\"fvtt-enc-stats_combatants_actor_imageflexcol\"><imgsrc=\"/test/img.png\"alt=\"Graa\"/></div><divclass=\"fvtt-enc-stats_actor_stats\"><h1class=\"fvtt-enc-stats_actor_stats_name\">Graa</h1><divclass=\"fvtt-enc-stats_actor_statlistflexrow\"><divclass=\"fvtt-enc-stats_actor_stat\"><divclass=\"fvtt-enc-stats_actor_stat-key\">MockedTranslation</div><divclass=\"fvtt-enc-stats_actor_stat-value\"><span>13</span><spanclass=\"sep\">/</span><span>16</span></div></div><divclass=\"fvtt-enc-stats_actor_stat\"><divclass=\"fvtt-enc-stats_actor_stat-key\">MockedTranslation</div><divclass=\"fvtt-enc-stats_actor_stat-value\"><span>0</span><spanclass=\"sep\">/</span><span>16</span></div></div><divclass=\"fvtt-enc-stats_actor_stat\"><divclass=\"fvtt-enc-stats_actor_stat-key\">MockedTranslation</div><divclass=\"fvtt-enc-stats_actor_stat-value\"><span>11</span></div></div><divclass=\"fvtt-enc-stats_actor_stat\"><divclass=\"fvtt-enc-stats_actor_stat-key\">MockedTranslation</div><divclass=\"fvtt-enc-stats_actor_stat-value\"><span>18</span></div></div><divclass=\"fvtt-enc-stats_actor_stat\"><divclass=\"fvtt-enc-stats_actor_stat-key\">MockedTranslation</div><divclass=\"fvtt-enc-stats_actor_stat-value\"><span>18</span></div></div><divclass=\"fvtt-enc-stats_actor_stat\"><divclass=\"fvtt-enc-stats_actor_stat-key\">MockedTranslation</div><divclass=\"fvtt-enc-stats_actor_stat-value\"><span>18</span></div></div><divclass=\"fvtt-enc-stats_actor_stat\"><divclass=\"fvtt-enc-stats_actor_stat-key\">MockedTranslation</div><divclass=\"fvtt-enc-stats_actor_stat-value\"><span>18</span></div></div></div></div></header></div></div></div></div></div>`
    );
  });
});

describe("On generating the markup from an object", () => {
  test("Expect the HTML to be valid", () => {
    const markup = Generate(statsData);
    expect(markup.replace(/\s+/g, "")).toStrictEqual(
      `<divclass=\"fvtt-enc-stats\"><hr/><divclass=\"fvtt-enc-stats_top\"><divclass=\"fvtt-enc-stats_actor_statlistflexrow\"><divclass=\"fvtt-enc-stats_actor_stat\"><divclass=\"fvtt-enc-stats_actor_stat-key\">MockedTranslation</div><divclass=\"fvtt-enc-stats_actor_stat-value\">LorenaAldabra<br/>57</div></div><divclass=\"fvtt-enc-stats_actor_stat\"><divclass=\"fvtt-enc-stats_actor_stat-key\">MockedTranslation</div><divclass=\"fvtt-enc-stats_actor_stat-value\">GraaS'oua<br/>16</div></div><divclass=\"fvtt-enc-stats_actor_stat\"><divclass=\"fvtt-enc-stats_actor_stat-key\">MockedTranslation</div><divclass=\"fvtt-enc-stats_actor_stat-value\">GraaS'oua<br/>49</div></div><divclass=\"fvtt-enc-stats_actor_stat\"><divclass=\"fvtt-enc-stats_actor_stat-key\">MockedTranslation</div><divclass=\"fvtt-enc-stats_actor_stat-value\">GraaS'oua<br/>49</div></div></div></div><hr/><divclass=\"fvtt-enc-stats_top\"><divclass=\"fvtt-enc-stats_actor_statlistflexrow\"><divclass=\"fvtt-enc-stats_actor_stat\"><divclass=\"fvtt-enc-stats_actor_stat-key\">MockedTranslation</div><divclass=\"fvtt-enc-stats_actor_stat-value\">undefined</div></div><divclass=\"fvtt-enc-stats_actor_stat\"><divclass=\"fvtt-enc-stats_actor_stat-key\">MockedTranslation</div><divclass=\"fvtt-enc-stats_actor_stat-value\">undefined</div></div><divclass=\"fvtt-enc-stats_actor_stat\"><divclass=\"fvtt-enc-stats_actor_stat-key\">MockedTranslation</div><divclass=\"fvtt-enc-stats_actor_stat-value\">undefined</div></div><divclass=\"fvtt-enc-stats_actor_stat\"><divclass=\"fvtt-enc-stats_actor_stat-key\">MockedTranslation</div><divclass=\"fvtt-enc-stats_actor_stat-value\">undefined</div></div></div></div><divclass=\"fvtt-enc-stats_combatants\"><div><divclass=\"fvtt-enc-stats_combatant\"data-fvtt-id=\"WTi2ws6xbFXJBhAb\"><divclass=\"fvtt-enc-stats_combatants_overview\"><headerclass=\"fvtt-enc-stats_combatants_actorflexrow\"><divclass=\"fvtt-enc-stats_combatants_actor_imageflexcol\"><imgsrc=\"/test/img.png\"alt=\"Graa\"/></div><divclass=\"fvtt-enc-stats_actor_stats\"><h1class=\"fvtt-enc-stats_actor_stats_name\">Graa</h1><divclass=\"fvtt-enc-stats_actor_statlistflexrow\"><divclass=\"fvtt-enc-stats_actor_stat\"><divclass=\"fvtt-enc-stats_actor_stat-key\">MockedTranslation</div><divclass=\"fvtt-enc-stats_actor_stat-value\"><span>13</span><spanclass=\"sep\">/</span><span>16</span></div></div><divclass=\"fvtt-enc-stats_actor_stat\"><divclass=\"fvtt-enc-stats_actor_stat-key\">MockedTranslation</div><divclass=\"fvtt-enc-stats_actor_stat-value\"><span>0</span><spanclass=\"sep\">/</span><span>16</span></div></div><divclass=\"fvtt-enc-stats_actor_stat\"><divclass=\"fvtt-enc-stats_actor_stat-key\">MockedTranslation</div><divclass=\"fvtt-enc-stats_actor_stat-value\"><span>11</span></div></div><divclass=\"fvtt-enc-stats_actor_stat\"><divclass=\"fvtt-enc-stats_actor_stat-key\">MockedTranslation</div><divclass=\"fvtt-enc-stats_actor_stat-value\"><span>18</span></div></div><divclass=\"fvtt-enc-stats_actor_stat\"><divclass=\"fvtt-enc-stats_actor_stat-key\">MockedTranslation</div><divclass=\"fvtt-enc-stats_actor_stat-value\"><span>18</span></div></div><divclass=\"fvtt-enc-stats_actor_stat\"><divclass=\"fvtt-enc-stats_actor_stat-key\">MockedTranslation</div><divclass=\"fvtt-enc-stats_actor_stat-value\"><span>18</span></div></div><divclass=\"fvtt-enc-stats_actor_stat\"><divclass=\"fvtt-enc-stats_actor_stat-key\">MockedTranslation</div><divclass=\"fvtt-enc-stats_actor_stat-value\"><span>18</span></div></div></div></div></header></div></div></div></div></div>`
    );
  });
});
