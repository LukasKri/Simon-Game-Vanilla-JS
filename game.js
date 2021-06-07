let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = [];

let gameStarted = false;

let levelCount = 1;

// Event listener for a keypress to start a game.
document.addEventListener("keypress", () => {
    if (!gameStarted) {
        gameStarted = true;
        nextSequence();
    }
});

// Event listener for buttons keypress.
document.querySelectorAll(".btn").forEach((item) => {
    item.addEventListener("click", (event) => {
        let userChosenColour = event.target.id;

        userClickedPattern.push(userChosenColour);

        userButtonAnimation(userChosenColour);

        playAudio(userChosenColour);

        let currentLevel = userClickedPattern.length - 1;
        checkAnswer(currentLevel);
    });
});

// Function to add next element to the game sequence.
function nextSequence() {
    userClickedPattern = [];

    let randomNumber = Math.floor(Math.random() * 4);

    let randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    setTimeout(() => {
        if (gamePattern.length < 2) {
            computerButtonAnimation(randomChosenColour);
            playAudio(randomChosenColour);
        }
    }, 200);

    document.querySelector("#level-title").innerHTML = "Level " + levelCount;

    levelCount++;
}

// Recursvie function to loop through the existing game sequence on every level.
function loopThroughGamePattern(gamePattern) {
    for (let i = 0; i < gamePattern.length; i++) {
        ((i) => {
            setTimeout(() => {
                computerButtonAnimation(gamePattern[i]);
                playAudio(gamePattern[i]);
            }, 500 * i);
        })(i);
    }
}

// Function to check the user's answer against the game sequence.
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
                loopThroughGamePattern(gamePattern);
            }, 1000);
        }
    } else {
        let wrong = new Audio("sounds/wrong.mp3");
        wrong.play();

        document.body.classList.add("game-over");

        setTimeout(() => {
            document.body.classList.remove("game-over");
        }, 200);

        gameStarted = false;
        levelCount = 1;

        document.querySelector("#level-title").innerHTML =
            "Game Over, Press Any Key to Restart";
    }
}

function userButtonAnimation(object) {
    let pushedButton = document.querySelector("#" + object);

    pushedButton.classList.add("pressed-by-user");

    setTimeout(() => {
        pushedButton.classList.remove("pressed-by-user");
    }, 100);
}

function computerButtonAnimation(object) {
    let pushedButton = document.querySelector("#" + object);

    pushedButton.classList.add("pressed-by-pc");

    setTimeout(() => {
        pushedButton.classList.remove("pressed-by-pc");
    }, 100);
}

function playAudio(object) {
    switch (object) {
        case "blue":
            let blue = new Audio("sounds/blue.mp3");
            blue.play();
            break;
        case "green":
            let green = new Audio("sounds/green.mp3");
            green.play();
            break;
        case "red":
            let red = new Audio("sounds/red.mp3");
            red.play();
            break;
        case "yellow":
            let yellow = new Audio("sounds/yellow.mp3");
            yellow.play();
            break;
    }
}
