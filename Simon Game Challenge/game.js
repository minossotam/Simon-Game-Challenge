let buttonColours = ['red', 'blue', 'green', 'yellow']; 

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

$(document).keypress(function() {
    if(!started){

        $('#level-title').text('Level ' + level);
        nextSequence();
        started = true;
    };
});


$('.btn').click(function () {
    let userChosenColour = $(this).attr('id');

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        if(userClickedPattern.length === gamePattern.length) {

            setTimeout(function() {
                nextSequence()
            },1000);
        }
    } else {
        console.log('Wrong');

        playSound('worong');

        $('body').addClass('game-over');
        setTimeout(function() {
            $('body').removeClass('game-over');
        },200);

        $('#level-title').text('Game Over! Press any key to restart');

        startOver();
    };
};


function nextSequence() {
    userClickedPattern = [];

    level++;
    $('#level-title').text('Level ' + level);

    const randomNumber = Math.floor(Math.random() * 4);

    const randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
};



function playSound(name) {
    const audio = new Audio('sounds/' + name + '.mp3')
    audio.play();
};

function animatePress(currentColour) {
    $('#' + currentColour).addClass('pressed');
    setTimeout( function() {
        $('#' + currentColour).removeClass('pressed')
    },100);
};


function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
};