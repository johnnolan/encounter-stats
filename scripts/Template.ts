import Stat from "./stats/Stat";
import Trans from "./Helpers/Trans";
import StatManager from "./StatManager";
import { MODULE_ID, OPT_ENABLE_EXPORT_JSON } from "./Settings";

export default class Template {
  static Generate(encounter: Encounter) {
    return `
  <div class="fvtt-enc-stats">
    <hr />
    <div class="fvtt-enc-stats_top">
      <div class="fvtt-enc-stats_actor_statlist flexrow">
        <div class="fvtt-enc-stats_actor_stat">
          <div class="fvtt-enc-stats_actor_stat-key">${Trans.Get(
            "template.most_damage_overall"
          )}</div>
          <div class="fvtt-enc-stats_actor_stat-value">${
            encounter.top.maxDamage
          }</div>
        </div>
        <div class="fvtt-enc-stats_actor_stat">
          <div class="fvtt-enc-stats_actor_stat-key">${Trans.Get(
            "template.most_damage_per_turn"
          )}</div>
          <div class="fvtt-enc-stats_actor_stat-value">${
            encounter.top.mostDamageInOneTurn
          }</div>
        </div>
        <div class="fvtt-enc-stats_actor_stat">
          <div class="fvtt-enc-stats_actor_stat-key">${Trans.Get(
            "template.highest_average_damage"
          )}</div>
          <div class="fvtt-enc-stats_actor_stat-value">${
            encounter.top.highestAvgDamage
          }</div>
        </div>
        <div class="fvtt-enc-stats_actor_stat">
          <div class="fvtt-enc-stats_actor_stat-key">${Trans.Get(
            "template.highest_damage_in_1_hit"
          )}</div>
          <div class="fvtt-enc-stats_actor_stat-value">${
            encounter.top.highestMaxDamage
          }</div>
        </div>
      </div>
    </div>
    <hr />
    <div class="fvtt-enc-stats_top">
      <div class="fvtt-enc-stats_actor_statlist flexrow">
        <div class="fvtt-enc-stats_actor_stat">
          <div class="fvtt-enc-stats_actor_stat-key">${Trans.Get(
            "template.most_kills"
          )}</div>
          <div class="fvtt-enc-stats_actor_stat-value">${
            encounter.top.mostKills
          }</div>
        </div>
        <div class="fvtt-enc-stats_actor_stat">
          <div class="fvtt-enc-stats_actor_stat-key">${Trans.Get(
            "template.most_healing"
          )}</div>
          <div class="fvtt-enc-stats_actor_stat-value">${
            encounter.top.mostHealing
          }</div>
        </div>
        <div class="fvtt-enc-stats_actor_stat">
          <div class="fvtt-enc-stats_actor_stat-key">${Trans.Get(
            "template.most_support_actions"
          )}</div>
          <div class="fvtt-enc-stats_actor_stat-value">${
            encounter.top.mostSupportActions
          }</div>
        </div>
        <div class="fvtt-enc-stats_actor_stat">
          <div class="fvtt-enc-stats_actor_stat-key">${Trans.Get(
            "template.battlefield_actions"
          )}</div>
          <div class="fvtt-enc-stats_actor_stat-value">${
            encounter.top.mostBattlefieldActions
          }</div>
        </div>
      </div>
    </div>
    <div class="fvtt-enc-stats_combatants">
    <div>${encounter.combatants
      .filter((f) => f.type === "character")
      .map(function (combatant) {
        return Template.GenerateCombatant(combatant, encounter.round);
      })
      .join("")}</div></div>
      </div>
      ${Template.GenerateRawData(encounter)}
  `;
  }

  private static GenerateRawData(encounter: Encounter) {
    if (!game.settings.get(`${MODULE_ID}`, `${OPT_ENABLE_EXPORT_JSON}`)) {
      return "";
    }
    return `
    <section>
      <code>
        ${JSON.stringify(encounter)}
      </code>
    </section`;
  }

  private static GenerateCombatant(
    combatant: EncounterCombatant,
    numberOfRounds: number
  ) {
    return `
  <div class="fvtt-enc-stats_combatant" data-fvtt-id="${combatant.id}">
    <div class="fvtt-enc-stats_combatants_overview">
      <header class="fvtt-enc-stats_combatants_actor flexrow">
        <div class="fvtt-enc-stats_combatants_actor_image flexcol">
          <img src="${combatant.img}" alt="${combatant.name}" />
        </div>
        <div class="fvtt-enc-stats_actor_stats">
          <h1 class="fvtt-enc-stats_actor_stats_name">${combatant.name}</h1>
          <div class="fvtt-enc-stats_actor_statlist flexrow">
            <div class="fvtt-enc-stats_actor_stat">
              <div class="fvtt-enc-stats_actor_stat-key">${Trans.Get(
                "template.startinghp"
              )}</div>
              <div class="fvtt-enc-stats_actor_stat-value">
                <span>${combatant.hp}</span><span class="sep">/</span><span>${
      combatant.max
    }</span></div>
            </div>
            <div class="fvtt-enc-stats_actor_stat">
              <div class="fvtt-enc-stats_actor_stat-key">${Trans.Get(
                "template.finalhp"
              )}</div>
              <div class="fvtt-enc-stats_actor_stat-value">
                <span>${
                  combatant.health.length > 0
                    ? combatant.health[combatant.health.length - 1].current
                    : combatant.hp
                }</span><span class="sep">/</span><span>${
      combatant.max
    }</span></div>
            </div>
            <div class="fvtt-enc-stats_actor_stat">
              <div class="fvtt-enc-stats_actor_stat-key">${Trans.Get(
                "template.ac"
              )}</div>
              <div class="fvtt-enc-stats_actor_stat-value"><span>${
                combatant.ac
              }</span></div>
            </div>
            <div class="fvtt-enc-stats_actor_stat">
              <div class="fvtt-enc-stats_actor_stat-key">${Trans.Get(
                "template.damage_total"
              )}</div>
              <div class="fvtt-enc-stats_actor_stat-value"><span>${
                combatant.summaryList.total
              }</span></div>
            </div>
            <div class="fvtt-enc-stats_actor_stat">
              <div class="fvtt-enc-stats_actor_stat-key">${Trans.Get(
                "template.min_damage"
              )}</div>
              <div class="fvtt-enc-stats_actor_stat-value"><span>${
                combatant.summaryList.min
              }</span></div>
            </div>
            <div class="fvtt-enc-stats_actor_stat">
              <div class="fvtt-enc-stats_actor_stat-key">${Trans.Get(
                "template.max_damage"
              )}</div>
              <div class="fvtt-enc-stats_actor_stat-value"><span>${
                combatant.summaryList.max
              }</span></div>
            </div>
            <div class="fvtt-enc-stats_actor_stat">
              <div class="fvtt-enc-stats_actor_stat-key">${Trans.Get(
                "template.avg_damage"
              )}</div>
              <div class="fvtt-enc-stats_actor_stat-value"><span>${
                combatant.summaryList.avg
              }</span></div>
            </div>
          </div>
        </div>
      </header>
      ${Template.GenerateRoundHtml(combatant, numberOfRounds)}      
    </div>
  </div>
  `;
  }
  private static GenerateRoundHtml(
    combatant: EncounterCombatant,
    numberOfRounds: number
  ) {
    let markup = ``;
    for (let index = 0; index < numberOfRounds; index++) {
      const round = index + 1;
      markup =
        markup +
        `
    <div class="fvtt-enc-stats_title3">${Trans.Get(
      "template.round"
    )} ${round}</div>
    <section class="fvtt-enc-stats_combatants_data">
      <section class="fvtt-enc-stats_combatants_data_section fvtt-enc-stats_combatants_data_section-health">
        <div class="flexcol">
          <ol class="items-list flexcol">
            <li class="items-header flexrow">
              <div class="item-name">${Trans.Get("template.kills")}</div>
            </li>
            <ol class="item-list">
              ${combatant.kills
                .filter((f) => {
                  return f.round === round;
                })
                .map(function (kill) {
                  return Template.GenerateKillRow(kill);
                })
                .join("")}
                    
            </ol>
          </ol>
          <ol class="items-list flexcol">
            <li class="items-header flexrow">
              <div class="item-name">${Trans.Get("template.rounddmg")}</div>
            </li>
            <ol class="item-list">
              ${combatant.roundSummary.totals
                .filter((f) => {
                  return f.round === round;
                })
                .map(function (event) {
                  return Template.GenerateRoundRow(event);
                })
                .join("")}
            </ol>
          </ol>
          <ol class="items-list flexcol">
            <li class="items-header flexrow">
              <div class="item-name">${Trans.Get("template.health")}</div>
            </li>
            <ol class="item-list">
              ${combatant.health
                .filter((f) => {
                  return f.round === round;
                })
                .map(function (event) {
                  return Template.GenerateHealtRow(event);
                })
                .join("")}
                    
            </ol>
          </ol>
        </div>
      </section>
      <section class="fvtt-enc-stats_combatants_data_section fvtt-enc-stats_combatants_data_section-attacks">
        <div class="flexcol">
          <ol class="items-list flexcol">
            <li class="items-header flexrow">
              <div class="item-name item-weapon">${Trans.Get(
                "template.weapon_spell_name"
              )}</div>
              <div class="item-name">${Trans.Get("template.type")}</div>
              <div class="item-name">${Trans.Get("template.rolltype")}</div>
              <div class="item-name">${Trans.Get("template.attack_total")}</div>
              <div class="item-name">${Trans.Get("template.damage_total")}</div>
              <div class="item-name">${Trans.Get(
                "template.damageMultipleEnemiesTotal"
              )}</div>
            </li>
            <ol class="item-list">
              ${combatant.events
                .filter((f) => {
                  return f.round === round;
                })
                .map(function (event) {
                  return Template.GenerateAttackRow(event);
                })
                .join("")}
                    
            </ol>
          </ol>
        </div>
      </section>
    </section>`;
    }

    return markup;
  }

  private static GenerateAttackRow(combatantEvent: CombatantEvent) {
    return `
  <li class="item flexrow">
    <div class="item-name item-weapon">${
      combatantEvent.item.link
        ? combatantEvent.item.link
        : combatantEvent.item.name
    }</div>
    <div class="item-name">${Template.getAttackTypeFAIcon(
      combatantEvent.actionType
    )}</div>
    <div class="item-name">${
      combatantEvent.advantage
        ? "advantage"
        : combatantEvent.disadvantage
        ? "disadvantage"
        : "normal"
    }</div>
    <div class="item-name">${combatantEvent.attackTotal} ${
      combatantEvent.isCritical ? " (c)" : ""
    }</div>
    <div class="item-name ${Template.getHealOrDamageClass(
      combatantEvent.actionType
    )}">${combatantEvent.damageTotal}</div>
  <div class="item-name ${Template.getHealOrDamageClass(
    combatantEvent.actionType
  )}">${
      combatantEvent.damageMultipleEnemiesTotal ?? combatantEvent.damageTotal
    }</div>
  </li>`;
  }

  private static async getHealOrDamageClass(attackType: string) {
    const stat = new Stat();
    stat.encounter = await StatManager.GetStat();
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

  private static GenerateKillRow(kill: CombatantKills) {
    return `
  <li class="item flexrow">
    <div class="item-name">${kill.tokenName}</div>
  </li>`;
  }

  private static GenerateHealtRow(event: CombatantHealthData) {
    return `
  <li class="item flexrow">
    <div class="item-name">${event.current} (${event.isheal ? "+" : "-"}${
      event.diff
    })</div>
  </li>`;
  }

  private static GenerateRoundRow(combatantEvent: CombatantEvent) {
    return `
  <li class="item flexrow">
    <div class="item-name">${combatantEvent.damageTotal}</div>
  </li>`;
  }
}
