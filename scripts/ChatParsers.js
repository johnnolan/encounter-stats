import {
  IsValidAttack,
  nullChecks,
  GetItemData,
  ChatType,
  GetCombatantStats,
  CombatantStats,
  _add,
} from "./Utils.js";
import { GetStat, SaveStat } from "./StatManager.js";
import { ATTACKTYPES, HEALTH_DATA_TEMPLATE } from "./Settings.js";

export async function UpdateHealth(data) {
  let stat = GetStat();
  let healthData = duplicate(HEALTH_DATA_TEMPLATE);

  let combatantStat = GetCombatantStats(stat, data.data._id);
  if (!combatantStat) return;

  healthData.round = stat.round;
  healthData.actorId = data.data._id;
  healthData.max = data.data.data.attributes.hp.max;
  healthData.current = data.data.data.attributes.hp.value;

  if (combatantStat.health.length > 0) {
    healthData.previous =
      combatantStat.health[combatantStat.health.length - 1].current;
  } else {
    healthData.previous = combatantStat.hp;
  }

  if (healthData.current > healthData.previous) {
    healthData.diff = healthData.current - healthData.previous;
    healthData.isheal = true;
  } else if (healthData.current < healthData.previous) {
    healthData.diff = healthData.previous - healthData.current;
    healthData.isdamage = true;
  }

  if (healthData.diff > 0) {
    combatantStat.health.push(healthData);
  }

  await SaveStat(stat);
}

export async function Default(stat, attackData, data) {
  if (data.data.content.indexOf("beyond20-message") > -1) return;
  let combatantStat = GetCombatantStats(stat, data.data.speaker.actor);
  if (!combatantStat) return;
  attackData.actorId = data.data.speaker.actor;

  let chatType = await ChatType(data);
  if (chatType === ATTACKTYPES.NONE) return;

  if (chatType === ATTACKTYPES.INFO) {
    attackData = await GetItemData(
      attackData,
      attackData.actorId,
      data.data.content
    );

    combatantStat.events.push(attackData);
  }

  if (
    chatType === ATTACKTYPES.ATTACK ||
    chatType === ATTACKTYPES.DAMAGE ||
    chatType === ATTACKTYPES.DAMAGE_FORMULA
  ) {
    attackData = combatantStat.events[combatantStat.events.length - 1];

    if (chatType === ATTACKTYPES.ATTACK) {
      attackData.attackTotal = data._roll.total;
      attackData.advantage =
        data._roll.options.advantageMode === 1 ? true : false;
      attackData.disadvantage =
        data._roll.options.advantageMode === -1 ? true : false;
    }
    if (
      chatType === ATTACKTYPES.DAMAGE ||
      chatType === ATTACKTYPES.DAMAGE_FORMULA
    ) {
      attackData.damageTotal = data._roll.total;
      if (data._roll.options.critical != null) {
        attackData.isCritical = data._roll.options.critical;
      }
    }
  }

  attackData = nullChecks(attackData);

  combatantStat = CombatantStats(combatantStat);

  return stat;
}

export async function Beyond20(stat, attackData, data) {
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

export async function MidiQol(stat, attackData, workflow) {
  let combatantStat = GetCombatantStats(stat, workflow.actor._id);
  if (!combatantStat) return;
  attackData.id = workflow._id;
  attackData.actorId = workflow.actor._id;

  attackData = await GetItemData(
    attackData,
    attackData.actorId,
    null,
    workflow.item._id
  );

  let actionType = "";
  if (workflow.item?.data?.actionType) {
    actionType = workflow.item.data.actionType;
  } else if (workflow.item?.data?.data?.actionType) {
    actionType = workflow.item.data.data.actionType;
  }

  if (IsValidAttack(actionType)) {
    if (workflow.attackRoll) {
      attackData.attackTotal = workflow.attackRoll.total;
      attackData.advantage =
        workflow.attackRoll.options.advantageMode === 1 ? true : false;
      attackData.disadvantage =
        workflow.attackRoll.options.advantageMode === -1 ? true : false;
    }
    if (workflow.damageRoll) {
      attackData.damageTotal = workflow.damageRoll.total;
      attackData.isCritical = workflow.damageRoll.options.critical;
    }
  }
  attackData = nullChecks(attackData);

  if (combatantStat.events.find((f) => f.id === attackData.id)) {
    combatantStat.events[combatantStat.events.length - 1] = attackData;
  } else {
    combatantStat.events.push(attackData);
  }

  combatantStat = CombatantStats(combatantStat);

  return stat;
}

export async function BetterRollsFor5e(stat, attackData, $html, isNew) {
  let combatantStat = GetCombatantStats(stat, $html.attr("data-actor-id"));
  if (!combatantStat) return;
  attackData.actorId = $html.attr("data-actor-id");

  if (!isNew) {
    attackData = combatantStat.events[combatantStat.events.length - 1];
  } else {
    attackData = await GetItemData(
      attackData,
      attackData.actorId,
      $html,
      $html.attr("data-item-id")
    );
  }

  $html.find(".die-icon").remove();
  let $attackRollData = $html.find('[data-type="attack"]');
  let $damageRollData = $html.find('[data-type="damage"]');
  let damageTotal = $damageRollData
    .find(".red-base-die")
    .not(".ignored")
    .map(function () {
      return parseInt($(this).attr("data-value"));
    })
    .get()
    .reduce(_add, 0);

  let attackTotal = parseInt(
    $attackRollData.find(".dice-total").not(".ignored").text().trim()
  );
  if (isNaN(attackTotal)) attackTotal = 0;
  if (isNaN(damageTotal)) damageTotal = 0;

  attackData.advantage =
    $attackRollData.attr("data-rollState") === "highest" ? true : false;
  attackData.isCritical = $html.attr("data-critical") === "true" ? true : false;
  attackData.isFumble = false;
  attackData.disadvantage =
    $attackRollData.attr("data-rollState") === "lowest" ? true : false;
  attackData.attackTotal = attackTotal;
  attackData.damageTotal = damageTotal;
  attackData.itemId = $html.attr("data-item-id");

  attackData = nullChecks(attackData);

  if (isNew) {
    combatantStat.events.push(attackData);
  }

  combatantStat = CombatantStats(combatantStat);

  return stat;
}
