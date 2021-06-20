import { GetStat, SaveStat } from "./StatManager.js";
import Default from "./parsers/Default.js";
import BetterRollsFor5e from "./parsers/BetterRollsFor5e.js";
import MidiQol from "./parsers/MidiQol.js";
import Beyond20 from "./parsers/Beyond20.js";
import MREDnd5e from "./parsers/MREDnd5e.js";
import { ROLL_HOOK, ATTACK_DATA_TEMPLATE } from "./Settings.js";

export async function AddAttack(data, type, isNew = false) {
  let stat = GetStat();
  let attackData = duplicate(ATTACK_DATA_TEMPLATE);
  attackData.round = stat.round;

  switch (type) {
    case ROLL_HOOK.BETTERROLLS5E:
      stat = await BetterRollsFor5e(stat, attackData, data, isNew);
      break;
    case ROLL_HOOK.MIDI_QOL:
      stat = await MidiQol(stat, attackData, data);
      break;
    case ROLL_HOOK.BEYOND_20:
      stat = await Beyond20(stat, attackData, data);
      break;
    case ROLL_HOOK.MREDND5E:
      stat = await MREDnd5e(stat, attackData, data);
      break;
    case ROLL_HOOK.DEFAULT:
      stat = await Default(stat, attackData, data);
      break;
    default:
      return;
  }

  if (!stat) return;
  stat.top = _getTopStats(stat);

  await SaveStat(stat);
}

export async function AddCombatants(combatants, tokenImage) {
  const combatant = combatants.data;
  if (!_isValidCombatant(combatant.type)) return;

  let stat = GetStat();

  const newCombatants = {
    name: combatant.name,
    id: combatant._id,
    img: tokenImage ? tokenImage : combatant.img,
    type: combatant.type,
    hp: combatant.data.attributes.hp.value,
    max: combatant.data.attributes.hp.max,
    ac: combatant.data.attributes.ac.value,
    events: [],
    health: [],
    summaryList: {
      min: "0",
      max: "0",
      avg: "0",
      total: "0",
    },
  };

  if (!stat.combatants.find((f) => f.id === newCombatants.id)) {
    stat.combatants.push(newCombatants);
    await SaveStat(stat);
  }
}

function _isValidCombatant(type) {
  return type === "character" || type === "npc";
}

function _getTopStats(data) {
  let result = data.combatants.map((m) => {
    return {
      name: m.name,
      min: m.summaryList.min,
      max: m.summaryList.max,
      avg: m.summaryList.avg,
      total: m.summaryList.total,
    };
  });

  let maxDamage = result.reduce(function (max, obj) {
    return obj.total > max.total ? obj : max;
  });
  let highestAvgDamage = result.reduce(function (max, obj) {
    return obj.avg > max.avg ? obj : max;
  });
  let highestMaxDamage = result.reduce(function (max, obj) {
    return obj.max > max.max ? obj : max;
  });

  return {
    maxDamage: `${maxDamage.name}<br />${maxDamage.total}`,
    highestAvgDamage: `${highestAvgDamage.name}<br />${highestAvgDamage.avg}`,
    highestMaxDamage: `${highestMaxDamage.name}<br />${highestMaxDamage.max}`,
  };
}
