import {
  nullChecks,
  resetDamageIfAreaEffect,
  GetItemData,
  ChatType,
  GetCombatantStats,
  CombatantStats,
  _add,
} from "../Utils.js";
import { ATTACKTYPES } from "../Settings.js";

export default async function Default(stat, attackData, data) {
  if (data.data.content.indexOf("beyond20-message") > -1) return;
  let combatantStat = GetCombatantStats(stat, data.data.speaker.actor);
  if (!combatantStat) return;
  const eventsLength = combatantStat.events.length;
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

  resetDamageIfAreaEffect(attackData, stat.templateHealthCheck.length > 1);

  nullChecks(attackData);

  CombatantStats(combatantStat);

  return {
    stat: stat,
    isNewAttack: combatantStat.events.length > eventsLength,
  };
}
