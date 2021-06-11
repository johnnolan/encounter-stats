import { CreateJournal } from "./Journal.js";
import { AddCombatants, AddAttack } from "./DataParsing.js";
import { ROLL_HOOK } from "./Settings.js";
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
  AddAttack(attackData, ROLL_HOOK.DEFAULT);
}

export async function OnMidiRollComplete(workflow) {
  AddAttack(workflow, ROLL_HOOK.MIDI_QOL);
}

export async function OnUpdateBetterRolls(attackData, isNew) {
  AddAttack(attackData, ROLL_HOOK.BETTERROLLS5E, isNew);
}

export async function OnUpdateCombat(round) {
  _updateRound(round);
}
