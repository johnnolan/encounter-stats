import EncounterJournal from "./EncounterJournal";
import CombatFlag from "./CombatFlag";
import Logger from "./Helpers/Logger";
import { STORAGE_NAME } from "./Settings";
import Stat from "./stats/Stat";
import Trans from "./Helpers/Trans";

class StatManager {
  static async IsInCombat() {
    const isFlagSet = await CombatFlag.IsSet(STORAGE_NAME);
    if (!game.combat?.active && isFlagSet) {
      return false;
    }
    return isFlagSet;
  }

  static async GetStat(actorId?: string): Promise<Encounter | undefined> {
    return await CombatFlag.Get(STORAGE_NAME, actorId);
  }

  static async SaveStat(encounter: Encounter) {
    if (!encounter?.encounterId) {
      Logger.error(`No encounterId to save stat`, "statmanager.SaveStat");
      return;
    }
    await CombatFlag.Save(STORAGE_NAME, encounter);

    const markup = await this.RenderEncounter(encounter);

    await EncounterJournal.UpdateJournalData(
      markup,
      "encounterId",
      encounter.encounterId
    );
  }

  static RemoveStat() {
    CombatFlag.Remove();
  }

  static async RenderEncounter(encounter: Encounter) {
    let renderData = encounter;

    renderData.enemyNumber = renderData.enemies.length;
    for (let i = 0; i < renderData.combatants.length; i++) {
      const combatant = renderData.combatants[i];
      if (combatant.type !== "character") {
        renderData.combatants.pop(combatant);
      }
    }

    for (let i = 0; i < renderData.combatants.length; i++) {
      const combatant = renderData.combatants[i];

      // Attacks
      combatant.rounds = [];
      for (let j = 0; j < combatant.events.length; j++) {
        const event = combatant.events[j];

        event.damageOrHeal = await this.getHealOrDamageClass(event.actionType);
        event.rollAdvDis = event.advantage
          ? "advantage"
          : event.disadvantage
          ? "disadvantage"
          : "normal";

        event.damageMultipleEnemiesTotal =
          event.damageMultipleEnemiesTotal ?? event.damageTotal;

        event.actionTypeIcon = this.getAttackTypeFAIcon(event.actionType);

        event.attackTotal = event.isCritical
          ? `${event.attackTotal} (c)`
          : `${event.attackTotal}`;

        if (!combatant.rounds[event.round - 1]) {
          combatant.rounds[event.round - 1] = {
            round: event.round,
          };
        }
        if (!combatant.rounds[event.round - 1].attacks) {
          combatant.rounds[event.round - 1].attacks = [];
        }
        let round = combatant.rounds[event.round - 1];
        round.attacks.push(event);
      }

      // Kills
      for (let j = 0; j < combatant.kills.length; j++) {
        const kill = combatant.kills[j];
        if (!combatant.rounds[kill.round - 1]) {
          combatant.rounds[kill.round - 1] = {
            round: kill.round,
          };
        }
        if (!combatant.rounds[kill.round - 1].kills) {
          combatant.rounds[kill.round - 1].kills = [];
        }
        let round = combatant.rounds[kill.round - 1];
        round.kills.push({ tokenName: kill.tokenName });
      }

      // Health
      for (let j = 0; j < combatant.health.length; j++) {
        const health = combatant.health[j];
        if (!combatant.rounds[health.round - 1]) {
          combatant.rounds[health.round - 1] = {
            round: health.round,
          };
        }
        if (!combatant.rounds[health.round - 1].health) {
          combatant.rounds[health.round - 1].health = [];
        }
        let round = combatant.rounds[health.round - 1];
        if (health.diff) {
          round.health.push({
            current: health.current,
            diff: `${health.isheal ? "+" : "-"} ${health.diff}`,
          });
        }
      }

      // Damage
      for (let j = 0; j < combatant.roundSummary.totals.length; j++) {
        const total = combatant.roundSummary.totals[j];
        combatant.rounds.find((f) => f.round === total.round).damageTotal = total.damageTotal;
      }
    }

    const template_file = "./modules/encounter-stats/templates/encounter_1.hbs";
    const rendered_html = await renderTemplate(template_file, renderData);

    return rendered_html;
  }

  private static async getHealOrDamageClass(attackType: string) {
    const stat = new Stat();
    if (stat.IsHealingSpell(attackType)) return "blue";
    if (stat.IsValidAttack(attackType)) return "red";
  }

  private static getAttackTypeFAIcon(attackType: string) {
    let iconName = "dice-d20";
    let iconDescription = Trans.Get("actiontypes.other");
    switch (attackType) {
      case "heal":
        iconName = "heart";
        iconDescription = Trans.Get("actiontypes.heal");
        break;
      case "msak":
        iconName = "scroll";
        iconDescription = Trans.Get("actiontypes.msak");
        break;
      case "rsak":
        iconName = "scroll";
        iconDescription = Trans.Get("actiontypes.rsak");
        break;
      case "mwak":
        iconName = "fist-raised";
        iconDescription = Trans.Get("actiontypes.mwak");
        break;
      case "rwak":
        iconName = "fist-raised";
        iconDescription = Trans.Get("actiontypes.rwak");
        break;
      case "save":
        iconName = "shield-alt";
        iconDescription = Trans.Get("actiontypes.save");
        break;
    }

    return `<i title="${iconDescription}" class="fas fa-${iconName}"></i>`;
  }
}

export default StatManager;
