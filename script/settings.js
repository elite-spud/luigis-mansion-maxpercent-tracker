/*
	mode 0 flips between available, and collected.
	mode 1 flips between available, collected, and possibly collected.

	Default = 1
*/

const mode = 1;

/*
	defaultCheckState is the initial state of money spots when loading the money tracker.
	0 = available / gray
	1 = collected / yellow
	2 = possible / red
	4 = saved / green 
	
	yes, saved is 4, not 3. Not the cleanest way of doing this, but it works.
	
	Saving (or setting defaultCheckState to 4) will disallow changing of that money location, 
	so don't set defaultCheckState to 4.
	
	Possible locations don't get saved, so you can remember them later if need be.
	
	Note: if you want to change the default color for each of these states,
	you can do so by modifying the following background-color RGB Value in style.css:

	.available
	.collected
	.possible
	.saved

	Default = 0
*/

const defaultCheckState = 0;

/*
	checkStateOrder can be changed here. Always requires 3 elements. If using
	mode 0, only the first two elements are used, but still requires 3 total elements.
	Following the same numbering system as the chest state:
	0 = available / gray
	1 = collected / yellow
	2 = possible / red
	
	The same as chestState, don't set 4 anywhere in the order to avoid locking a chest
	in a saved state.
	
	Default = [0, 1, 2]
*/

const checkStateOrder = [0, 1, 2];

/*
	The keys listed below are ascii values, if you wish to change these you can easily 
	find codes for whatever keys you'd like here: (use the event.which number) 
	https://www.toptal.com/developers/keycode 
	
	
	Default saveKey = 32
	Default loadKey = 27
*/

//Space bar
const saveKey = 32;

//Escape
const loadKey = 27;
