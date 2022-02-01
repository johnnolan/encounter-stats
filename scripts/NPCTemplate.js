import { IsValidAttack, IsHealingSpell } from "./Utils.js";

export function Generate(data) {
  const markup = `
  <div class="fvtt-enc-stats">
    <hr />
    <div class="fvtt-enc-stats_combatants">
      <h2 class="fvtt-enc-stats_enemies">
      ${game.i18n.format("FVTTEncounterStats.template.enemies")}
      </h2>
      <div>${data.combatants
        .filter((f) => f.type === "npc")
        .map(function (combatant) {
          return GenerateCombatant(combatant, data.round);
        })
        .join(
          ""
        )}</div></div></div><div>JSON Source: <textarea rows="20">${JSON.stringify(
    data
  )}</textarea></div>
  `;

  return markup;
}

function GenerateCombatant(combatant, numberOfRounds) {
  const markup = `
  <div class="fvtt-enc-stats_combatant" data-fvtt-id="${combatant.id}">
    <div class="fvtt-enc-stats_combatants_overview">
      <header class="fvtt-enc-stats_combatants_actor flexrow">
        <div class="fvtt-enc-stats_combatants_actor_image flexcol">
          <img src="${combatant.img}" alt="${combatant.name}" />
        </div>
        <div class="fvtt-enc-stats_actor_stats">
          <h1 class="fvtt-enc-stats_actor_stats_name">${combatant.name}</h1>
          <div class="fvtt-enc-stats_actor_statlist flexrow">
            <div class="fvtt-enc-stats_actor_stat">
              <div class="fvtt-enc-stats_actor_stat-key">${game.i18n.format(
                "FVTTEncounterStats.template.startinghp"
              )}</div>
              <div class="fvtt-enc-stats_actor_stat-value">
                <span>${combatant.hp}</span><span class="sep">/</span><span>${
    combatant.max
  }</span></div>
            </div>
            <div class="fvtt-enc-stats_actor_stat">
              <div class="fvtt-enc-stats_actor_stat-key">${game.i18n.format(
                "FVTTEncounterStats.template.finalhp"
              )}</div>
              <div class="fvtt-enc-stats_actor_stat-value">
                <span>${
                  combatant.health.length > 0
                    ? combatant.health[combatant.health.length - 1].current
                    : combatant.hp
                }</span><span class="sep">/</span><span>${
    combatant.max
  }</span></div>
            </div>
            <div class="fvtt-enc-stats_actor_stat">
              <div class="fvtt-enc-stats_actor_stat-key">${game.i18n.format(
                "FVTTEncounterStats.template.ac"
              )}</div>
              <div class="fvtt-enc-stats_actor_stat-value"><span>${
                combatant.ac
              }</span></div>
            </div>
            <div class="fvtt-enc-stats_actor_stat">
              <div class="fvtt-enc-stats_actor_stat-key">${game.i18n.format(
                "FVTTEncounterStats.template.damage_total"
              )}</div>
              <div class="fvtt-enc-stats_actor_stat-value"><span>${
                combatant.summaryList.total
              }</span></div>
            </div>
            <div class="fvtt-enc-stats_actor_stat">
              <div class="fvtt-enc-stats_actor_stat-key">${game.i18n.format(
                "FVTTEncounterStats.template.min_damage"
              )}</div>
              <div class="fvtt-enc-stats_actor_stat-value"><span>${
                combatant.summaryList.min
              }</span></div>
            </div>
            <div class="fvtt-enc-stats_actor_stat">
              <div class="fvtt-enc-stats_actor_stat-key">${game.i18n.format(
                "FVTTEncounterStats.template.max_damage"
              )}</div>
              <div class="fvtt-enc-stats_actor_stat-value"><span>${
                combatant.summaryList.max
              }</span></div>
            </div>
            <div class="fvtt-enc-stats_actor_stat">
              <div class="fvtt-enc-stats_actor_stat-key">${game.i18n.format(
                "FVTTEncounterStats.template.avg_damage"
              )}</div>
              <div class="fvtt-enc-stats_actor_stat-value"><span>${
                combatant.summaryList.avg
              }</span></div>
            </div>
          </div>
        </div>
      </header>
      ${GenerateRoundHtml(combatant, numberOfRounds)}      
    </div>
  </div>
  `;

  return markup;
}
function GenerateRoundHtml(combatant, numberOfRounds) {
  let markup = ``;
  for (let index = 0; index < numberOfRounds; index++) {
    const round = index + 1;
    markup =
      markup +
      `
    <div class="fvtt-enc-stats_title3">${game.i18n.format(
      "FVTTEncounterStats.template.round"
    )} ${round}</div>
    <section class="fvtt-enc-stats_combatants_data">
      <section class="fvtt-enc-stats_combatants_data_section fvtt-enc-stats_combatants_data_section-health">
        <div class="flexcol">
          <ol class="items-list flexcol">
            <li class="items-header flexrow">
              <div class="item-name">${game.i18n.format(
                "FVTTEncounterStats.template.kills"
              )}</div>
            </li>
            <ol class="item-list">
              ${combatant.kills
                .filter((f) => {
                  return f.round === round;
                })
                .map(function (kill) {
                  return GenerateKillRow(kill);
                })
                .join("")}
                    
            </ol>
          </ol>
          <ol class="items-list flexcol">
            <li class="items-header flexrow">
              <div class="item-name">${game.i18n.format(
                "FVTTEncounterStats.template.rounddmg"
              )}</div>
            </li>
            <ol class="item-list">
              ${combatant.roundSummary.totals
                .filter((f) => {
                  return f.round === round.toString();
                })
                .map(function (event) {
                  return GenerateRoundRow(event);
                })
                .join("")}
            </ol>
          </ol>
          <ol class="items-list flexcol">
            <li class="items-header flexrow">
              <div class="item-name">${game.i18n.format(
                "FVTTEncounterStats.template.health"
              )}</div>
            </li>
            <ol class="item-list">
              ${combatant.health
                .filter((f) => {
                  return f.round === round;
                })
                .map(function (event) {
                  return GenerateHealtRow(event);
                })
                .join("")}
                    
            </ol>
          </ol>
        </div>
      </section>
      <section class="fvtt-enc-stats_combatants_data_section fvtt-enc-stats_combatants_data_section-attacks">
        <div class="flexcol">
          <ol class="items-list flexcol">
            <li class="items-header flexrow">
              <div class="item-name item-weapon">${game.i18n.format(
                "FVTTEncounterStats.template.weapon_spell_name"
              )}</div>
              <div class="item-name">${game.i18n.format(
                "FVTTEncounterStats.template.type"
              )}</div>
              <div class="item-name">${game.i18n.format(
                "FVTTEncounterStats.template.rolltype"
              )}</div>
              <div class="item-name">${game.i18n.format(
                "FVTTEncounterStats.template.attack_total"
              )}</div>
              <div class="item-name">${game.i18n.format(
                "FVTTEncounterStats.template.damage_total"
              )}</div>
            </li>
            <ol class="item-list">
              ${combatant.events
                .filter((f) => {
                  return f.round === round;
                })
                .map(function (event) {
                  return GenerateAttackRow(event);
                })
                .join("")}
                    
            </ol>
          </ol>
        </div>
      </section>
    </section>`;
  }

  return markup;
}

function GenerateAttackRow(event) {
  let markup = `
  <li class="item flexrow">
    <div class="item-name item-weapon">${
      event.item.itemLink ? event.item.itemLink : event.item.name
    }</div>
    <div class="item-name">${getAttackTypeFAIcon(event.actionType)}</div>
    <div class="item-name">${
      event.advantage
        ? "advantage"
        : event.disadvantage
        ? "disadvantage"
        : "normal"
    }</div>
    <div class="item-name">${event.attackTotal} ${
    event.isCritical ? " (c)" : ""
  }</div>
    <div class="item-name ${getHealOrDamageClass(event.actionType)}">${
    event.damageTotal
  }</div>
  </li>`;

  return markup;
}

function getHealOrDamageClass(attackType) {
  if (IsHealingSpell(attackType)) return "blue";
  if (IsValidAttack(attackType)) return "red";
}

function getAttackTypeFAIcon(attackType) {
  let iconName = "dice-d20";
  let iconDescription = game.i18n.format(
    "FVTTEncounterStats.actiontypes.other"
  );
  switch (attackType) {
    case "heal":
      iconName = "heart";
      iconDescription = game.i18n.format("FVTTEncounterStats.actiontypes.heal");
      break;
    case "msak":
      iconName = "scroll";
      iconDescription = game.i18n.format("FVTTEncounterStats.actiontypes.msak");
      break;
    case "rsak":
      iconName = "scroll";
      iconDescription = game.i18n.format("FVTTEncounterStats.actiontypes.rsak");
      break;
    case "mwak":
      iconName = "fist-raised";
      iconDescription = game.i18n.format("FVTTEncounterStats.actiontypes.mwak");
      break;
    case "rwak":
      iconName = "fist-raised";
      iconDescription = game.i18n.format("FVTTEncounterStats.actiontypes.rwak");
      break;
    case "save":
      iconName = "shield-alt";
      iconDescription = game.i18n.format("FVTTEncounterStats.actiontypes.save");
      break;
  }

  return `<i title="${iconDescription}" class="fas fa-${iconName}"></i>`;
}

function GenerateKillRow(kill) {
  let markup = `
  <li class="item flexrow">
    <div class="item-name">${kill.tokenName}</div>
  </li>`;

  return markup;
}

function GenerateHealtRow(event) {
  let markup = `
  <li class="item flexrow">
    <div class="item-name">${event.current} (${event.isheal ? "+" : "-"}${
    event.diff
  })</div>
  </li>`;

  return markup;
}

function GenerateRoundRow(event) {
  let markup = `
  <li class="item flexrow">
    <div class="item-name">${event.damageTotal}</div>
  </li>`;

  return markup;
}
