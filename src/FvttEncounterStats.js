import { CreateJournal } from "./Journal.js";
import {
  AddCombatants,
  AddAttack5e,
  UpdateAttackBR5e,
  AddAttackMidiQol,
} from "./DataParsing.js";
import { GetStat, SaveStat, RemoveStat } from "./StatManager.js";

async function _createCombat(data) {
  const encounterId = data.data._id;
  if (!encounterId) return "";
  let stat = {
    encounterId: encounterId,
    round: 1,
    combatants: [],
    top: {
      maxDamage: "",
      highestAvgDamage: "",
      highestMaxDamage: "",
    },
  };
  await CreateJournal(encounterId);
  await SaveStat(stat);
}

async function _addCombatants(data) {
  if (!data.combat) return;
  const combatantsList = data.combat.data._source.combatants;
  for (let i = 0; i < combatantsList.length; i++) {
    const actorId = combatantsList[i].actorId;
    AddCombatants(game.actors.get(actorId));
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
  _createCombat(arg1);
}

export async function OnDeleteCombat() {
  RemoveStat();
}

export async function OnCreateChatMessage(attackData) {
  AddAttack5e(attackData);
}

export async function OnMidiRollComplete(workflow) {
  AddAttackMidiQol(workflow);
}

export async function OnUpdateBetterRolls(attackData, isNew) {
  UpdateAttackBR5e(attackData, isNew);
}

export async function OnUpdateCombat(round) {
  _updateRound(round);
}
