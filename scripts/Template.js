export function Generate(data) {
  const markup = `
  <div class="fvtt-enc-stats">
    <hr />
    <div class="fvtt-enc-stats_top">
      <div class="fvtt-enc-stats_actor_statlist flexrow">
        <div class="fvtt-enc-stats_actor_stat">
          <div class="fvtt-enc-stats_actor_stat-key">${game.i18n.format(
            "FVTTEncounterStats.template.most_damage_overall"
          )}</div>
          <div class="fvtt-enc-stats_actor_stat-value">${
            data.top.maxDamage
          }</div>
        </div>
        <div class="fvtt-enc-stats_actor_stat">
          <div class="fvtt-enc-stats_actor_stat-key">${game.i18n.format(
            "FVTTEncounterStats.template.highest_average_damage"
          )}</div>
          <div class="fvtt-enc-stats_actor_stat-value">${
            data.top.highestAvgDamage
          }</div>
        </div>
        <div class="fvtt-enc-stats_actor_stat">
          <div class="fvtt-enc-stats_actor_stat-key">${game.i18n.format(
            "FVTTEncounterStats.template.highest_damage_in_1_hit"
          )}</div>
          <div class="fvtt-enc-stats_actor_stat-value">${
            data.top.highestMaxDamage
          }</div>
        </div>
      </div>
    </div>
    <div class="fvtt-enc-stats_combatants">
    <div>${data.combatants
      .filter((f) => f.type === "character")
      .map(function (combatant) {
        return GenerateCombatant(combatant);
      })
      .join("")}</div>
      <h2 class="fvtt-enc-stats_enemies">
      ${game.i18n.format("FVTTEncounterStats.template.enemies")}
      </h2>
      <div>${data.combatants
        .filter((f) => f.type === "npc")
        .map(function (combatant) {
          return GenerateCombatant(combatant);
        })
        .join("")}</div></div></div>
  `;

  return markup;
}

function GenerateCombatant(combatant) {
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
      <section class="fvtt-enc-stats_combatants_data">
        <section class="fvtt-enc-stats_combatants_health">
          <div class="fvtt-enc-stats_title3">${game.i18n.format(
            "FVTTEncounterStats.template.health"
          )}</div>
          <div class="flexcol">
            <ol class="items-list flexcol">
              <li class="items-header flexrow">
                <div class="item-name item-round">${game.i18n.format(
                  "FVTTEncounterStats.template.round"
                )}</div>
                <div class="item-name">${game.i18n.format(
                  "FVTTEncounterStats.template.hp"
                )}</div>
              </li>
              <ol class="item-list">
                ${combatant.health
                  .map(function (event) {
                    return GenerateHealtRow(event);
                  })
                  .join("")}
                      
              </ol>
            </ol>
          </div>
        </section>
        <section class="fvtt-enc-stats_combatants_attacks">
          <div class="fvtt-enc-stats_title3">${game.i18n.format(
            "FVTTEncounterStats.template.attacks"
          )}</div>
          <div class="flexcol">
            <ol class="items-list flexcol">
              <li class="items-header flexrow">
                <div class="item-name item-round">${game.i18n.format(
                  "FVTTEncounterStats.template.round"
                )}</div>
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
                  .map(function (event) {
                    return GenerateAttackRow(event);
                  })
                  .join("")}
                      
              </ol>
            </ol>
          </div>
        </section>
      </section>
    </div>
  </div>
  `;

  return markup;
}

function GenerateAttackRow(event) {
  let markup = `
  <li class="item flexrow">
    <div class="item-name item-round">${event.round}</div>
    <div class="item-name item-weapon">${
      event.item.itemLink ? event.item.itemLink : event.item.name
    }</div>
    <div class="item-name">${event.actionType}</div>
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
    <div class="item-name">${event.damageTotal}</div>
  </li>`;

  return markup;
}

function GenerateHealtRow(event) {
  let markup = `
  <li class="item flexrow">
    <div class="item-name item-round">${event.round}</div>
    <div class="item-name">${event.current} (${event.isheal ? "+" : "-"}${
    event.diff
  })</div>
  </li>`;

  return markup;
}
