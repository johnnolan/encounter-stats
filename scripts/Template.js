export function Generate(data) {
  const markup = `
  <div class="fvtt-enc-stats">
    <hr />
    <div class="fvtt-enc-stats_top">
      <div class="fvtt-enc-stats_actor_statlist flexrow">
        <div class="fvtt-enc-stats_actor_stat">
          <div class="fvtt-enc-stats_actor_stat-key">Most Damage Overall</div>
          <div class="fvtt-enc-stats_actor_stat-value">${
            data.top.maxDamage
          }</div>
        </div>
        <div class="fvtt-enc-stats_actor_stat">
          <div class="fvtt-enc-stats_actor_stat-key">Highest Average Damage</div>
          <div class="fvtt-enc-stats_actor_stat-value">${
            data.top.highestAvgDamage
          }</div>
        </div>
        <div class="fvtt-enc-stats_actor_stat">
          <div class="fvtt-enc-stats_actor_stat-key">Highest Damage in 1 hit</div>
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
          Enemies
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
              <div class="fvtt-enc-stats_actor_stat-key">HP</div>
              <div class="fvtt-enc-stats_actor_stat-value">
                <span>${combatant.hp}</span><span class="sep">/</span><span>${
    combatant.max
  }</span></div>
            </div>
            <div class="fvtt-enc-stats_actor_stat">
              <div class="fvtt-enc-stats_actor_stat-key">AC</div>
              <div class="fvtt-enc-stats_actor_stat-value"><span>${
                combatant.ac
              }</span></div>
            </div>
            <div class="fvtt-enc-stats_actor_stat">
              <div class="fvtt-enc-stats_actor_stat-key">Damage Total</div>
              <div class="fvtt-enc-stats_actor_stat-value"><span>${
                combatant.summaryList.total
              }</span></div>
            </div>
            <div class="fvtt-enc-stats_actor_stat">
              <div class="fvtt-enc-stats_actor_stat-key">Min Damage</div>
              <div class="fvtt-enc-stats_actor_stat-value"><span>${
                combatant.summaryList.min
              }</span></div>
            </div>
            <div class="fvtt-enc-stats_actor_stat">
              <div class="fvtt-enc-stats_actor_stat-key">Max Damage</div>
              <div class="fvtt-enc-stats_actor_stat-value"><span>${
                combatant.summaryList.max
              }</span></div>
            </div>
            <div class="fvtt-enc-stats_actor_stat">
              <div class="fvtt-enc-stats_actor_stat-key">Avg Damage</div>
              <div class="fvtt-enc-stats_actor_stat-value"><span>${
                combatant.summaryList.avg
              }</span></div>
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
              ${combatant.events
                .map(function (event) {
                  return GenerateAttackRow(event);
                })
                .join("")}
                     
            </ol>
          </ol>
        </div>
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
    <div class="item-name">${event.advantage}</div>
    <div class="item-name">${event.disadvantage}</div>
    <div class="item-name">${event.attackTotal}</div>
    <div class="item-name">${event.damageTotal}</div>
  </li>`;

  return markup;
}
