/*
	gameVersion tracks what version of the game is being tracked (NTSC vs. PAL).
	This is helpful because the PAL hidden mansion is mirrored compared to the NTSC version.
*/

const GameVersion = {
	NTSC: "ntsc",
	PAL: "pal"
}
const currentGameVersion = GameVersion.NTSC;

/*
	defaultCheckState is the initial state of money spots when loading the money tracker.
	0 = available / gray
	1 = collected / yellow
	2 = possible / red
	3 = saved / green 
	
	Saving (or setting defaultCheckState to 3) will disallow changing of that money location, 
	so don't set defaultCheckState to 3.
	
	Possible locations don't get saved, so you can remember them later if need be.
	
	Note: if you want to change the default color for each of these states,
	you can do so by modifying the following background-color RGB Value in style.css:

	.available
	.collected
	.possible
	.saved
*/

const CheckState = {
	Available: 0,
	Collected: 1,
	Possible: 2,
	Saved: 3,
}
const defaultCheckState = CheckState.Available;

/*
	maxToggleableState limits how high the checkState can be set via toggling.
	Values higher than this must be set in other ways (e.g. via saving).
	Saved states above this value cannot be changed via toggling.
*/

const maxToggleableState = 2;
const minToggleableState = 0;

/*
	The keys listed below are ascii values, if you wish to change these you can easily 
	find codes for whatever keys you'd like here: (use the event.which number) 
	https://www.toptal.com/developers/keycode 
*/

const KeyCodes = {
	SaveKey: 32, // spacebar
	LoadKey: 27 // escape
}