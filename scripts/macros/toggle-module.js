const isEnabled = game.settings.get("encounter-stats", "enable");

if (!isEnabled) {
  game.settings.set("encounter-stats", "enable", true);
  this.update({ img: "icons/svg/d20-highlight.svg" });
  ui.notifications.notify(`Encounter Statistics enabled.`);
} else {
  game.settings.set("encounter-stats", "enable", false);
  this.update({ img: "icons/svg/d20.svg" });
  ui.notifications.notify(`Encounter Statistics disabled.`);
}
