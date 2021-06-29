import {
  nullChecks,
  resetDamageIfAreaEffect,
  GetItemData,
  GetCombatantStats,
  CombatantStats,
  _add,
} from "../Utils.js";

export default async function PF1(stat, attackDataTemp, data) {
  if (data.data.content.indexOf("beyond20-message") > -1) return;
  let combatantStat = GetCombatantStats(stat, data.data.speaker.actor);
  if (!combatantStat) return;
  const eventsLength = combatantStat.events.length;

  let rollsData = data.data.flags.pf1.metadata.rolls;
  attackDataTemp.actorId = data.data.speaker.actor;
  attackDataTemp = await GetItemData(
    attackDataTemp,
    attackDataTemp.actorId,
    data.data.content,
    data.data.flags.pf1.metadata.item
  );

  const attackRollData = rollsData.attacks[0];
  let attackData = duplicate(attackDataTemp);
  attackData.round = attackDataTemp.round;

  attackData.attackTotal = attackRollData.attack.total;

  let damageTotal = 0;
  for (let j = 0; j < attackRollData.damage.length; j++) {
    const damageRolls = attackRollData.damage[j];
    damageTotal = damageTotal + damageRolls.roll.total;
  }

  /*for (let j = 0; j < attackRollData.damage.length; j++) {
      const damageRolls = attackRollData.damage[j];
      damageTotal = damageTotal + damageRolls.roll.total;
    }*/
  damageTotal = damageTotal + attackRollData.damage[0].roll.total;

  if (attackRollData.critConfirm?.evaluated === true) {
    attackData.isCritical = true;
    damageTotal = damageTotal + attackRollData.critConfirm.total;
  }
  attackData.damageTotal = damageTotal;

  resetDamageIfAreaEffect(attackData, stat.templateHealthCheck.length > 1);

  nullChecks(attackData);

  combatantStat.events.push(attackData);

  CombatantStats(combatantStat);

  return {
    stat: stat,
    isNewAttack: combatantStat.events.length > eventsLength,
  };
}
