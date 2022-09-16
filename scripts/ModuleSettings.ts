import { MODULE_ID, OPT_ENABLE, OPT_ENABLE_EXPORT_JSON } from "./Settings";
import Trans from "./Helpers/Trans";

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
  }
}

export default ModuleSettings;
