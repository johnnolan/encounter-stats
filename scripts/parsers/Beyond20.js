/* istanbul ignore file */
import {
  nullChecks,
  GetCombatantStats,
  CombatantStats,
  _add,
} from "../Utils.js";

export default async function Beyond20(stat, attackData, data) {
  if (data.data.content.indexOf("beyond20-message") === -1) return;
  let combatantStat = GetCombatantStats(stat, data.data.speaker.actor);
  if (!combatantStat) return;
  attackData.actorId = data.data.speaker.actor;

  const rollContent = $(data.data.content);
  const attackRollData = rollContent.find(".beyond20-roll-result").first();
  attackData.isCritical = rollContent.html().indexOf("Critical Damage") > -1;

  attackData.item.name = rollContent
    .find("details > summary > a")
    .text()
    .trim();

  if (!attackData.isCritical) {
    attackData.attackTotal = parseInt(
      attackRollData
        .find(".beyond20-roll-detail-normal")
        .not(".beyond20-roll-detail-discarded")
        .not(".beyond20-roll-total")
        .first()
        .text()
        .trim()
    );
    attackData.damageTotal = parseInt(
      rollContent
        .find(".beyond20-roll-result")
        .last()
        .find(".beyond20-roll-total.dice-total")
        .text()
        .trim()
    );
  } else {
    const damageCritNumber = rollContent.find(
      ".beyond20-roll-detail-normal"
    ).length;

    const damageOne = $(
      rollContent.find(".beyond20-roll-detail-normal")[damageCritNumber - 1]
    )
      .text()
      .trim();
    const damageTwo = $(
      rollContent.find(".beyond20-roll-detail-normal")[damageCritNumber - 2]
    )
      .text()
      .trim();
    attackData.damageTotal = parseInt(damageOne) + parseInt(damageTwo);

    attackData.attackTotal = parseInt(
      attackRollData.find(".beyond20-roll-detail-crit").text().trim()
    );
  }

  const advantageCheck = attackRollData.find(".beyond20-roll-cell").length > 1;
  if (advantageCheck) {
    const attackRolls = attackRollData.find(".beyond20-tooltip");
    let rollsArray = [];
    for (let i = 0; i < attackRolls.length; i++) {
      const roll = $(attackRolls[i]).children().first();
      rollsArray.push({
        value: roll.text().trim(),
        isIgnored: roll.hasClass("beyond20-roll-detail-discarded"),
      });
    }
    if (
      rollsArray.find((f) => f.isIgnored).value <
      rollsArray.find((f) => !f.isIgnored).value
    ) {
      attackData.advantage = true;
    } else {
      attackData.disadvantage = true;
    }
  }

  combatantStat.events.push(attackData);

  attackData = nullChecks(attackData);

  combatantStat = CombatantStats(combatantStat);

  return stat;
}
