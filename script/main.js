const mapDiv = document.getElementById('map-div');
const checksDiv = document.getElementById('checks-div');
const controlsDiv = document.getElementById('controls-div');
const ntscButtonId = "ntsc-span";
const palButtonId = "pal-span";

const separatorBasePercentOffsetFromLeft = 50.7; // Constant determined by the image used for the map background

let currentGameVersion = undefined;
let enableAltDisplay = false;

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


function createControlButton(id, subClassName, hoverText, color, image, onclick) {
    return createButtonForMap(id, `control-button ${subClassName}`, hoverText, color, image, undefined, undefined, onclick);
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

function getHorizontalOffset(baseLocation) {
    const basePercentOffsetFromLeft = Number.parseFloat(baseLocation);

    let offset = basePercentOffsetFromLeft
    let separatorOffset = separatorBasePercentOffsetFromLeft;
    if (enableAltDisplay) {
        offset = getAltDisplayOffset(basePercentOffsetFromLeft, separatorBasePercentOffsetFromLeft)
        separatorOffset = 100 - separatorBasePercentOffsetFromLeft;
    }

    if (currentGameVersion === GameVersion.PAL) {
        offset = getPalMirrorOffset(offset, separatorOffset);
    }
    
    return offset + "%";
}

function getAltDisplayOffset(percentOffsetFromLeft, separatorPercentOffsetFromLeft) {
    const isRightOfSeparator = percentOffsetFromLeft > separatorPercentOffsetFromLeft;
    const altOffset = isRightOfSeparator
        ? percentOffsetFromLeft - separatorPercentOffsetFromLeft
        : percentOffsetFromLeft + (100 - separatorPercentOffsetFromLeft);
    return altOffset;
}

function getPalMirrorOffset(percentOffsetFromLeft, separatorPercentOffsetFromLeft) {
    const isLeftOfSeparator = percentOffsetFromLeft < separatorPercentOffsetFromLeft;
    const leftExtent = isLeftOfSeparator
        ? 0
        : separatorPercentOffsetFromLeft;
    const rightExtent = isLeftOfSeparator
        ? separatorPercentOffsetFromLeft
        : 100; // TODO: make this 0...1 range

    const mirroredPercentOffset = leftExtent + (rightExtent - percentOffsetFromLeft)
    return mirroredPercentOffset;
}

function updateButtonLocations() {
    const checkButtons = document.getElementsByClassName("check");
    for (i = 0; i < checkButtons.length; i++) {
        const checkIndex = checkButtons[i].id.replaceAll(`check-`, '');
        checkButtons[i].style.left = getHorizontalOffset(checks[checkIndex].x);
    }
}

function toggleAltDisplay() {
    if (enableAltDisplay) { // undo current alt display effects
        mapDiv.classList.remove("alt");
    } else {
        mapDiv.classList.add("alt")
    }
    enableAltDisplay = !enableAltDisplay;

    updateButtonLocations();
}

function toggleNTSC() {
    currentGameVersion = GameVersion.NTSC;
    mapDiv.classList.remove("pal");
    mapDiv.classList.add("ntsc");

    const ntscButton = document.getElementById(ntscButtonId);
    const palButton = document.getElementById(palButtonId);
    ntscButton.className += ` invisible`;
    palButton.className = palButton.className.replaceAll(`invisible`, ``);

    updateButtonLocations();
}

function togglePAL() {
    currentGameVersion = GameVersion.PAL;
    mapDiv.classList.remove("ntsc");
    mapDiv.classList.add("pal");

    const ntscButton = document.getElementById(ntscButtonId);
    const palButton = document.getElementById(palButtonId);
    palButton.className += ` invisible`;
    ntscButton.className = ntscButton.className.replaceAll(`invisible`, ``);

    updateButtonLocations();
}

function setVersion(version) {
    if (version === GameVersion.NTSC) {
        toggleNTSC();
    } else {
        togglePAL();
    }
}

function toggleVersion() {
    if (!currentGameVersion) {
        setVersion(defaultGameVersion);
        currentGameVersion = defaultGameVersion;
    } else {
        if (currentGameVersion === GameVersion.NTSC) {
            togglePAL();
        } else {
            toggleNTSC();
        }
    }
}

function initializeChecks() {
    for (let i = 0; i < checks.length; i++) {
        checks[i].state = CheckState.Available;
    }
}

function initializeControlButtons() {
    const saveButton = createControlButton("save-span", "save", "Save", "black", "url(images/save.png)", new Function('saveChecks()'));
    const loadButton = createControlButton("load-span", "load", "Load", "black", "url(images/load.png)", new Function('loadChecks()'));

    /** Buttons change the mode, but the displayed image should match the current mode */
    const ntscImageUrl = "url(images/ntsc.png)"
    const palImageUrl = "url(images/pal.png)";
    const ntscButton = createControlButton(ntscButtonId, "version", "Game Version", "black", palImageUrl, new Function('toggleVersion()'));
    const palButton = createControlButton(palButtonId, "version", "Game Version", "black", ntscImageUrl, new Function('toggleVersion()'));

    const altDisplayButton = createControlButton("alt-display-span", "altDisplay", "Alt Display", "black", "url(images/alt.png)", new Function('toggleAltDisplay()'));

    controlsDiv.appendChild(saveButton);
    controlsDiv.appendChild(loadButton);
    controlsDiv.appendChild(ntscButton);
    controlsDiv.appendChild(palButton);
    controlsDiv.appendChild(altDisplayButton);
}

// Initialize all checks on the map
function initializeMap() {
    for (k = 0; k < checks.length; k++) {
        const stateClassName = getClassNameFromState(checks[k].state);
        const className = `mapspan check ${stateClassName}`;
        const checkButton = createButtonForMap(getCheckId(k), className, checks[k].name, "black", 'url(images/poi.png)', getHorizontalOffset(checks[k].x), checks[k].y, new Function(`toggleCheck("${k}")`));
        checksDiv.appendChild(checkButton);
    }
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
    initializeChecks();
    initializeMap();
    initializeControlButtons();
    setVersion(defaultGameVersion);
    document.addEventListener('keydown', (e) => this.handleKeydown(e));
}