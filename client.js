//I decided it was easier just to make a button that ran the funcitons in Pet Hotel and I mostly copy pasted into it from here and modified.  
//After a long day of experimenting I realized that I had deleted most of the playing around but my spike is complete.



var context = new AudioContext(); // Create audio container

//This creates a sin wave that just plays into the speakers
oscillator = context.createOscillator(); // Create sound source

oscillator.connect(context.destination); // Connect sound to speakers
oscillator.start(); // Generate sound instantly


//This routes that sin wave through a gainNode allowing for volume control  you can make multiples of these
var context = new AudioContext(); // Create audio container
oscillator = context.createOscillator(); // Create bass guitar
gainNode = context.createGain(); // Create boost pedal

oscillator.connect(gainNode); // Connect bass guitar to boost pedal
gainNode.connect(context.destination); // Connect boost pedal to amplifier
gainNode.gain.value = 0.3; // Set boost pedal to 30 percent volume
oscillator.start(); // Play bass guitar instantly



//This creates a sound for 1 second (although we don't have the rest of the crap for it)
var context = new AudioContext();

function oneNote (note, frequency) {
   var osc = context.createOscillator();

   osc.connect(context.destination);

   osc.start(context.currentTime);
   osc.stop(context.currentTime + 1);
};


window.onload = init;

var context;
var bufferLoader;


//You can use a funciton like this to buffer your sound files and generally set up anything you might use later.  
//This is a good way to begin because 1. you can put this in a controller or service 2. you can create some pathways you might want here.
function init() {
    try {
        context = new AudioContext();
    }
    catch(e) {
        alert("Web Audio API is not supported in this browser");
    }
    
    // Start loading the drum kit. The important part of this function is this is how you buffer sound files.
    bufferLoader = new BufferLoader(
        context,
        [
        "sounds/kick.wav",
        "sounds/snare.wav",
        "sounds/hihat.wav"
        ],
        bufferLoadCompleted  
    );

    bufferLoader.load();
}

function playSound(buffer, time) {
    var source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(time);
}


function startPlayingRhythm1(bufferList) {
    var kick = bufferList[0];
    var snare = bufferList[1];
    var hihat = bufferList[2];
    
    // We'll start playing the rhythm 100 milliseconds from "now"
    var startTime = context.currentTime + 0.100;
    

    var tempo = 120; // BPM (beats per minute)
    var quarterNoteTime = 60 / tempo;

    // Play the kick drum on beats 1, 2, 3, 4
    playSound(kick, startTime);
    playSound(kick, startTime + quarterNoteTime);
    playSound(kick, startTime + 2*quarterNoteTime);
    playSound(kick, startTime + 3*quarterNoteTime);

    // Play the snare drum on beats 2, 4
    playSound(snare, startTime + quarterNoteTime);
    playSound(snare, startTime + 3*quarterNoteTime);
    
    // Play the hi-hat every 16th note.
    for (var i = 0; i < 16; ++i) {
        playSound(hihat, startTime + i*0.25*quarterNoteTime);
    }
}

// Plays Rhythm 2
function startPlayingRhythm2(bufferList) {
    var kick = bufferList[0];
    var snare = bufferList[1];
    var hihat = bufferList[2];
    
    // We'll start playing the rhythm 100 milliseconds from "now"
    var startTime = context.currentTime + 0.100;
    
    var tempo = 80; // BPM (beats per minute)
    var quarterNoteTime = 60 / tempo;

    // Play the kick drum on beats 1, 2, 3, 4
    playSound(kick, startTime);
    playSound(kick, startTime + 0.5*quarterNoteTime);	
    playSound(kick, startTime + 1.75*quarterNoteTime);
    playSound(kick, startTime + 2*quarterNoteTime);
    playSound(kick, startTime + 2.5*quarterNoteTime);
	
    // Play the snare drum on beats 2, 4
    playSound(snare, startTime + quarterNoteTime);
    playSound(snare, startTime + 3*quarterNoteTime);
    playSound(snare, startTime + 3.75*quarterNoteTime);	
    
    // Play the hi-hat every 16th note.  If you're using a synth you'll want to use SYNTHNAME.start instead with a SYNTHNAME.stop instead.
    for (var i = 0; i < 16; ++i) {
        playSound(hihat, startTime + i*0.25*quarterNoteTime);
    }
    playSound(hihat, startTime + 3.125*quarterNoteTime);
	
}

function bufferLoadCompleted() {
	
}