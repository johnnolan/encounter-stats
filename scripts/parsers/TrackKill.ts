import { GetCombatantStatsByTokenId } from "../Utils.js";
import { GetStat, SaveStat } from "../StatManager.js";
import { CombatantKills } from "../types/globals.js";

export default async function UpdateHealth(
  targetName: string,
  tokenId: string
) {
  const stat = GetStat();
  const killData = <CombatantKills>{};

  const combatantStat = GetCombatantStatsByTokenId(stat, tokenId);
  if (!combatantStat) return;

  killData.round = stat.round;
  killData.tokenName = targetName;

  combatantStat.kills.push(killData);

  await SaveStat(stat);
  return stat;
}
