import SimpleCalendarIntegration from "./integrations/SimpleCalendarIntegration.js";

export function Generate(data) {
  const simpleCalendarIntegration = new SimpleCalendarIntegration();
  const simpleCalendarEnabled = simpleCalendarIntegration.IsEnabled();
  const markup = `
  <div class="fvtt-enc-stats">
    <hr />
    <h2 class="fvtt-enc-stats_enemies">Natural 20s</h2>
    <div>
        ${Generatenat20Row(data.nat20, simpleCalendarEnabled)}
    </div>

    <hr />
    <h2 class="fvtt-enc-stats_enemies">Natural 1s</h2>
    <div>
        ${GenerateNat1Row(data.nat1, simpleCalendarEnabled)}
    </div>

    <hr />
    <h2 class="fvtt-enc-stats_enemies">Heals</h2>
    <div>
        ${GenerateHealRow(data.heals, simpleCalendarEnabled)}
    </div>

    <hr />
    <h2 class="fvtt-enc-stats_enemies">Kills</h2>
    <div>
        ${GenerateKillRow(data.kills, simpleCalendarEnabled)}
    </div>
  </div>
  `;

  return markup;
}

function GenerateKillRow(event, simpleCalendarEnabled) {
  let markup = ``;

  for (const [key] of Object.entries(event)) {
    markup += _getItemListTitle(key, event, simpleCalendarEnabled);

    event[key].forEach((eventItem) => {
      markup += `
  <li class="item flexrow campaign-row">
    <div class="item-name">${eventItem.actorName}</div>
    <div class="item-name">${eventItem.tokenName}</div>
    <div class="item-name">${eventItem.date}</div>
  </li>`;
    });

    markup += `</ol>`;
  }

  return markup;
}

function GenerateNat1Row(event, simpleCalendarEnabled) {
  let markup = ``;

  for (const [key] of Object.entries(event)) {
    markup += _getItemListTitle(key, event, simpleCalendarEnabled);

    event[key].forEach((eventItem) => {
      markup += `
  <li class="item flexrow campaign-row">
    <div class="item-name">${eventItem.actorName}</div>
    <div class="item-name">${eventItem.flavor}</div>
    <div class="item-name">${eventItem.date}</div>
  </li>`;
    });

    markup += `</ol>`;
  }

  return markup;
}

function Generatenat20Row(event, simpleCalendarEnabled) {
  let markup = ``;

  for (const [key] of Object.entries(event)) {
    markup += _getItemListTitle(key, event, simpleCalendarEnabled);

    event[key].forEach((eventItem) => {
      markup += `
      <li class="item flexrow campaign-row">
        <div class="item-name">${eventItem.actorName}</div>
        <div class="item-name">${eventItem.flavor}</div>
        <div class="item-name">${eventItem.date}</div>
      </li>`;
    });

    markup += `</ol>`;
  }

  return markup;
}

function GenerateHealRow(event, simpleCalendarEnabled) {
  let markup = ``;

  for (const [key] of Object.entries(event)) {
    markup += _getItemListTitle(key, event, simpleCalendarEnabled);

    event[key].forEach((eventItem) => {
      markup += `
  <li class="item flexrow campaign-row">
    <div class="item-name">${eventItem.actorName}</div>
    <div class="item-name">${
      eventItem.itemLink ? eventItem.itemLink : eventItem.spellName
    }</div>
    <div class="item-name">${eventItem.damageTotal}</div>
    <div class="item-name">${eventItem.date}</div>
  </li>`;
    });

    markup += `</ol>`;
  }
  return markup;
}

function _getItemListTitle(key, event, simpleCalendarEnabled) {
  let markup = ``;

  if (simpleCalendarEnabled) {
    if (event[key] && event[key].length > 0) {
      markup += `<h3>${event[key][0].simpleCalendarName}</h3><ol class="item-list">`;
    } else {
      markup += `<h3>${key}</h3><ol class="item-list">`;
    }
  } else {
    markup += `<h3>${key}</h3><ol class="item-list">`;
  }

  return markup;
}
