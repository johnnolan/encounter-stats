import { CreateJournal } from "./Journal.js";
import {
  CleanseCombatants,
  ParseAttackData,
} from "./DataParsing.js";
import { GetStat, SaveStat, RemoveStat } from "./Stats.js";

async function _addCombatants(data) {
  if (!data.combat) return;
  const combatantsList = data.combat.data._source.combatants;
  for (let i = 0; i < combatantsList.length; i++) {
    const actorId = combatantsList[i].actorId;
    CleanseCombatants(game.actors.get(actorId));
  }
}

async function _updateRound(currentRound) {
  if (!currentRound) return;
  let stat = GetStat();
  if (stat.round !== currentRound) {
    stat.round = currentRound;
    await SaveStat(stat);
  }
}

export async function OnRenderCombatTracker(arg3) {
  await _addCombatants(arg3);
}

export async function OnCreateCombat(arg1) {
  const encounterId = arg1.data._id;
  if (!encounterId) return "";
  let stat = {
    encounterId: encounterId,
    round: 1,
    combatants: [],
  };
  await CreateJournal(encounterId);
  await SaveStat(stat);
}

export async function OnDeleteCombat(arg1) {
  RemoveStat();
}

export async function OnMidiQolRollComplete(attackData) {
  if (attackData.actor.type !== "character") return;
  ParseAttackData(attackData);
}

export async function OnUpdateCombat(round) {
  _updateRound(round);
}
