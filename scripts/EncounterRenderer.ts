import Stat from "./stats/Stat";
import Trans from "./Helpers/Trans";

class EncounterRenderer {
  static async Render(encounter: Encounter) {
    const renderData = encounter;

    renderData.enemyNumber = renderData.enemies?.length ?? 0;
    for (const combatant of renderData.combatants) {
      if (combatant.type !== "character") {
        renderData.combatants.pop(combatant);
      }
    }

    for (const combatant of renderData.combatants) {
      // Attacks
      combatant.rounds = [];
      for (const event of combatant.events) {
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
        const round = combatant.rounds[event.round - 1];
        round.attacks.push(event);
      }

      // Kills
      for (const kill of combatant.kills) {
        if (!combatant.rounds[kill.round - 1]) {
          combatant.rounds[kill.round - 1] = {
            round: kill.round,
          };
        }
        if (!combatant.rounds[kill.round - 1].kills) {
          combatant.rounds[kill.round - 1].kills = [];
        }
        const round = combatant.rounds[kill.round - 1];
        round.kills.push({ tokenName: kill.tokenName });
      }

      // Health
      let downedCount = 0;
      for (const health of combatant.health) {
        if (health.isdamage && health.current < 1) {
          downedCount++;
        }

        if (!combatant.rounds[health.round - 1]) {
          combatant.rounds[health.round - 1] = {
            round: health.round,
          };
        }
        if (!combatant.rounds[health.round - 1].health) {
          combatant.rounds[health.round - 1].health = [];
        }
        const round = combatant.rounds[health.round - 1];
        if (health.diff) {
          round.health.push({
            current: health.current,
            diff: `${health.isheal ? "+" : "-"} ${health.diff}`,
          });
        }
      }
      combatant.downed = downedCount;

      // Damage
      for (const total of combatant.roundSummary.totals) {
        const roundData = combatant.rounds.find(
          (f) => f?.round === total.round
        );
        if (!roundData) {
          combatant.rounds[total.round - 1] = total.round ?? 0;
        } else {
          roundData.damageTotal = total.damageTotal;
        }
      }
    }

    const template_file = "./modules/encounter-stats/templates/encounter_1.hbs";
    const rendered_html = await renderTemplate(template_file, renderData);

    return { html: rendered_html, data: renderData };
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

export default EncounterRenderer;
