import {
  MODULE_ID,
  OPT_ENABLE,
  OPT_REPORT_BUG,
  OPT_ENABLE_SIMPLE_CALENDAR_INTEGRATION,
} from "./Settings";
import { ConfigPanel } from "./panels/ConfigPanel";
import Trans from "./Trans";

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
    game.settings.registerMenu(`${MODULE_ID}`, `${OPT_REPORT_BUG}`, {
      name: Trans.Get("config.debug"),
      label: Trans.Get("config.debug"),
      icon: "fas fa-bug",
      scope: "world",
      type: ConfigPanel,
      restricted: true,
    });
    game.settings.register(
      `${MODULE_ID}`,
      `${OPT_ENABLE_SIMPLE_CALENDAR_INTEGRATION}`,
      {
        name: Trans.Get("opt_enable_simple_calendar_integration_name"),
        hint: Trans.Get("opt_enable_simple_calendar_integration_hint"),
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
      }
    );
  }
}

export default ModuleSettings;
