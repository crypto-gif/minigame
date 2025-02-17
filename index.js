//declare global variables at beginning. if possible avoid global variables, they can result in conflicts.
let buttonSequence = [] //const stellt verhindert änderungen. let erlaubt änderungen. best practice für arrays.
let inputSequence = [] //anstelle von new Array () wird [] verwendet. best practice.
let gameState = false //boolean default as false - is reassigend before use
let hasEqualLength = false
let level = 0

//primary functions
function setup() { //setup
    $("h1").text("Press Start")
    $("#start").text("Start").addClass("start")
    $("p").text("")
}
function play() { //start
    $("button.start").on("click", function () {
        $("h1").text("game running")
        $("button.start").text("running").removeClass("start").addClass("running")
        setTimeout(() => {incrementSequence()}, 500);
        $("p").text("level: " + level)
    });
}
function gameover() { //game over
    $("h1").text("Oh No! Game over :'(");
    $("#start").text("Play again").removeClass("running").addClass("start")
    buttonSequence = []
    inputSequence = []
    $("p").text("you reached level: " + level)
    level = 0
}

//secondary functions
function incrementSequence () { //button sequence
    var newButton = (Math.floor(Math.random() * 4) + 1)
    buttonSequence.push(newButton);
    level++;
    playbackButtonSequence(buttonSequence);
    $("p").text("level: " + level)
};
function isEqual (array1, array2) { //array comparison
    var string1 = ""
    var string2 = ""
    if (array1 === undefined) { //handle undefined and set default to 0. best practice für funktionen mit input.
        array1 = 0;
        console.log("isEqual - array1 undefined") 
    } else if (array2 === undefined) {
        array2 = 0;
        console.log("isEqual - array2 undefined")
    } else if (array1.length === array2.length) {
        for (i = 0; i < array1.length; i++) {
            string1 = string1.concat(array1[i])
        };
        for (i = 0; i < array2.length; i++) {
            string2 = string2.concat(array2[i])
        };
        if (string1 == string2) {
            gameState = true;
        } else {
            gameState = false;
    }
    }
};
function modifyInputArray (number) { //input sequence
    inputSequence.push(number);
    setTimeout(() => {
        //pass
    }, 1250);
    if (inputSequence.length == buttonSequence.length) {
        hasEqualLength = true;
    } else {
        hasEqualLength = false;
    }
};
function playbackButtonSequence(sequenceArray) { //playback button sequence
    for (i = 0; i < sequenceArray.length; i++) {
        triggerDelay(sequenceArray, i);
    }
}
function triggerDelay (sequenceArray, i) { //delay playback
    setTimeout(function () {
        if (sequenceArray[i] == 1) {
            $("#eins").addClass("active");
            setTimeout(() => {$("#eins").removeClass("active")}, 750);
            console.log('triggerDelay #1: ' + sequenceArray[i])
        } else if (sequenceArray[i] == 2) {
            $("#zwei").addClass("active");
            setTimeout(() => {$("#zwei").removeClass("active")}, 750);
            console.log('triggerDelay #2: ' + sequenceArray[i])
        } else if (sequenceArray[i] == 3) {
            $("#drei").addClass("active");
            setTimeout(() => {$("#drei").removeClass("active")}, 750);
            console.log('triggerDelay #3: ' + sequenceArray[i])
        } else if (sequenceArray[i] == 4) {
            $("#vier").addClass("active");
            setTimeout(() => {$("#vier").removeClass("active")}, 750);
            console.log('triggerDelay #4: ' + sequenceArray[i])
        } else {
            console.log('error 1, sequenceArray[i] ist: ' + sequenceArray[i])
        };
    }, i * 1000);
}

$(".row2 > button").on("click", function() { //select button and playback
    if (this.id == "vier") {
        $("#vier").addClass("active");
        setTimeout(() => {$("#vier").removeClass("active")}, 1000);
        modifyInputArray(4);
        console.log("an id vier vorübergeangen")
    } else if (this.id == "drei") {
        $("#drei").addClass("active");
        setTimeout(() => {$("#drei").removeClass("active")}, 1000);
        modifyInputArray(3);
    } else if (this.id == "zwei") {
        $("#zwei").addClass("active");
        setTimeout(() => {$("#zwei").removeClass("active")}, 1000);
        modifyInputArray(2);
    }  else if (this.id == "eins") {
        $("#eins").addClass("active");
        setTimeout(() => {$("#eins").removeClass("active")}, 1000);
        modifyInputArray(1);
    } else {
        console.log("else fallback - this id: " + this.id)
    }
    if (hasEqualLength == true) {
        isEqual(inputSequence, buttonSequence);
        console.log("input sequence: " + inputSequence + " | button sequence: " + buttonSequence + " | gameState: " + gameState)
        if (gameState == true) {
            console.log("success")
            setTimeout(() => {incrementSequence()}, 500);
            inputSequence = []
        } else {
            console.log("game over")
            gameover()
        }
    } else {
        console.log("input sequence: " + inputSequence + " | button sequence: " + buttonSequence + " | gameState: " + gameState)
    }
});

//call the functions to render the game playable
setup()
play()
