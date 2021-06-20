import { GetCombatantStats, _add } from "../Utils.js";
import { GetStat, SaveStat } from "../StatManager.js";
import { HEALTH_DATA_TEMPLATE } from "../Settings.js";

export default async function UpdateHealth(data) {
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
  return stat;
}
