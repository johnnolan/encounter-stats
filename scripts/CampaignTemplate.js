export function Generate(data) {
  const markup = `
  <div class="fvtt-enc-stats">
    <hr />
    <h2 class="fvtt-enc-stats_enemies">Natural 20s</h2>
    <div>
        ${Generatenat20Row(data.nat20)}
    </div>

    <hr />
    <h2 class="fvtt-enc-stats_enemies">Natural 1s</h2>
    <div>
        ${GenerateNat1Row(data.nat1)}
    </div>

    <hr />
    <h2 class="fvtt-enc-stats_enemies">Heals</h2>
    <div>
        ${GenerateHealRow(data.heals)}
    </div>

    <hr />
    <h2 class="fvtt-enc-stats_enemies">Kills</h2>
    <div>
        ${GenerateKillRow(data.kills)}
    </div>
  </div>
  `;

  return markup;
}

function GenerateKillRow(event) {
  let markup = ``;

  for (const [key] of Object.entries(event)) {
    markup += `<h3>${key}</h3><ol class="item-list">`;

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

function GenerateNat1Row(event) {
  let markup = ``;

  for (const [key] of Object.entries(event)) {
    markup += `<h3>${key}</h3><ol class="item-list">`;

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

function Generatenat20Row(event) {
  let markup = ``;

  for (const [key] of Object.entries(event)) {
    markup += `<h3>${key}</h3><ol class="item-list">`;

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

function GenerateHealRow(event) {
  let markup = ``;

  for (const [key] of Object.entries(event)) {
    markup += `<h3>${key}</h3><ol class="item-list">`;

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
