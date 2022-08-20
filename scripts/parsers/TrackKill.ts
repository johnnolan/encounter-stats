import { GetCombatantStatsByTokenId, _add } from "../Utils.js";
import { GetStat, SaveStat } from "../StatManager.js";
import { KILLED_DATA_TEMPLATE } from "../Settings.js";

export default async function UpdateHealth(targetName, tokenId) {
  let stat = GetStat();
  let killData = duplicate(KILLED_DATA_TEMPLATE);

  let combatantStat = GetCombatantStatsByTokenId(stat, tokenId);
  if (!combatantStat) return;

  killData.round = stat.round;
  killData.tokenName = targetName;

  combatantStat.kills.push(killData);

  await SaveStat(stat);
  return stat;
}
