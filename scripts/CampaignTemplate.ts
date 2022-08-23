import {
  CampaignStats,
  DiceTrack,
  HealTrack,
  KillTrack,
} from "./types/globals";

export function Generate(campaignStats: CampaignStats) {
  return `
  <div class="fvtt-enc-stats">
    <hr />
    <h2 class="fvtt-enc-stats_enemies">Natural 20s</h2>
    <div>
        ${Generatenat20Row(campaignStats)}
    </div>

    <hr />
    <h2 class="fvtt-enc-stats_enemies">Natural 1s</h2>
    <div>
        ${GenerateNat1Row(campaignStats)}
    </div>

    <hr />
    <h2 class="fvtt-enc-stats_enemies">Heals</h2>
    <div>
        ${GenerateHealRow(campaignStats)}
    </div>

    <hr />
    <h2 class="fvtt-enc-stats_enemies">Kills</h2>
    <div>
        ${GenerateKillRow(campaignStats)}
    </div>
  </div>
  `;
}

function GenerateKillRow(campaignStats: CampaignStats) {
  let markup = ``;

  campaignStats.kills.forEach((kills) => {
    markup += _getItemListTitle(kills.dateDisplay);

    kills.data.forEach((kill: KillTrack) => {
      markup += `
  <li class="item flexrow campaign-row">
    <div class="item-name">${kill.actorName}</div>
    <div class="item-name">${kill.tokenName}</div>
    <div class="item-name">${kill.date}</div>
  </li>`;
    });

    markup += `</ol>`;
  });

  return markup;
}

function GenerateNat1Row(campaignStats: CampaignStats) {
  let markup = ``;

  campaignStats.nat1.forEach((nat1s) => {
    markup += _getItemListTitle(nat1s.dateDisplay);

    nat1s.data.forEach((diceTrack: DiceTrack) => {
      markup += `
  <li class="item flexrow campaign-row">
    <div class="item-name">${diceTrack.actorName}</div>
    <div class="item-name">${diceTrack.flavor}</div>
    <div class="item-name">${diceTrack.date}</div>
  </li>`;
    });

    markup += `</ol>`;
  });

  return markup;
}

function Generatenat20Row(campaignStats: CampaignStats) {
  let markup = ``;

  campaignStats.nat20.forEach((nat20s) => {
    markup += _getItemListTitle(nat20s.dateDisplay);

    nat20s.data.forEach((diceTrack: DiceTrack) => {
      markup += `
      <li class="item flexrow campaign-row">
        <div class="item-name">${diceTrack.actorName}</div>
        <div class="item-name">${diceTrack.flavor}</div>
        <div class="item-name">${diceTrack.date}</div>
      </li>`;
    });

    markup += `</ol>`;
  });

  return markup;
}

function GenerateHealRow(campaignStats: CampaignStats) {
  let markup = ``;

  campaignStats.heals.forEach((heals) => {
    markup += _getItemListTitle(heals.dateDisplay);

    heals.data.forEach((healTrack: HealTrack) => {
      markup += `
  <li class="item flexrow campaign-row">
    <div class="item-name">${healTrack.actorName}</div>
    <div class="item-name">${
      healTrack.itemLink ? healTrack.itemLink : healTrack.spellName
    }</div>
    <div class="item-name">${healTrack.total}</div>
    <div class="item-name">${healTrack.date}</div>
  </li>`;
    });

    markup += `</ol>`;
  });

  return markup;
}

function _getItemListTitle(key: string) {
  return `<p>${key}</p><ol class="item-list">`;
}
