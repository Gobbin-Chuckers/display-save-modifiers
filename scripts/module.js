Hooks.on("renderActorSheet", (app) => {
  const actor = app.actor;

  if (actor?.type !== "character") return;

  console.log("[TEST] Character sheet rendered:", actor.name);

  
});