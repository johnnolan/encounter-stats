import {
  MODULE_ID,
  OPT_ENABLE,
  OPT_ENABLE_AOE_DAMAGE,
  OPT_REPORT_BUG,
  OPT_ENABLE_JOURNAL_NOTIFICATION,
  OPT_TOGGLE_CAMPAIGN_TRACKING,
  OPT_ENABLE_SIMPLE_CALENDAR_INTEGRATION,
} from "./Settings";
import { ConfigPanel } from "./panels/ConfigPanel";

class ModuleSettings {
  /**
   * Register all module settings
   * @public
   * @return {void}
   */
  static Register(): void {
    game.settings.register(`${MODULE_ID}`, `${OPT_ENABLE}`, {
      name: game.i18n.format("EncounterStats.opt_enable_name"),
      hint: game.i18n.format("EncounterStats.opt_enable_hint"),
      scope: "world",
      config: true,
      default: true,
      type: Boolean,
    });
    game.settings.register(`${MODULE_ID}`, `${OPT_ENABLE_AOE_DAMAGE}`, {
      name: game.i18n.format("EncounterStats.enable_aoe_damage_name"),
      hint: game.i18n.format("EncounterStats.enable_aoe_damage_hint"),
      scope: "world",
      config: true,
      default: false,
      type: Boolean,
      onChange: () => window.location.reload(),
    });
    game.settings.registerMenu(`${MODULE_ID}`, `${OPT_REPORT_BUG}`, {
      name: game.i18n.format("EncounterStats.config.debug"),
      label: game.i18n.format("EncounterStats.config.debug"),
      icon: "fas fa-bug",
      scope: "world",
      type: ConfigPanel,
      restricted: true,
    });
    game.settings.register(`${MODULE_ID}`, `${OPT_ENABLE_JOURNAL_NOTIFICATION}`, {
      name: game.i18n.format("EncounterStats.opt_notification_created_name"),
      scope: "world",
      config: true,
      default: false,
      type: Boolean,
    });
    game.settings.register(`${MODULE_ID}`, `${OPT_TOGGLE_CAMPAIGN_TRACKING}`, {
      name: game.i18n.format(
        "EncounterStats.opt_toggle_campaign_tracking_name"
      ),
      hint: game.i18n.format(
        "EncounterStats.opt_toggle_campaign_tracking_hint"
      ),
      scope: "world",
      config: true,
      default: true,
      type: Boolean,
    });
    game.settings.register(
      `${MODULE_ID}`,
      `${OPT_ENABLE_SIMPLE_CALENDAR_INTEGRATION}`,
      {
        name: game.i18n.format(
          "EncounterStats.opt_enable_simple_calendar_integration_name"
        ),
        hint: game.i18n.format(
          "EncounterStats.opt_enable_simple_calendar_integration_hint"
        ),
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
      }
    );
  }
}

export default ModuleSettings;
