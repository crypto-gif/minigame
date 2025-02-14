//game start
$("h1").text("Press any button");
$(document).on("keyup", function () {
    $("h1").text("game running")
    setTimeout(() => {addButtonSequence()}, 500);
    console.log(buttonSequence[0]);
});

//Triggers for change of button properties
$("#vier").on("click", function() {
    $("#vier").css("background-color", "green");
    setTimeout(() => {$("#vier").css("background-color", "yellow")}, 1000);
    addToInputSequence(4);
    isEqual(inputSequence, buttonSequence);
    console.log("input sequence: " + inputSequence + " | button sequence: " + buttonSequence + " | gameState: " + gameState)
    if (gameState == true) {
        console.log(gameState)
    } else {
        console.log(gameState)
    }
    addButtonSequence();
});

//array and function for button sequence
var buttonSequence = []
function addButtonSequence () {
    var newButton = (Math.floor(Math.random() * 4) + 1)
    buttonSequence.push(newButton);
};

//array and function for input sequence
var inputSequence = []
function addToInputSequence (buttonClicked) {
    inputSequence.push(buttonClicked);
};

//array comparison
var gameState = ""
function isEqual (array1, array2) {
    var string1 = ""
    for (i = 0; i < array1.length; i++) {
        string1 = string1.concat(array1[i])
    };
    var string2 = ""
    for (i = 0; i < array2.length; i++) {
        string2 = string2.concat(array2[i])
    };
    if (string1 == string2) {
        gameState = true;
        console.log("gameState set to true")
    } else {
        gameState = false;
        console.log("gameState set to false")
    }
};