
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

// Event of clicking a chest on the map
function toggleChest(x) {
	if (chests[x].state != 4 && chests[x].state != 3){
		chests[x].state += 1;
	}
	var maxStates = 0;
	if (mode == 0)
		maxStates = 1;
	if (mode == 1)
		maxStates = 2;
	if(chests[x].state != 4)
		if (chests[x].state > maxStates)
			chests[x].state = 0;
	
    refreshChest(x);
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

function refreshChest(x) {
    var stateClass = chests[x].isAvailable() ? 'available' : chests[x].isAvailable();
	switch (chests[x].state)
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
    document.getElementById(x).className = 'mapspan chest ' + stateClass;
}

// Highlights a chest location
function highlight(x) {
    document.getElementById(x).style.backgroundImage = 'url(images/highlighted.png)';
}

function highlightButton(x){
	document.getElementById(x).style.backgroundImage = 'url(images/highlighted.png)';
}

function unhighlight(x) {
    document.getElementById(x).style.backgroundImage = 'url(images/poi.png)';
}

function unhighlightSave(x){
	document.getElementById(x).style.backgroundImage = 'url(images/save.png)';
}

function unhighlightLoad(x){
	document.getElementById(x).style.backgroundImage = 'url(images/load.png)';
}

function setOrder(H) {
    if (H) {
        document.getElementById('layoutdiv').classList.remove('flexcontainer');
    } else {
        document.getElementById('layoutdiv').classList.add('flexcontainer');
    }
    saveCookie();
}

function setZoom(target, sender) {
    document.getElementById(target).style.zoom = sender.value / 100;
    document.getElementById(target).style.zoom = sender.value / 100;

    document.getElementById(target).style.MozTransform = 'scale(' + (sender.value / 100) + ')';
    document.getElementById(target).style.MozTransformOrigin = '0 0';

    document.getElementById(target + 'size').innerHTML = (sender.value) + '%';
    saveCookie();
}

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
        if (!chests[k].isCollected)
            document.getElementById(k).className = 'mapspan chest ' + chests[k].isAvailable();
    }
}

function populateMapdiv() {
    var mapdiv = document.getElementById('mapdiv');

    // Initialize all chests on the map
    for (k = 0; k < chests.length; k++) {
        var s = document.createElement('span');
        s.style.backgroundImage = 'url(images/poi.png)';
        s.style.color = 'black';
        s.id = k;
        s.onclick = new Function('toggleChest(' + k + ')');
        s.onmouseover = new Function('highlight(' + k + ')');
        s.onmouseout = new Function('unhighlight(' + k + ')');
        s.style.left = chests[k].x;
        s.style.top = chests[k].y;
        if (chests[k].isCollected) {
            s.className = 'mapspan chest collected';
        } else {
            s.className = 'mapspan chest ' + chests[k].isAvailable();
        }

        var ss = document.createElement('span');
        ss.className = 'tooltip';
        ss.innerHTML = chests[k].name;
        s.appendChild(ss);

        mapdiv.appendChild(s);
    }
	var saveSpan = document.createElement('span');
	saveSpan.style.backgroundImage = 'url(images/save.png)';
	saveSpan.style.color = 'black';
	saveSpan.id = 83;
	saveSpan.onclick = new Function('saveChests()');
	saveSpan.onmouseover = new Function('highlightButton(83)');
    saveSpan.onmouseout = new Function('unhighlightSave(83)');
	saveSpan.style.left = "92.0%";
	saveSpan.style.top = "95.0%";
	saveSpan.className = 'button';
	saveTooltipSpan = document.createElement('span');
	saveTooltipSpan.className = 'tooltip';
	saveTooltipSpan.innerHTML = 'Save';
	saveSpan.appendChild(saveTooltipSpan);
	mapdiv.appendChild(saveSpan);
	
	var loadSpan = document.createElement('span');
	loadSpan.style.backgroundImage = 'url(images/load.png)';
	loadSpan.style.color = 'black';
	loadSpan.id = 84;
	loadSpan.onclick = new Function('loadChests()');
	loadSpan.onmouseover = new Function('highlightButton(84)');
    loadSpan.onmouseout = new Function('unhighlightLoad(84)');
	loadSpan.style.left = "97.0%";
	loadSpan.style.top = "95.0%";
	loadSpan.className = 'button';
	loadToolTipSpan = document.createElement('span');
	loadToolTipSpan.className = 'tooltip';
	loadToolTipSpan.innerHTML = 'Load';
	loadSpan.appendChild(loadToolTipSpan);
	mapdiv.appendChild(loadSpan);
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
