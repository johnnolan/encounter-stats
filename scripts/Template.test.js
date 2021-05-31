import { beforeAll } from "@jest/globals";
import { Generate } from "./Template.js";

let statsDataWithNoEvents;
let statsData;
beforeAll(() => {
  statsDataWithNoEvents = {
    encounterId: "sze0mlf69xCj913F",
    combatants: [
      {
        name: "Graa",
        id: "WTi2ws6xbFXJBhAb",
        img: "/test/img.png",
        hp: "13",
        max: "16",
        ac: "11",
        events: [],
        summaryList: {
          min: "18",
          max: "18",
          avg: "18",
          total: "18",
        },
      },
    ],
  };
  statsData = {
    encounterId: "sze0mlf69xCj913F",
    combatants: [
      {
        name: "Graa",
        id: "WTi2ws6xbFXJBhAb",
        img: "/test/img.png",
        hp: "13",
        max: "16",
        ac: "11",
        events: [
          {
            id: "sze0mlf69xCj913G",
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
        ],
        summaryList: {
          min: "18",
          max: "18",
          avg: "18",
          total: "18",
        },
      },
    ],
  };
});

describe("On generating the markup from an object with no events", () => {
  test("Expect the HTML to be valid", () => {
    const markup = Generate(statsDataWithNoEvents);
    expect(markup).toEqual(`
  <div class="fvtt-enc-stats">
    <h1>
        Encounter ID: sze0mlf69xCj913F
    </h1>
    <hr />
    <div class="fvtt-enc-stats_combatants">
      <hr />
  <div class="fvtt-enc-stats_combatant" data-fvtt-id="WTi2ws6xbFXJBhAb">
    <h2>Graa</h2>
    <div class="fvtt-enc-stats_combatants_overview">
      <div class="fvtt-enc-stats_combatants_actor">
        <table>
          <tbody>
            <tr>
              <th width="120px" scope="col"></th>
              <th scope="col">HP</th>
              <th scope="col">Max HP</th>
              <th scope="col">AC</th>
            </tr>
            <tr>
              <td class="fvtt-enc-stats_combatants_actor_image"><img src="/test/img.png" width="100" height="100" alt="Graa" /></td>
              <td>13</td>
              <td>16</td>
              <td>11</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="fvtt-enc-stats_combatants_attacks">
        <table>
          <tbody data-fvtt-attack-id="WTi2ws6xbFXJBhAb">
            <tr>
              <td></td>
              <th scope="col">Weapon Name</th>
              <th scope="col">Advantage</th>
              <th scope="col">Disadvantage</th>
              <th scope="col">Attack Total</th>
              <th scope="col">Damage Total</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="fvtt-enc-stats_combatants_summary">
      <table>
        <tbody class="fvtt-enc-stats_combatants_summary-table" data-fvtt-attack-summary-id="WTi2ws6xbFXJBhAb">
          <tr>
            <th scope="col">Min</th>
            <th scope="col">Max</th>
            <th scope="col">Average</th>
            <th scope="col">Damage Total</th>
          </tr>
          <tr>
            <td>18</td>
            <td>18</td>
            <td>18</td>
            <td>18</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  </div></div>
  `);
  });
});

describe("On generating the markup from an object", () => {
  test("Expect the HTML to be valid", () => {
    const markup = Generate(statsData);
    expect(markup).toEqual(`
  <div class="fvtt-enc-stats">
    <h1>
        Encounter ID: sze0mlf69xCj913F
    </h1>
    <hr />
    <div class="fvtt-enc-stats_combatants">
      <hr />
  <div class="fvtt-enc-stats_combatant" data-fvtt-id="WTi2ws6xbFXJBhAb">
    <h2>Graa</h2>
    <div class="fvtt-enc-stats_combatants_overview">
      <div class="fvtt-enc-stats_combatants_actor">
        <table>
          <tbody>
            <tr>
              <th width="120px" scope="col"></th>
              <th scope="col">HP</th>
              <th scope="col">Max HP</th>
              <th scope="col">AC</th>
            </tr>
            <tr>
              <td class="fvtt-enc-stats_combatants_actor_image"><img src="/test/img.png" width="100" height="100" alt="Graa" /></td>
              <td>13</td>
              <td>16</td>
              <td>11</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="fvtt-enc-stats_combatants_attacks">
        <table>
          <tbody data-fvtt-attack-id="WTi2ws6xbFXJBhAb">
            <tr>
              <td></td>
              <th scope="col">Weapon Name</th>
              <th scope="col">Advantage</th>
              <th scope="col">Disadvantage</th>
              <th scope="col">Attack Total</th>
              <th scope="col">Damage Total</th>
            </tr>
  <tr data-event-id="sze0mlf69xCj913G">
    <th scope="row">Round 2</th>
    <td>@Compendium[dnd5e.spells.5SuJewoa1CRWaj1F]{Burning Hands}</td>
    <td>false</td>
    <td>false</td>
    <td>15</td>
    <td data-damage-total="18">18</td>
  </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="fvtt-enc-stats_combatants_summary">
      <table>
        <tbody class="fvtt-enc-stats_combatants_summary-table" data-fvtt-attack-summary-id="WTi2ws6xbFXJBhAb">
          <tr>
            <th scope="col">Min</th>
            <th scope="col">Max</th>
            <th scope="col">Average</th>
            <th scope="col">Damage Total</th>
          </tr>
          <tr>
            <td>18</td>
            <td>18</td>
            <td>18</td>
            <td>18</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  </div></div>
  `);
  });
});
