export function CreateCombatantProfile(combatant) {
  const markup = `
  <hr />
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
              <td class="fvtt-enc-stats_combatants_actor_image"><img src="${combatant.img}" width="100" height="100" alt="${combatant.name}" /></td>
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
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="fvtt-enc-stats_combatants_summary">
      <table>
        <tbody class="fvtt-enc-stats_combatants_summary-table" data-fvtt-attack-summary-id="${combatant.id}">
          <tr>
            <th scope="col">Min</th>
            <th scope="col">Max</th>
            <th scope="col">Average</th>
            <th scope="col">Damage Total</th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  `;

  return markup;
}

export function CreateNewEntry(encounterId) {
  const markup = `
 <div class="fvtt-enc-stats">
    <h1>
        Encounter ID: ${encounterId}
    </h1>
    <hr />
    <div class="fvtt-enc-stats_combatants">

    </div>
 </div>
`;

  return markup;
}

export function CreateSummaryRow(summaryList) {
  let markup = `
    <tr>
      <td>${summaryList.min}</td>
      <td>${summaryList.max}</td>
      <td>${summaryList.avg}</td>
      <td>${summaryList.total}</td>
    </tr>`;

  return markup;
}

export function CreateAttackRow(event, round) {
  let markup = `
  <tr data-event-id="${event.id}">
    <th scope="row">Round ${round}</th>
    <td>${event.item.itemLink ? event.item.itemLink : event.item.name}</td>
    <td>${event.advantage}</td>
    <td>${event.disadvantage}</td>
    <td>${event.attackTotal}</td>
    <td data-damage-total="${event.damageTotal}">${event.damageTotal}</td>
  </tr>`;

  return markup;
}
