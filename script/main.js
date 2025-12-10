function getCheckId(checkIndex) {
    return `check-${checkIndex}`;
}

// Event of clicking a check on the map
function toggleCheck(checkIndex) {
	// Do not allow toggling checks with saved states beyond the maxToggleableState
    // TODO: allow retoggling of saved checks with a new control button
	if (checks[checkIndex].state > maxToggleableState) {
		return;
	}

	// State is at last option in order
	if (checks[checkIndex].state === maxToggleableState) {
		checks[checkIndex].state = minToggleableState;
	} else {
		checks[checkIndex].state++;
	}

	refreshCheck(checkIndex);
}

function saveChecks(){
	for (let i = 0; i < checks.length; i++){
		if (checks[i].state === CheckState.Collected){
			checks[i].state = CheckState.Saved;
		}
		refreshCheck(i);
	}
}

function loadChecks(){
	for (let i = 0; i < checks.length; i++){
		if (checks[i].state == 1){
			checks[i].state = defaultCheckState;
		}
		refreshCheck(i);
	}
}

function getClassNameFromState(checkState) {
	switch (checkState) {
		case CheckState.Available:
			return 'available';
		case CheckState.Collected:
			return 'collected';
		case CheckState.Possible:
			return 'possible';
		case CheckState.Saved:
			return 'saved';
	}

	throw new Error(`checkState: ${checkState} not recognized as valid checkState`);
}

function refreshCheck(checkIndex) {
    const stateClass = getClassNameFromState(checks[checkIndex].state);
    const checkId = getCheckId(checkIndex);
    document.getElementById(checkId).className = 'mapspan check ' + stateClass;
}

const highlightedUrl = `url("images/highlighted.png")`;
function highlight(elementId) {
    const currentBackgroundImage = document.getElementById(elementId).style.backgroundImage;
    document.getElementById(elementId).style.backgroundImage = `${highlightedUrl}, ` + currentBackgroundImage;
}

function unhighlight(elementId) {
    const currentBackgroundImage = document.getElementById(elementId).style.backgroundImage;
    const backgroundImageWithoutHighlight = currentBackgroundImage.replaceAll(`${highlightedUrl}, `, ``);
    document.getElementById(elementId).style.backgroundImage = backgroundImageWithoutHighlight;
}


function createControlButton(id, hoverText, color, image, left, top, onclick) {
    return createButtonForMap(id, "button", hoverText, color, image, left, top, onclick)
}

function createButtonForMap(id, className, hoverText, color, image, left, top, onclick) {
    const span = document.createElement('span');
	span.style.backgroundImage = image;
	span.style.color = color;
	span.id = id;
	span.onclick = onclick;
	span.onmouseover = new Function(`highlight("${id}")`);
    span.onmouseout = new Function(`unhighlight("${id}")`);
    span.style.left = left;
	span.style.top = top;
	span.className = className;
	childSpan = document.createElement('span');
	childSpan.className = 'tooltip';
	childSpan.innerHTML = hoverText;
	span.appendChild(childSpan);
    return span;
}

function getMapLocation(baseLocation, isPal, isAlt) {
    return isPal
        ? (100 - Number.parseFloat(baseLocation)) + "%"
        : baseLocation;
}

function populateMapdiv() {
    const mapdiv = document.getElementById('mapdiv');

    // Initialize all checks on the map
    for (k = 0; k < checks.length; k++) {
		const stateClassName = getClassNameFromState(checks[k].state);
		const className = `mapspan check ${stateClassName}`;
        const checkButton = createButtonForMap(getCheckId(k), className, checks[k].name, "black", 'url(images/poi.png)', getMapLocation(checks[k].x), getMapLocation(checks[k].y), new Function(`toggleCheck("${k}")`));
        mapdiv.appendChild(checkButton);
    }

    const controlButton1LocationLeft = "97.0%";
    const controlButton2LocationLeft = "92.0%";
    const controlButton3LocationLeft = "87.0%";
    const controlButton4LocationLeft = "82.0%";
    const controlButtonLocationTop = "95.0%";

	const saveButton = createControlButton("save-span", "Save", "black", "url(images/save.png)", controlButton1LocationLeft, controlButtonLocationTop, new Function('saveChecks()'));
	const loadButton = createControlButton("load-span", "Load", "black", "url(images/load.png)", controlButton2LocationLeft, controlButtonLocationTop, new Function('loadChecks()'));
	const ntscButton = createControlButton("ntsc-span", "NTSC Mode", "black", "url(images/ntsc.png)", controlButton3LocationLeft, controlButtonLocationTop, new Function('toggleVersion()'));
	const palButton = createControlButton("pal-span", "PAL Mode", "black", "url(images/pal.png)", controlButton3LocationLeft, "95.0%", new Function('toggleVersion()'));
	const altDisplayButton = createControlButton("alt-display-span", "Alt Display", "black", "url(images/alt.png)", controlButton4LocationLeft, "95.0%", new Function('toggleAltDisplay()'));

    mapdiv.appendChild(saveButton);
    mapdiv.appendChild(loadButton);
    mapdiv.appendChild(ntscButton);
    mapdiv.appendChild(palButton);
    mapdiv.appendChild(altDisplayButton);
}

function handleKeydown(e){
	const key = e.keyCode;
	switch (key)
	{
		case KeyCodes.LoadKey:
			loadChecks();
			break;
		case KeyCodes.SaveKey:
			saveChecks();
			break;
	}
}

function init() {
    populateMapdiv();
    loadChecks();
    document.addEventListener('keydown', (e) => this.handleKeydown(e));
}