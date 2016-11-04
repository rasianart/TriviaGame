$(document).ready(function() {

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

    var userGuess;
    var currentQ;
    var used = [];
    var number = 30;
    var vidSkip = 20;
    var vidCount = 0;
    var userInput = '';
    var poemIndex = 0;
    var switchTime = 95;
    var video = document.getElementById('vid');
    var aud = document.getElementById('aud');
    // aud.volume = 0;

    $('body').one('click', function(){
        startGame();
    });

    function startGame() {
        aud.play();
        video.play();
        runStory();
    }

    function randomQuestion() {
        var rand = Math.floor((Math.random() * 4));
        var x = $.inArray(rand, used);
        if (x == -1) {
            used.push(rand);
            currentQ = game[rand];
        } else if (used.length === 4) {
            reset();
            return;
        } else {
            randomQuestion();
        }
    }

    function setupQ() {
        $('#timer').html('30');
        $('.choices').empty();
        $('#question').html(currentQ.question);
        for (var i = 0; i < 4; i++) {
            var choiceBox = document.getElementById('choices' + i);
            choiceBox.innerHTML = currentQ.choices[i];
        }
    }

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

    function submit() {
        $('#inputBox').keydown(function(event) {
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

    function correctAnswer() {
        $('#over').fadeIn();
        $('#over').html(currentQ.answer).css('zIndex', 7).delay(1000).fadeOut('slow');
    }

    function wrongAnswer() {
        $('#over').fadeIn();
        $('#over').html("Your choice injured you.").css('zIndex', 7).delay(1000).fadeOut('slow');
    }

    function runStory() {
        counter = setInterval(decrementQuestion, 1000);
    }

    function runQuestions() {
        counter = setInterval(decrementStory, 1000);
    }

    // The decremeent function.
    function decrementQuestion() {
        var oldNumber = number;
        number--;
        $('#timer').html('<h2>' + number + '</h2>');
        if (number === 0 && aud.currentTime > 290 && aud.currentTime < 320) {
            $('#inputBox').val('');
            resetQuestion();
            poemIndex = 0;
            videoControl();
            $('#over').fadeIn();
            $('#over').html("You have gained a new power. Remix time (right or left)").css({'zIndex': 7, "fontSize": "75px"}).delay(3000).fadeOut('slow');
        } else if (number === 0 && aud.currentTime > 327 && used.length !== 4) {
            $('#inputBox').val('');
            resetQuestion();
            poemIndex = 0;
            videoControl();
        } else if (number === 0 && used.length !== 4) {
            aud.pause();
            $('#canvasDiv').remove();
            resetQuestion();
            poemIndex = 0;
        } else if (number === 0 && used.length == 4) {
            reset();
        }
        if (number !== oldNumber) {
            $('#inputBox').val(poem[poemIndex]);
            poemIndex += 1;
        }
    }

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

    function reset() {
        stop();
        video.pause();
        aud.pause();
        video.currentTime = 0;
        aud.currentTime = 0;
        number = 30;
        used = [];
        vidSkip = 20;
        vidCount = 0;
        userInput = '';
        poemIndex = 0;
        $('#inputBox').css('marginBottom', '415px').val('');
        $('#timer').html('');
        $('#over').fadeIn();
        $('#over').html("Game Over").delay(1000).fadeOut('slow');
        $('body').one('click', function(){
            startGame();
        });
    }

});

