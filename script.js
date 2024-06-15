const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userPattern = [];
let level = 1;
let gameStarted = false;

function nextSequence() {
  userPattern = [];
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .animate({ opacity: 0.2 }, 100)
    .animate({ opacity: 1 }, 250);
  selectPath(randomChosenColour);
  $("h1").text(`level ${level}`);
  level++;
}

function playSound(filePath) {
  const audioSound = new Audio(filePath);
  audioSound.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function selectPath(color) {
  if (color == "blue") {
    playSound("sounds/blue.mp3");
  } else if (color == "red") {
    playSound("sounds/red.mp3");
  } else if (color == "yellow") {
    playSound("sounds/yellow.mp3");
  } else {
    playSound("sounds/green.mp3");
  }
}

$(".btn").click(function () {
  if (gameStarted) {
    const userChosenColor = $(this).attr("id");
    userPattern.push(userChosenColor);
    selectPath(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userPattern.length - 1);
  }
});

function startGame() {
  gameStarted = true;
  setTimeout(nextSequence, 500);
}

$("h1").on("click", function () {
  startGame();
  $("h1").off("click");
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userPattern[currentLevel]) {
    if (gamePattern.length === userPattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    resetGame();
  }
}

function resetGame() {
  level = 1;
  userPattern = [];
  gamePattern = [];
  $("h1").text(`You Messed Up, Press Me To Restart`);
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  playSound("sounds/wrong.mp3");
  $("h1").on("click", function () {
    startGame();
    $("h1").off("click");
  });
}
