export default class CombatFlag {
  static async IsSet(item: string): boolean {
    const combat = await game.combats.find((f) => f.active);

    if (!combat) return false;

    return combat.getFlag("encounter-stats", item) !== undefined;
  }

  static async Get(
    item: string,
    actorId?: string
  ): Promise<Encounter | undefined> {
    if (!(await CombatFlag.IsSet(item))) return;

    let flagValue = await game.combats
      .find((f) => f.active)
      .getFlag("encounter-stats", item);

    // if actorId is passed
    if (actorId) {
      // Check current encounter has them
      if (!flagValue.combatants.find((h) => h.id === actorId)) {
        // If not, search the first encounter that has them
        const flagValueSearchAcrossCombats = await game.combats.find((f) =>
          f
            .getFlag("encounter-stats", item)
            .combatants.find((h) => h.id === actorId)
        );
        if (!flagValueSearchAcrossCombats) return;

        flagValue = flagValueSearchAcrossCombats.getFlag(
          "encounter-stats",
          item
        );
        // If not undefined, return that combat
      }
    }

    return flagValue;
  }

  static async Save(flagName: string, data: Encounter) {
    await game.combats
      .find((f) => f.id === data.encounterId)
      .setFlag("encounter-stats", flagName, data);
  }
}
