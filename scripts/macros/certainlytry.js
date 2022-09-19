const form = `GM said you can certainly try`;

function handleSubmit(html) {
  Hooks.callAll(`encounter-stats.customEvent`, {
    EventName: "You can certainly try",
    FlavorText: "Said it!",
  });
}

new Dialog(
  {
    title: `GM said you can certainly try`,
    content: form,
    buttons: {
      submit: { label: "Submit", callback: handleSubmit },
      cancel: { label: "Cancel" },
    },
  },
  { height: "auto", id: "certainly-try-dialog" }
).render(true);
