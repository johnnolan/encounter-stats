import { IsValidAttack, IsHealingSpell } from "./Utils.js";

export function Generate(data) {
  const markup = `
  <div class="fvtt-enc-stats">
    <hr />
    <h2 class="fvtt-enc-stats_enemies">Natural 20s</h2>
    <div>
      <ol class="item-list">
        ${data.nat20
          .map(function (kill) {
            return Generatenat20Row(kill);
          })
          .join("")}
      </ol>
    </div>

    <hr />
    <h2 class="fvtt-enc-stats_enemies">Natural 1s</h2>
    <div>
      <ol class="item-list">
        ${data.nat1
          .map(function (kill) {
            return Generatenat1Row(kill);
          })
          .join("")}
      </ol>
    </div>

    <hr />
    <h2 class="fvtt-enc-stats_enemies">Heals</h2>
    <div>
      <ol class="item-list">
        ${data.heals
          .map(function (kill) {
            return GenerateHealRow(kill);
          })
          .join("")}
      </ol>
    </div>

    <hr />
    <h2 class="fvtt-enc-stats_enemies">Kills</h2>
    <div>
      <ol class="item-list">
        ${data.kills
          .map(function (kill) {
            return GenerateKillRow(kill);
          })
          .join("")}
      </ol>
    </div>
  </div>
  `;

  return markup;
}

function GenerateKillRow(event) {
  let markup = `
  <li class="item flexrow">
    <div class="item-name">${event.actorName}</div>
    <div class="item-name">${event.tokenName}</div>
    <div class="item-name">${event.date}</div>
  </li>`;

  return markup;
}

function Generatenat1Row(event) {
  let markup = `
  <li class="item flexrow">
    <div class="item-name">${event.actorName}</div>
    <div class="item-name">${event.flavor}</div>
    <div class="item-name">${event.date}</div>
  </li>`;

  return markup;
}

function Generatenat20Row(event) {
  let markup = `
  <li class="item flexrow">
    <div class="item-name">${event.actorName}</div>
    <div class="item-name">${event.flavor}</div>
    <div class="item-name">${event.date}</div>
  </li>`;

  return markup;
}

function GenerateHealRow(event) {
  let markup = `
  <li class="item flexrow">
    <div class="item-name">${event.actorName}</div>
    <div class="item-name">${
      event.itemLink ? event.itemLink : event.spellName
    }</div>
    <div class="item-name">${event.damageTotal}</div>
    <div class="item-name">${event.date}</div>
  </li>`;

  return markup;
}
