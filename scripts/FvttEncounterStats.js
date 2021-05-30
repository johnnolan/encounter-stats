import { CreateJournal, UpdateJournal, GetArticle } from "./Journal.js";
import {
  CreateCombatantProfile,
  CreateNewEntry,
  CreateAttackRow,
} from "./Markup.js";
import {
  CleanseCombatants,
  ParseAttackData,
  AttackArrayFromHtml,
} from "./DataParsing.js";
import {
  GetItemFromLocalStorage,
  SaveToLocalStorage,
  TruncateLocalStorage,
} from "./LocalStorage.js";

async function _buildSummaries() {
  let article = await GetArticle();
  let $currentHtml = $(`<div>${article.data.content}</div>`);
  AttackArrayFromHtml($currentHtml);

  await UpdateJournal($currentHtml.html(), article);
}

async function _updateJournalCombatant(html) {
  let article = await GetArticle();
  let currentHtml = $(article.data.content);
  currentHtml
    .find(".fvtt-enc-stats_combatants")
    .append($(`<div>${html}</div>`).html());

  await UpdateJournal(currentHtml.html(), article);
}

async function _updateJournalAttack(data) {
  let article = await GetArticle();
  const round = GetItemFromLocalStorage()?.round;
  if (!round) return;

  const event = ParseAttackData(data);

  let currentHtml = $(`<div>${article.data.content}</div>`);
  let eventHtml = currentHtml.find(`[data-event-id="${event.id}"]`);
  if (eventHtml) {
    eventHtml.remove();
  }
  currentHtml
    .find(`[data-fvtt-attack-id="${event.actorId}"]`)
    .append(CreateAttackRow(event, round));

  await UpdateJournal(currentHtml.html(), article);
}

async function _updateJournalCombatants(data) {
  let article = await GetArticle();
  if (!article || !data.combat) return;
  let currentHtml = $(article.data.content);
  if (currentHtml.find(".fvtt-enc-stats_combatant").length > 0) return;

  let newCombatantHtml = "";
  const combatantsList = data.combat.data._source.combatants;
  for (let i = 0; i < combatantsList.length; i++) {
    const actorId = combatantsList[i].actorId;
    const combatants = CleanseCombatants(game.actors.get(actorId));
    if (combatants) {
      newCombatantHtml += CreateCombatantProfile(combatants);
    }
  }
  await _updateJournalCombatant(newCombatantHtml);
}

async function _updateRound(currentRound) {
  if (!currentRound) return;
  const pastRound = GetItemFromLocalStorage()?.round;
  if (pastRound !== currentRound) {
    const encounterId = GetItemFromLocalStorage()?.encounterId;
    if (!encounterId) return;
    SaveToLocalStorage(encounterId, currentRound);
  }
}

export async function OnRenderCombatTracker(arg3) {
  await _updateJournalCombatants(arg3);
}

export async function OnCreateCombat(arg1) {
  const encounterId = arg1.data._id;
  if (!encounterId) return "";
  SaveToLocalStorage(encounterId);
  await CreateJournal(arg1, CreateNewEntry(encounterId));
}

export async function OnDeleteCombat(arg1) {
  await _buildSummaries();
  TruncateLocalStorage(arg1.data._id);
}

export async function OnMidiQolRollComplete(attackData) {
  if (attackData.actor.type !== "character") return;
  _updateJournalAttack(attackData);
}

export async function OnUpdateCombat(round) {
  _updateRound(round);
}
