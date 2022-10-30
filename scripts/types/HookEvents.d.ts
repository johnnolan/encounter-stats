interface HookRenderCombatTrackerData {
  user: User;
  combats: Array<Combat>;
  combatCount: number;
  hasCombat: boolean;
  combat: Combat;
}

interface HookCustomEvent {
  EventName: string;
  FlavorText: string;
  actorId?: string;
}

interface HookUpdateCombatRound {
  round: number;
  turn: number;
}
