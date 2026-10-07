Hooks.on("renderActorSheet", (app, html) => {
    const actor = app.actor;

    if (actor?.type !== "character") return;

    const reflexLabel = html[0].querySelector(
        '.saves li.roll-data[data-save="reflex"] .sidebar_label'
    );

    if (!reflexLabel || reflexLabel.querySelector(".my-button")) return;

    const myButton = document.createElement("button");
    myButton.type = "button";
    myButton.className = "my-button";
    myButton.setAttribute("aria-label", "Show Reflex save modifiers");
    myButton.innerHTML = '<i class="fa-solid fa-eye"></i>';

    reflexLabel.appendChild(myButton);

});