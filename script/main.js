
function serializeChecks() {
    return checks.map(check => check.isCollected || true);
}

function deserializeChecks(serializedChecks) {
    for (let i = 0; i < checks.length; i++) {
		    checks[i].state = defaultCheckState;
        checks[i].isCollected = true;
        refreshCheck(i);
    }
}

function getCheckId(checkIndex) {
    return `check-${checkIndex}`;
}

// Event of clicking a check on the map
function toggleCheck(checkIndex) {
    // TODO: allow retoggling of green spots
	if (checks[checkIndex].state != 4 && checks[checkIndex].state != 3){
		checks[checkIndex].state += 1;
	}
	let maxStates = 0;
	if (mode == 0)
		maxStates = 1;
	if (mode == 1)
		maxStates = 2;
	if(checks[checkIndex].state != 4)
		if (checks[checkIndex].state > maxStates)
			checks[checkIndex].state = 0;
	
    refreshCheck(checkIndex);
}

function saveChecks(){
	for (let i = 0; i < checks.length; i++){
		if (checks[i].state == 1){
			checks[i].state = 4; // TODO: make state 4 toggleable
		}
		refreshCheck(i);
	}
}

function loadChecks(){
	for (let i = 0; i < checks.length; i++){
		if (checks[i].state == 1){
			checks[i].state = 0;
		}
		refreshCheck(i);
	}
}

function refreshCheck(checkIndex) {
    let stateClass = checks[checkIndex].isAvailable() ? 'available' : checks[checkIndex].isAvailable();
	switch (checks[checkIndex].state)
	{
		case checkStateOrder[0]:
			stateClass = 'available';
			break;
		case checkStateOrder[1]:
			stateClass = 'collected';
			break;
		case checkStateOrder[2]:
			stateClass = 'possible';
			break;
		case 4:
			stateClass = 'saved';
			break;
	}
    const checkId = getCheckId(checkIndex);
    document.getElementById(checkId).className = 'mapspan check ' + stateClass;
}

const highlightedUrl = `url("images/highlighted.png")`;
// Highlights a check location
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
        const className = checks[k].isCollected
            ? "mapspan check collected"
            : "mapspan check " + checks[k].isAvailable();
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
    console.log(e)
	const key = e.keyCode;
	switch (key)
	{
		case loadKey:
			loadChecks();
			break;
		case saveKey:
			saveChecks();
			break;
	}
}

function init() {
    populateMapdiv();
    deserializeChecks();
    document.addEventListener('keydown', (e) => this.handleKeydown(e));
}