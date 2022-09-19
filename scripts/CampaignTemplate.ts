import Trans from "./Helpers/Trans";

export function Generate(campaignStats: CampaignStats) {
  return `
  <div class="fvtt-enc-stats_top fvtt-enc-stats_campaign_top">
    <div class="flexrow">
      <div class="fvtt-enc-stats_actor_stat">
        <h2 class="fvtt-enc-stats_enemies">${Trans.Get(
          "template.MostNatural20s"
        )}</h2>
        ${GenerateSummaryRow(campaignStats, "nat20")}
      </div>
      <div class="fvtt-enc-stats_actor_stat">
        <h2 class="fvtt-enc-stats_enemies">${Trans.Get(
          "template.MostNatural1s"
        )}</h2>
        ${GenerateSummaryRow(campaignStats, "nat1")}
      </div>
      <div class="fvtt-enc-stats_actor_stat">
        <h2 class="fvtt-enc-stats_enemies">${Trans.Get(
          "template.most_healing"
        )}</h2>
        ${GenerateSummaryRow(campaignStats, "heals")}
      </div>
      <div class="fvtt-enc-stats_actor_stat">
        <h2 class="fvtt-enc-stats_enemies">${Trans.Get(
          "template.most_kills"
        )}</h2>
        ${GenerateSummaryRow(campaignStats, "kills")}
      </div>
    </div>
  </div>
  <div class="fvtt-enc-stats">
    <hr />
    <h2 class="fvtt-enc-stats_enemies">${Trans.Get("template.Natural20s")}</h2>
    <div>
        ${GenerateCritialRow(campaignStats)}
    </div>

    <hr />
    <h2 class="fvtt-enc-stats_enemies">${Trans.Get("template.Natural1s")}</h2>
    <div>
        ${GenerateFumbleRow(campaignStats)}
    </div>

    <hr />
    <h2 class="fvtt-enc-stats_enemies">${Trans.Get("template.Healing")}</h2>
    <div>
        ${GenerateHealRow(campaignStats)}
    </div>

    <hr />
    <h2 class="fvtt-enc-stats_enemies">${Trans.Get("template.kills")}</h2>
    <div>
        ${GenerateKillRow(campaignStats)}
    </div>

    ${GenerateCustomEventRows(campaignStats)}
  </div>
  `;
}

function GenerateCustomEventRows(campaignStats: CampaignStats) {
  let markup = ``;
  let statList = campaignStats.custom;

  if (statList.length === 0) return;

  // Get unique EventIds
  const eventIds = [].concat
    .apply(
      [],
      statList?.map((m) =>
        m.data.map((im) => {
          return im.EventName;
        })
      )
    )
    .reduce(
      (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
      []
    );

  markup += `<hr />`;
  // Foreach eventid
  eventIds.forEach((eventName, index) => {
    markup += `<h2 class="fvtt-enc-stats_enemies">${eventName}</h2>`;
    statList.forEach((statItem, index2) => {
      // filter statList
      const dateStatList = statItem.data.filter(
        (f) => f.EventName === eventName
      );
      if (dateStatList?.length === 0) return;
      markup += `<div>`;
      markup += _getItemListTitle(statItem.dateDisplay);
      dateStatList.forEach((statEntry, index3) => {
        // Generate row
        markup += `
        <li class="item flexrow campaign-row">
          <div class="item-name">${statEntry.actorName ?? ""}</div>
          <div class="item-name">${statEntry.FlavorText ?? ""}</div>
          <div class="item-name">${statEntry.date}</div>
        </li>`;
      });
      markup += `</ol></div>`;
    });
  });

  return markup;
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

  campaignStats.nat1.reverse().forEach((nat1s) => {
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

function GenerateSummaryRow(campaignStats: CampaignStats, type: string) {
  let markup = ``;

  let statList;

  switch (type) {
    case "nat20":
      statList = campaignStats.nat20;
      break;
    case "nat1":
      statList = campaignStats.nat1;
      break;
    case "heals":
      statList = campaignStats.heals;
      break;
    case "kills":
      statList = campaignStats.kills;
      break;
  }

  const flattenedResults = [].concat
    .apply(
      [],
      statList?.map((m) =>
        m.data.map((im) => {
          return im.actorName;
        })
      )
    )
    .reduce(function (prev, cur) {
      prev[cur] = (prev[cur] || 0) + 1;
      return prev;
    }, {});

  const result = [];
  Object.entries(flattenedResults).forEach(([key, value]) => {
    result.push({
      name: key,
      value: value,
    });
  });

  markup += `<ol class="fvtt-enc-stats_campaign_ol">`;

  result.forEach((entry) => {
    markup += `
      <li class="item flexrow campaign-row">
        <div class="item-name">${entry.name}</div>
        <div class="item-name">${entry.value}</div>
      </li>`;
  });

  markup += `</ol>`;

  return markup;
}

function GenerateCritialRow(campaignStats: CampaignStats) {
  let markup = ``;

  campaignStats.nat20.reverse().forEach((nat20s) => {
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
