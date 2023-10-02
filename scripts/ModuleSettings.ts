import {
  MODULE_ID,
  OPT_ENABLE,
  OPT_ENABLE_EXPORT_JSON,
  OPT_SETTINGS_DICE_STREAK_ENABLE,
  OPT_SETTINGS_DICE_STREAK_THRESHOLD,
  OPT_SETTINGS_DICE_STREAK_TO_CHAT_ENABLE,
} from "./Settings";
import Trans from "./Helpers/Trans";
import { CampaignStatsPanel, CampaignTrackingPanel } from "./panels";

class ModuleSettings {
  /**
   * Register all module settings
   * @public
   * @return {void}
   */
  static Register(): void {
    game.settings.register(`${MODULE_ID}`, `${OPT_ENABLE}`, {
      name: Trans.Get("opt_enable_name"),
      hint: Trans.Get("opt_enable_hint"),
      scope: "world",
      config: true,
      default: true,
      type: Boolean,
    });

    game.settings.register(`${MODULE_ID}`, `${OPT_ENABLE_EXPORT_JSON}`, {
      name: Trans.Get("opt_enable_export_json_name"),
      hint: Trans.Get("opt_enable_export_json_hint"),
      scope: "world",
      config: true,
      default: true,
      type: Boolean,
    });

    game.settings.registerMenu(`${MODULE_ID}`, `CampaignStatsPanel`, {
      name: Trans.Get("Settings.StatisticsManagement"),
      label: Trans.Get("Settings.Configure"),
      icon: "fas fa-cog",
      scope: "world",
      type: CampaignStatsPanel,
      restricted: true,
    });

    game.settings.registerMenu(`${MODULE_ID}`, `CampaignTrackingPanel`, {
      name: Trans.Get("Settings.CampaignTrackingOptions"),
      label: Trans.Get("Settings.Configure"),
      icon: "fas fa-cog",
      scope: "world",
      type: CampaignTrackingPanel,
      restricted: true,
    });

    game.settings.register(
      `${MODULE_ID}`,
      `${OPT_SETTINGS_DICE_STREAK_ENABLE}`,
      {
        name: Trans.Get("opt_enable_dice_streak_name"),
        hint: Trans.Get("opt_enable_dice_streak_hint"),
        scope: "world",
        config: false,
        default: true,
        type: Boolean,
      },
    );

    game.settings.register(
      `${MODULE_ID}`,
      `${OPT_SETTINGS_DICE_STREAK_TO_CHAT_ENABLE}`,
      {
        name: Trans.Get("opt_enable_dice_streak_to_chat_name"),
        hint: Trans.Get("opt_enable_dice_streak_to_chat_hint"),
        scope: "world",
        config: false,
        default: true,
        type: Boolean,
      },
    );

    game.settings.register(
      `${MODULE_ID}`,
      `${OPT_SETTINGS_DICE_STREAK_THRESHOLD}`,
      {
        name: Trans.Get("opt_enable_dice_streak_threshold_name"),
        hint: Trans.Get("opt_enable_dice_streak_threshold_hint"),
        scope: "world",
        config: false,
        default: "2",
        type: String,
      },
    );
  }
}

export default ModuleSettings;
