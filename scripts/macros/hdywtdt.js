if (!actor) actor = character;
if (!actor) return;
let dialogContent = `Track ${token.actor.name} has got the HDYWTDT stat!`;
let d = new Dialog(
  {
    title: `${token.actor.name} HDYWTDT Trigger`,
    content: dialogContent,
    buttons: {
      hdywtdt: {
        icon: '<i class="fas fa-skull"></i>',
        label: "Track",
        callback: (html) => {
          Hooks.callAll(`encounter-stats.customEvent`, {
            EventName: "HDYWTDT",
            actorId: actor.id,
            FlavorText: "How do you want to do this?",
          });
        },
      },
    },
    close: (html) => {
      return;
    },
  },
  { height: "auto", id: "hdywtdt-dialog" }
).render(true);
