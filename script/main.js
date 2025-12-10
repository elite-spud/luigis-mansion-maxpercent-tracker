
var mouseOverItem = false;
var mouseLastOverR;
var mouseLastOverC;
var mouseLastOverCor;

var itemGrid = [];
var itemLayout = [];

var editmode = false;
var selected = {};

function setCookie(obj) {
    var d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    var val = JSON.stringify(obj);
    document.cookie = "key=" + val + ";" + expires + ";path=/";
}

function getCookie() {
    var name = "key=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return JSON.parse(c.substring(name.length, c.length));
        }
    }
    return {};
}

var cookieDefault = {
    map: 1,
    iZoom: 100,
    mZoom: 100,
    mPos: 0,
    chests: serializeChests(),
}

var cookielock = false;
function loadCookie() {
    if (cookielock) {
        return;
    }

    cookielock = true;

    cookieobj = getCookie();

    Object.keys(cookieDefault).forEach(function(key) {
        if (cookieobj[key] === undefined) {
            cookieobj[key] = cookieDefault[key];
        }
    });
    deserializeChests(JSON.parse(JSON.stringify(cookieobj.chests)));

    cookielock = false;
}

function saveCookie() {
    if (cookielock) {
        return;
    }

    cookielock = true;

    cookieobj = {};


    cookieobj.chests = JSON.parse(JSON.stringify(serializeChests()));

    setCookie(cookieobj);

    cookielock = false;
}

function serializeChests() {
    return chests.map(chest => chest.isCollected || true);
}

function deserializeChests(serializedChests) {
    for (var i = 0; i < chests.length; i++) {
		    chests[i].state = chestState;
        chests[i].isCollected = true;
        refreshChest(i);
    }
}

function getChestId(chestIndex) {
    return `chest-${chestIndex}`;
}

// Event of clicking a chest on the map
function toggleChest(chestIndex) {
    // TODO: allow retoggling of green spots
	if (chests[chestIndex].state != 4 && chests[chestIndex].state != 3){
		chests[chestIndex].state += 1;
	}
	var maxStates = 0;
	if (mode == 0)
		maxStates = 1;
	if (mode == 1)
		maxStates = 2;
	if(chests[chestIndex].state != 4)
		if (chests[chestIndex].state > maxStates)
			chests[chestIndex].state = 0;
	
    refreshChest(chestIndex);
    saveCookie();
}

function saveChests(){
	for (var i = 0; i < chests.length; i++){
		if (chests[i].state == 1){
			chests[i].state = 4;
		}
		refreshChest(i);
	}
}

function loadChests(){
	for (var i = 0; i < chests.length; i++){
		if (chests[i].state == 1){
			chests[i].state = 0;
		}
		refreshChest(i);
	}
}

function refreshChest(chestIndex) {
    var stateClass = chests[chestIndex].isAvailable() ? 'available' : chests[chestIndex].isAvailable();
	switch (chests[chestIndex].state)
	{
		case order[0]:
			stateClass = 'available';
			break;
		case order[1]:
			stateClass = 'collected';
			break;
		case order[2]:
			stateClass = 'possible';
			break;
		case 4:
			stateClass = 'saved';
			break;
	}
    const chestId = getChestId(chestIndex);
    document.getElementById(chestId).className = 'mapspan chest ' + stateClass;
}

const highlightedUrl = `url("images/highlighted.png")`;
// Highlights a chest location
function highlight(elementId) {
    const currentBackgroundImage = document.getElementById(elementId).style.backgroundImage;
    document.getElementById(elementId).style.backgroundImage = `${highlightedUrl}, ` + currentBackgroundImage;
}

function unhighlight(elementId) {
    const currentBackgroundImage = document.getElementById(elementId).style.backgroundImage;
    const backgroundImageWithoutHighlight = currentBackgroundImage.replaceAll(`${highlightedUrl}, `, ``);
    document.getElementById(elementId).style.backgroundImage = backgroundImageWithoutHighlight;
}

function setOrder(H) {
    if (H) {
        document.getElementById('layoutdiv').classList.remove('flexcontainer');
    } else {
        document.getElementById('layoutdiv').classList.add('flexcontainer');
    }
    saveCookie();
}

// function setZoom(target, sender) {
//     document.getElementById(target).style.zoom = sender.value / 100;
//     document.getElementById(target).style.zoom = sender.value / 100;

//     document.getElementById(target).style.MozTransform = 'scale(' + (sender.value / 100) + ')';
//     document.getElementById(target).style.MozTransformOrigin = '0 0';

//     document.getElementById(target + 'size').innerHTML = (sender.value) + '%';
//     saveCookie();
// }

function showSettings(sender) {
    if (editmode) {
        var r, c;
        var startdraw = false;

        editmode = false;
        updateGridItemAll();
        showTracker('mapdiv', document.getElementsByName('showmap')[0]);
        document.getElementById('itemconfig').style.display = 'none';
        document.getElementById('rowButtons').style.display = 'none';
        sender.innerHTML = '🔧';
        saveCookie();
    } else {
        var x = document.getElementById('settings');
        if (!x.style.display || x.style.display == 'none') {
            x.style.display = 'initial';
            sender.innerHTML = 'X';
        } else {
            x.style.display = 'none';
            sender.innerHTML = '🔧';
        }
    }
}

function showTracker(target, sender) {
    if (sender.checked) {
        document.getElementById(target).style.display = '';
    }
    else {
        document.getElementById(target).style.display = 'none';
    }
}


function EditMode() {
    var r, c;

    editmode = true;
    updateGridItemAll();
    showTracker('mapdiv', {checked: false});
    document.getElementById('settings').style.display = 'none';
    document.getElementById('itemconfig').style.display = '';
    document.getElementById('rowButtons').style.display = 'flex';

    document.getElementById('settingsbutton').innerHTML = 'Exit Edit Mode';
}

function setMOver(row, col,corner) {
    //keep track of what item you moused over.
    mouseLastOverCor = corner;
    mouseLastOverR = row;
    mouseLastOverC = col;
    mouseOverItem = true;

}

function setMOff() {
    mouseOverItem = false;
}

function updateMap() {
    for (k = 0; k < chests.length; k++) {
        if (!chests[k].isCollected) {
            const chestId = getChestId(chestIndex);
            document.getElementById(chestId).className = 'mapspan chest ' + chests[k].isAvailable();
        }
    }
}

function createControlButton(id, hoverText, color, image, left, top, onclick) {
    return createButtonForMap(id, "button", hoverText, color, image, left, top, onclick)
}

function createButtonForMap(id, className, hoverText, color, image, left, top, onclick) {
    var span = document.createElement('span');
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
    var mapdiv = document.getElementById('mapdiv');

    // Initialize all chests on the map
    for (k = 0; k < chests.length; k++) {
        const className = chests[k].isCollected
            ? "mapspan chest collected"
            : "mapspan chest " + chests[k].isAvailable();
        const chestButton = createButtonForMap(getChestId(k), className, chests[k].name, "black", 'url(images/poi.png)', getMapLocation(chests[k].x), getMapLocation(chests[k].y), new Function(`toggleChest("${k}")`));
        mapdiv.appendChild(chestButton);
    }

    const controlButton1LocationLeft = "97.0%";
    const controlButton2LocationLeft = "92.0%";
    const controlButton3LocationLeft = "87.0%";
    const controlButton4LocationLeft = "82.0%";
    const controlButtonLocationTop = "95.0%";

	const saveButton = createControlButton("save-span", "Save", "black", "url(images/save.png)", controlButton1LocationLeft, controlButtonLocationTop, new Function('saveChests()'));
	const loadButton = createControlButton("load-span", "Load", "black", "url(images/load.png)", controlButton2LocationLeft, controlButtonLocationTop, new Function('loadChests()'));
	const ntscButton = createControlButton("ntsc-span", "NTSC Mode", "black", "url(images/ntsc.png)", controlButton3LocationLeft, controlButtonLocationTop, new Function('toggleVersion()'));
	const palButton = createControlButton("pal-span", "PAL Mode", "black", "url(images/pal.png)", controlButton3LocationLeft, "95.0%", new Function('toggleVersion()'));
	const altDisplayButton = createControlButton("alt-display-span", "Alt Display", "black", "url(images/alt.png)", controlButton4LocationLeft, "95.0%", new Function('toggleAltDisplay()'));

    mapdiv.appendChild(saveButton);
    mapdiv.appendChild(loadButton);
    mapdiv.appendChild(ntscButton);
    mapdiv.appendChild(palButton);
    mapdiv.appendChild(altDisplayButton);
}

function handleKeys(e){
	var mapdiv = document.getElementById('mapdiv');
	var key = e.keyCode;
	switch (key)
	{
		case 27:
			loadChests();
			break;
		case 32:
			saveChests();
			break;
	}
}

function init() {
    populateMapdiv();
    loadCookie();
    saveCookie();
	document.addEventListener('keydown', this.handleKeys, false);
}



function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            if (oldonload) {
                oldonload();
            }
            func();
        }
    }
}
