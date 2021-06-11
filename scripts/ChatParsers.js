import {
  IsValidAttack,
  nullChecks,
  GetItemData,
  ChatType,
  GetCombatantStats,
  CombatantStats,
  _add,
} from "./Utils.js";
import { ATTACKTYPES } from "./Settings.js";

export async function Default(stat, attackData, data) {
  let combatantStat = GetCombatantStats(stat, data.data.speaker.actor);
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

export async function MidiQol(stat, attackData, workflow) {
  let combatantStat = GetCombatantStats(stat, workflow.actor._id);
  attackData.id = workflow._id;
  attackData.actorId = workflow.actor._id;

  attackData = await GetItemData(
    attackData,
    attackData.actorId,
    null,
    workflow.item._id
  );

  if (IsValidAttack(workflow.item.data.data.actionType)) {
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
