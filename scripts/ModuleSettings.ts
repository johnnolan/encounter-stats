import { MODULE_ID, OPT_ENABLE } from "./Settings";
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
  }
}

export default ModuleSettings;
