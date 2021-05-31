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
      },
    ],
    top: {
      maxDamage: "Lorena Aldabra<br />57",
      highestAvgDamage: "Graa S'oua<br />49",
      highestMaxDamage: "Graa S'oua<br />49",
    }
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
    top: {
      maxDamage: "Lorena Aldabra<br />57",
      highestAvgDamage: "Graa S'oua<br />49",
      highestMaxDamage: "Graa S'oua<br />49",
    },
  };
});

describe("On generating the markup from an object with no events", () => {
  test("Expect the HTML to be valid", () => {
    const markup = Generate(statsDataWithNoEvents);
    console.log(markup)
    expect(markup).toEqual(`
    <div class="fvtt-enc-stats">
    <hr />
    <div class="fvtt-enc-stats_top">
      <div class="fvtt-enc-stats_actor_statlist flexrow">
        <div class="fvtt-enc-stats_actor_stat">
          <div class="fvtt-enc-stats_actor_stat-key">Most Damage Overall</div>
          <div class="fvtt-enc-stats_actor_stat-value">Lorena Aldabra<br />57</div>
        </div>
        <div class="fvtt-enc-stats_actor_stat">
          <div class="fvtt-enc-stats_actor_stat-key">Highest Average Damage</div>
          <div class="fvtt-enc-stats_actor_stat-value">Graa S'oua<br />49</div>
        </div>
        <div class="fvtt-enc-stats_actor_stat">
          <div class="fvtt-enc-stats_actor_stat-key">Highest Damage in 1 hit</div>
          <div class="fvtt-enc-stats_actor_stat-value">Graa S'oua<br />49</div>
        </div>
      </div>
    </div>
    <div class="fvtt-enc-stats_combatants">
    <div>
  <div class="fvtt-enc-stats_combatant" data-fvtt-id="WTi2ws6xbFXJBhAb">
    <div class="fvtt-enc-stats_combatants_overview">
      <header class="fvtt-enc-stats_combatants_actor flexrow">
        <div class="fvtt-enc-stats_combatants_actor_image flexcol">
          <img src="/test/img.png" alt="Graa" />
        </div>
        <div class="fvtt-enc-stats_actor_stats">
          <h1 class="fvtt-enc-stats_actor_stats_name">Graa</h1>
          <div class="fvtt-enc-stats_actor_statlist flexrow">
            <div class="fvtt-enc-stats_actor_stat">
              <div class="fvtt-enc-stats_actor_stat-key">HP</div>
              <div class="fvtt-enc-stats_actor_stat-value">
                <span>13</span><span class="sep">/</span><span>16</span></div>
            </div>
            <div class="fvtt-enc-stats_actor_stat">
              <div class="fvtt-enc-stats_actor_stat-key">AC</div>
              <div class="fvtt-enc-stats_actor_stat-value"><span>11</span></div>
            </div>
            <div class="fvtt-enc-stats_actor_stat">
              <div class="fvtt-enc-stats_actor_stat-key">Damage Total</div>
              <div class="fvtt-enc-stats_actor_stat-value"><span>18</span></div>
            </div>
            <div class="fvtt-enc-stats_actor_stat">
              <div class="fvtt-enc-stats_actor_stat-key">Min Damage</div>
              <div class="fvtt-enc-stats_actor_stat-value"><span>18</span></div>
            </div>
            <div class="fvtt-enc-stats_actor_stat">
              <div class="fvtt-enc-stats_actor_stat-key">Max Damage</div>
              <div class="fvtt-enc-stats_actor_stat-value"><span>18</span></div>
            </div>
            <div class="fvtt-enc-stats_actor_stat">
              <div class="fvtt-enc-stats_actor_stat-key">Avg Damage</div>
              <div class="fvtt-enc-stats_actor_stat-value"><span>18</span></div>
            </div>
          </div>
        </div>
      </header>
      <section class="fvtt-enc-stats_combatants_attacks">
        <div class="flexcol">
          <ol class="items-list flexcol">
            <li class="items-header flexrow">
              <div class="item-name item-round">Round</div>
              <div class="item-name item-weapon">Weapon/Spell Name</div>
              <div class="item-name">Advantage</div>
              <div class="item-name">Disadvantage</div>
              <div class="item-name">Attack Total</div>
              <div class="item-name">Damage Total</div>
            </li>
            <ol class="item-list">


            </ol>
          </ol>
        </div>
      </section>
    </div>
  </div>
  </div>
      <h2 class="fvtt-enc-stats_enemies">
          Enemies
      </h2>
      <div></div></div></div>
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
