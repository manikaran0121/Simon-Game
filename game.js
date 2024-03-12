var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;

$(".btn").on("click", function () {
	var inner = $(this).attr("id");
	userClickedPattern.push(inner);
	playSound(inner);
	animatePress(inner);
	chechAnswer(userClickedPattern.length - 1);
});

$(document).on("keypress", function () {
	nextSequence();
});
$(".btn-outline-primary").on("click", function () {
	nextSequence();
});

function nextSequence() {
	userClickedPattern = [];
	level++;
	$("h1").text("Level " + level);
	var randomNumber = Math.random();
	randomNumber = randomNumber * 4;
	randomNumber = Math.floor(randomNumber);
	var randomcolor = buttonColors[randomNumber];
	gamePattern.push(randomcolor);
	$("#" + randomcolor)
		.fadeOut(100)
		.fadeIn(100)
		.fadeOut(100)
		.fadeIn(100);

	playSound(randomcolor);
}

function playSound(name) {
	var audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}

function animatePress(name) {
	$("#" + name).addClass("pressed");
	setTimeout(function () {
		$("#" + name).removeClass("pressed");
	}, 100);
}

function chechAnswer(currentLevel) {
	if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
		console.log("Success");

		if (userClickedPattern.length == gamePattern.length) {
			setTimeout(function () {
				nextSequence();
			}, 1000);
		}
	} else {
		playSound("wrong");
		$("body").addClass("game-over");
		setTimeout(function () {
			$("body").removeClass("game-over");
		}, 200);
		$("h1").text("Game Over, Press any key to restart!");
		startOver();
	}
}

function startOver() {
	level = 0;
	gamePattern = [];
}
