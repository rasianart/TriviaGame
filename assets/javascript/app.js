$(document).ready(function() {

// object of all questions, choices, and answers
    var game = [{
        question: 'What has happened to images?',
        choices: ['devoured', 'shat on', 'vommited on', 'ravaged'],
        answer: 'shat on'
    }, {
        question: 'We are always somehow...',
        choices: ['photoshopping', 'destroying', 'rereading a classic', 'justifying'],
        answer: 'rereading a classic'
    }, {
        question: 'The function proper to knowledge is...',
        choices: ['interpreting', 'empathy', 'deconstruction', 'apathy'],
        answer: 'interpreting'
    }, {
        question: ' The _______ is composed of infinitely many.',
        choices: ['atom', 'book', 'answer', 'multiverse'],
        answer: 'multiverse'
    }];

// poem iterated through with a counter/delay, matched to the vocal audio
    var poem = [
        '',
        'Degredation followed display.',
        'Degredation followed display.',
        'Reified and emptied.',
        'Reified and emptied.',
        'Reified and emptied.',
        'The image was treated like the lowliest of things',
        'The image was treated like the lowliest of things',
        'The image was treated like the lowliest of things',
        'images were broken,',
        'burned,',
        'toppled,',
        'beheaded,',
        'and hanged',
        'They were spat,',
        'pissed,',
        'and shat on.',
        'Tossed into the toilets,',
        'sewers,',
        'fountains,',
        'canals,',
        'rubble heaps,',
        'garbage dumps,',
        'pigsties,',
        'and channel houses.',
        'and channel houses.',
        'and channel houses.',
        'and channel houses.',
        'and channel houses.',
    ];

// stores users choice
    var userGuess;
// current question chosen from the random function
    var currentQ;
// an array storing all the random questions guessed
    var used = [];
// the counter/timer resets to this number every time
    var number = 30;
// hold the amount to skip video by
    var vidSkip = 20;
// stored user input from textarea
    var userInput = '';
// index of poem
    var poemIndex = 0;
// specific variable that is modified to control specific video switches
    var switchTime = 95;

// audio and video elements grabbed and stored
    var video = document.getElementById('vid');
    var aud = document.getElementById('aud');
    // aud.volume = 0;

// on click starts the game
    $('body').one('click', function(){
        startGame();
    });

// plays audio, video, and begins the first story
    function startGame() {
        aud.play();
        video.play();
        runStory();
    }

// chooses a random question from an array and stores that value into a new array 
// so that the random choice is not chosen again
    function randomQuestion() {
        var rand = Math.floor((Math.random() * 4));
        var x = $.inArray(rand, used);
        // if not already chosen, chooses, then push into new array
        if (x == -1) {
            used.push(rand);
            currentQ = game[rand];
        } else if (used.length === 4) {
            reset();
            return;
        } else {
            // if already chosen, runs the function again
            randomQuestion();
        }
    }

// sets the timer, prints the question and new choices
    function setupQ() {
        $('#timer').html('30');
        $('.choices').empty();
        $('#question').html(currentQ.question);
        for (var i = 0; i < 4; i++) {
            var choiceBox = document.getElementById('choices' + i);
            choiceBox.innerHTML = currentQ.choices[i];
        }
    }

// on click of each choices, establishes if correct/incorrect.  if correct, resets the story 
// and prints the correct answer, if wrong, runs wrong answer
    $('.choices').on('click', function() {
        userGuess = $(this).html();
        if (userGuess === '') {
            return;
        } else {
            if (userGuess === currentQ.answer) {
                resetStory();
                correctAnswer();
                vidShifts();
            } else {
                wrongAnswer();
            }
        }
    });

// user can also submit answer through textarea. establishes if correct/incorrect.  if correct, resets the story 
// and prints the correct answer, if wrong, runs wrong answer
    function submit() {
        $('#inputBox').keydown(function(event) {
            // if "enter" key is pressed inside the textarea
            if (event.keyCode == 13) {
                event.preventDefault();
                userInput = document.getElementById('inputBox').value;
                if (userInput.toLowerCase() == currentQ.answer) {
                    resetStory();
                    correctAnswer();
                    vidShifts();
                } else {
                    wrongAnswer();
                }
            }
        });
    }

// fades in and out the correct answer over the entire screen
    function correctAnswer() {
        $('#over').fadeIn();
        $('#over').html(currentQ.answer).css('zIndex', 7).delay(1000).fadeOut('slow');
    }

// fades in and out that you answered incorrectly over the entire screen
    function wrongAnswer() {
        $('#over').fadeIn();
        $('#over').html("Your choice injured you.").css('zIndex', 7).delay(1000).fadeOut('slow');
    }

// runs the timer of decrementQuestion
    function runStory() {
        counter = setInterval(decrementQuestion, 1000);
    }

// runs the timer of decrementStory
    function runQuestions() {
        counter = setInterval(decrementStory, 1000);
    }

// The decremeent function.
    function decrementQuestion() {
        // stores each tick of timer and compares it to the previous one to make sure it changed.
        // used to trigger the poem with each index of array
        var oldNumber = number;
        number--;
        $('#timer').html('<h2>' + number + '</h2>');
        // special trigger for certain time to skip video/audio
        if (number === 0 && aud.currentTime > 290 && aud.currentTime < 320) {
            $('#inputBox').val('');
            resetQuestion();
            poemIndex = 0;
            // gains power to skip video and displays text explaining
            videoControl();
            $('#over').fadeIn();
            $('#over').html("You have gained a new power. Remix time (right or left)").css({'zIndex': 7, "fontSize": "75px"}).delay(3000).fadeOut('slow');
        // special trigger for certain time to skip video/audio
        } else if (number === 0 && aud.currentTime > 327 && used.length !== 4) {
            $('#inputBox').val('');
            resetQuestion();
            poemIndex = 0;
            videoControl();
        } else if (number === 0 && used.length !== 4) {
            aud.pause();
            // remove initial draw canvas
            $('#canvasDiv').remove();
            resetQuestion();
            poemIndex = 0;
            // resets if all questions have been asked(array = 4)
        } else if (number === 0 && used.length == 4) {
            reset();
        }
        // on each number change, print index of array to textarea
        if (number !== oldNumber) {
            $('#inputBox').val(poem[poemIndex]);
            poemIndex += 1;
        }
    }

// counts down through the story, when number = 0, resets story
    function decrementStory() {
        number--;
        $('#timer').html('<h2>' + number + '</h2>');
        var aud = document.getElementById('aud');
        if (number == 0) {
            aud.pause();
            resetStory();
            $('#over').fadeIn();
            $('#over').html("Time Up.").css('zIndex', 7).delay(1000).fadeOut('slow');
        }
    }

// The stop function
    function stop() {
        clearInterval(counter);
    }

// runs the story, switching audio at appropriate times.  clears the questions and choices in the DOM
    function resetStory() {
        stop();
        number = 30;
        $('#timer').html('<h2>' + number + '</h2>');
        runStory();
        if (aud.currentTime < 264) {
            aud.currentTime = switchTime;
            aud.play();
            switchTime = 262;
        }
        $('#question').empty();
        $('.choices').empty();
    }

// prints the question and choices to the screen
    function resetQuestion() {
        stop();
        number = 30;
        $('#timer').html('<h2>' + number + '</h2>');
        $('#inputBox').attr('placeholder', 'Type in the correct answer or click the correct answer.');
        $('#inputBox').val('');
        randomQuestion();
        setupQ();
        runQuestions();
        submit();
    }

// certain points in story/questions where video needs to be shifted and dom elements adjusted
    function vidShifts() {
        if (video.currentTime > 31 && video.currentTime < 61) {
            video.currentTime = 65;
            video.play();
        } else if (video.currentTime > 66 && video.currentTime < 105) {
            video.currentTime = 174;
            video.play();
            $('#inputBox').css({ 'bottom': 0, 'marginBottom': '50px' });
        } 
    }

// video controller - fast forward and rewinds with right and left arrow keys
// this ability only gained at a certain point in story
    function videoControl() {
        $(document).keydown(function(event) {
            if (event.keyCode == 39) {
                video.currentTime = video.currentTime + 20;
                video.play();
            } else if (event.keyCode == 37) {
                video.currentTime = video.currentTime - 20;
                video.play(); 
            }
        });
    }

// resets to beginning of game with no refresh
    function reset() {
        stop();
        video.pause();
        aud.pause();
        video.currentTime = 0;
        aud.currentTime = 0;
        number = 30;
        used = [];
        vidSkip = 20;
        userInput = '';
        poemIndex = 0;
        switchTime = 95;
        $('#inputBox').css('marginBottom', '415px').val('');
        $('#timer').html('');
        $('#over').fadeIn();
        $('#over').html("Game Over").delay(1000).fadeOut('slow');
        $('body').one('click', function(){
            startGame();
        });
    }

});

