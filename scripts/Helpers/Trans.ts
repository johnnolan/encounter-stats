class Trans {
  static Get(translationKey: string): string {
    return game.i18n.format(`EncounterStats.${translationKey}`);
  }
}

export default Trans;
