if (!actor) actor = character;
if (!actor) return;
const form = `<form>
  <label>${token.actor.name} Said <input name="expletive" type="string"/></label>
</form>`;

function handleSubmit(html) {
  const formElement = html[0].querySelector("form");
  const formData = new FormDataExtended(formElement);
  const formDataObject = formData.toObject();

  Hooks.callAll(`encounter-stats.customEvent`, {
    EventName: "Expletive",
    actorId: token.actor.id,
    FlavorText: formDataObject.expletive,
  });
}

new Dialog(
  {
    title: `${token.actor.name} said a bad word`,
    content: form,
    buttons: {
      submit: { label: "Submit", callback: handleSubmit },
      cancel: { label: "Cancel" },
    },
  },
  { height: "auto", id: "expletive-dialog" }
).render(true);
