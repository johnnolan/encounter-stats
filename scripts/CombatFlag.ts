import Logger from "./Helpers/Logger";

export default class CombatFlag {
  static async IsSet(item: string): boolean {
    return (
      (await game.combats
        .find((f) => f.active)
        .getFlag("encounter-stats", item)) !== undefined
    );
  }

  static async Get(item: string): Promise<Encounter | undefined> {
    const flagValue = await game.combats
      .find((f) => f.active)
      .getFlag("encounter-stats", item);
    Logger.debug(
      "FLag Value",
      "localstorage.GetItemFromLocalStorage",
      flagValue
    );
    console.debug("blah", flagValue, game.combats.find((f) => f.active).id);
    console.debug("blah", flagValue, game.combats.find((f) => f.active).flags);
    console.debug("blah", flagValue);
    return flagValue;
  }

  static async Save(flagName: string, data: Encounter) {
    await game.combats
      .find((f) => f.active)
      .setFlag("encounter-stats", flagName, data);
  }

  static Remove() {
    //localStorage.removeItem(STORAGE_NAME);
  }
}
