export function Generate(campaignStats: CampaignStats) {
  return `
  <div class="fvtt-enc-stats">
    <hr />
    <h2 class="fvtt-enc-stats_enemies">Natural 20s</h2>
    <div>
        ${GenerateCritialRow(campaignStats)}
    </div>

    <hr />
    <h2 class="fvtt-enc-stats_enemies">Natural 1s</h2>
    <div>
        ${GenerateFumbleRow(campaignStats)}
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

  campaignStats.kills.reverse().forEach((kills) => {
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

function GenerateFumbleRow(campaignStats: CampaignStats) {
  let markup = ``;

  campaignStats.fumble.reverse().forEach((fumbles) => {
    markup += _getItemListTitle(fumbles.dateDisplay);

    fumbles.data.forEach((diceTrack: DiceTrack) => {
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

function GenerateCritialRow(campaignStats: CampaignStats) {
  let markup = ``;

  campaignStats.critical.reverse().forEach((criticals) => {
    markup += _getItemListTitle(criticals.dateDisplay);

    criticals.data.forEach((diceTrack: DiceTrack) => {
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

  campaignStats.heals.reverse().forEach((heals) => {
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
