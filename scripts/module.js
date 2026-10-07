Hooks.on('renderActorSheet', (app, html) => {
	const actor = app.actor;

	if (actor?.type !== 'character') return;

	console.log(`[TEST] Character sheet rendered: ${actor.name}`, actor);

	console.log(getDegreeOfSuccessAdjustments(actor));

	const reflexLabel = html[0].querySelector(
		'.saves li.roll-data[data-save="reflex"] .sidebar_label'
	);

	if (!reflexLabel || reflexLabel.querySelector('.my-button')) return;

	const myButton = document.createElement('button');
	myButton.type = 'button';
	myButton.className = 'my-button';
	myButton.setAttribute('aria-label', 'Show Reflex save modifiers');
	myButton.innerHTML = '<i class="fa-solid fa-eye"></i>';

	reflexLabel.appendChild(myButton);
});

function getDegreeOfSuccessAdjustments(actor) {
	const degreeOfSuccessRules = actor.rules.filter(rule => rule?.key === 'AdjustDegreeOfSuccess' && ['will', 'fortitude', 'reflex'].includes(rule?.selector));
	console.log(degreeOfSuccessRules);
	return degreeOfSuccessRules.map(rule => {
		const degrees = mapDegreeOfSuccess(...(Object.entries(rule.adjustment)[0]))
		return {
			selector: rule.selector,
			label: rule.label,
			text: `${degrees.rolled} becomes ${degrees.becomes}`
		}
	});
}

function mapDegreeOfSuccess(key, value) {
	console.log(key, value)
	const degreesOfSuccess = [
		'critical failure',
		'failure',
		'success',
		'critical success'
	];

	let rolledIdx = -1;
	switch (key) {
		case 'criticalFailure':
			rolledIdx = 0;
			break;
		case 'failure':
			rolledIdx = 1;
			break;
		case 'success':
			rolledIdx = 2;
			break;
		case 'criticalSuccess':
			rolledIdx = 3;
			break;
	}

	let becomesIdx = -1;

	switch (value) {
		case 'one-degree-better':
			becomesIdx = rolledIdx + 1;
			break;
		case 'one-degree-worse':		// This is a guess
			becomesIdx = rolledIdx - 1;
			break;
		case 'to-critical-failure':
			becomesIdx = 0;
			break;
		case 'to-failure':
			becomesIdx = 1;
			break;
		case 'to-success':
			becomesIdx = 2;
			break;
		case 'to-critical-success':
			becomesIdx = 3;
			break;
	}

	if (rolledIdx === -1 || becomesIdx === -1) {
		throw new Error('invalid degree of success given');
	}
	
	return {
		rolled: degreesOfSuccess[rolledIdx],
		becomes: degreesOfSuccess[becomesIdx]
	};
}
