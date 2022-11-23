import SetupHooksDND5e from "./SetupHooksDND5e";
import SetupHooksPF2e from "./SetupHooksPF2e";

export default class SetupHooks {
  static SOCKET_NAME = "module.encounter-stats";

  static async Setup() {
    if (game.system.id === "dnd5e") {
      SetupHooksDND5e.Setup();
    } else if (game.system.id === "pf2e") {
      SetupHooksPF2e.Setup();
    }
  }
}
