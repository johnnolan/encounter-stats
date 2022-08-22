import {
  nullChecks,
  resetDamageIfAreaEffect,
  GetItemData,
  ChatType,
  GetCombatantStats,
  CombatantStats
} from "../Utils";
import { ATTACKTYPES } from "../Settings";

export default async function Default(stat, attackData, data) {
  const combatantStat = GetCombatantStats(stat, data.data.speaker.actor);
  if (!combatantStat) return;
  const eventsLength = combatantStat.events.length;
  attackData.actorId = data.data.speaker.actor;

  const chatType = await ChatType(data);
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
    attackData: attackData,
  };
}
