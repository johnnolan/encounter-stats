const form = `<form>
  <label>Food Consumed <input name="food" type="string"/></label>
</form>`;

function handleSubmit(html) {
  const formElement = html[0].querySelector('form');
  const formData = new FormDataExtended(formElement);
  const formDataObject = formData.toObject();

  Hooks.callAll(`encounter-stats.customEvent`, {
    EventName: "Food Consumed",
    FlavorText: formDataObject.food,
  });
}

new Dialog(
  {
    title: `Food has been consumed!`,
    content: form,
    buttons: {
      submit: { label: "Submit", callback: handleSubmit },
      cancel: { label: "Cancel" },
    },
  },
  { height: "auto", id: "food-consumed-dialog" }
).render(true);