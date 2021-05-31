export function Generate(data) {
  const markup = `
  <div class="fvtt-enc-stats">
    <h1>
        Encounter ID: ${data.encounterId}
    </h1>
    <hr />
    <div class="fvtt-enc-stats_combatants">
    <div>
    <h2>Players</h2>
    <hr />${data.combatants
      .filter((f) => f.type === "character")
      .map(function (combatant) {
        return GenerateCombatant(combatant);
      })
      .join("")}</div>
      <div>
      <hr />
      <h2>NPCs</h2>
      <hr />${data.combatants
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
    <h2>${combatant.name}</h2>
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
              <td class="fvtt-enc-stats_combatants_actor_image"><img src="${
                combatant.img
              }" width="100" height="100" alt="${combatant.name}" /></td>
              <td>${combatant.hp}</td>
              <td>${combatant.max}</td>
              <td>${combatant.ac}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="fvtt-enc-stats_combatants_attacks">
        <table>
          <tbody data-fvtt-attack-id="${combatant.id}">
            <tr>
              <td></td>
              <th scope="col">Weapon Name</th>
              <th scope="col">Advantage</th>
              <th scope="col">Disadvantage</th>
              <th scope="col">Attack Total</th>
              <th scope="col">Damage Total</th>
            </tr>${combatant.events
              .map(function (event) {
                return GenerateAttackRow(event);
              })
              .join("")}
          </tbody>
        </table>
      </div>
    </div>
    <div class="fvtt-enc-stats_combatants_summary">
      <table>
        <tbody class="fvtt-enc-stats_combatants_summary-table" data-fvtt-attack-summary-id="${
          combatant.id
        }">
          <tr>
            <th scope="col">Min</th>
            <th scope="col">Max</th>
            <th scope="col">Average</th>
            <th scope="col">Damage Total</th>
          </tr>
          <tr>
            <td>${combatant.summaryList.min}</td>
            <td>${combatant.summaryList.max}</td>
            <td>${combatant.summaryList.avg}</td>
            <td>${combatant.summaryList.total}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  `;

  return markup;
}

function GenerateSummaryRow(summaryList) {
  let markup = `
    <tr>
      <td>${summaryList.min}</td>
      <td>${summaryList.max}</td>
      <td>${summaryList.avg}</td>
      <td>${summaryList.total}</td>
    </tr>`;

  return markup;
}

function GenerateAttackRow(event) {
  let markup = `
  <tr data-event-id="${event.id}">
    <th scope="row">Round ${event.round}</th>
    <td>${event.item.itemLink ? event.item.itemLink : event.item.name}</td>
    <td>${event.advantage}</td>
    <td>${event.disadvantage}</td>
    <td>${event.attackTotal}</td>
    <td data-damage-total="${event.damageTotal}">${event.damageTotal}</td>
  </tr>`;

  return markup;
}
