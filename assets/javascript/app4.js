$(document).ready(function() {

    var game = [{
        question: 'What does verbatim mean?',
        choices: ['In the same words', 'In the wrong words', 'Synonym', 'Truthful'],
        answer: 'In the same words'
    }, {
        question: 'Where is the Sea of Tranquility?',
        choices: ['Austrailia', 'The Moon', 'Eastern Europe', 'Jupiter'],
        answer: 'The Moon'
    }, {
        question: 'What is the easternmost state in the US?',
        choices: ['Maine', 'Florida', 'Alaska', 'North Carolina'],
        answer: 'Alaska'
    }, {
        question: ' What was the first Lifesaver flavor?',
        choices: ['Grape', 'Peppermint', 'Lemon', 'Lime'],
        answer: 'Peppermint'
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


    video.play();
    runStory();

    function submit() {
        $('#inputBox').keydown(function(event) {
            if (event.keyCode == 13) {
                // this.form.submit();
                event.preventDefault();
                userInput = document.getElementById('inputBox').value;
                if (userInput == currentQ.answer) {
                    alert('Correct');
                    resetStory();
                } else {
                    alert('Wrong');
                    resetStory();
                }
            }
        });
    }

    // video controller
    $(document).keydown(function(event) {
        if (event.keyCode == 39 || event.keyCode == 37) {
            if (vidCount > 0) {
                var timeStamp = document.getElementById('vid').setAttribute('src', 'assets/videos/versionsversions.mp4#t=' + vidSkip);
                var video = document.getElementById('vid');
                if (event.keyCode == 39) {
                    video.play();
                    vidSkip = vidSkip + 20;
                } else if (event.keyCode == 37) {
                    video.play();
                    vidSkip = vidSkip - 20;
                }
                if (vidSkip > 540) {
                    vidSkip = 20;
                } else if (vidSkip < 30) {
                    vidSkip = 540;
                }
            } else {
                vidCount++;
                console.log(vidCount);
                return;
            }
        }
    });

    function vidShifts() {
        if (video.currentTime > 31 && video.currentTime < 61) {
            console.log(video.currentTime);
            video.currentTime = 65;
            video.play();
        } else {};
        if (video.currentTime > 66 && video.currentTime < 105) {
            console.log(video.currentTime);
            video.currentTime = 174;
            video.play();
            $('#inputBox').css({ 'bottom': 0, 'marginBottom': '50px' });
        } else {};
    }

    $('.choices').on('click', function() {
        userGuess = $(this).html();
        if (userGuess === '') {
            return;
        } else {
            console.log(userGuess);
            if (userGuess === currentQ.answer) {
                $('#over').fadeIn();
                $('#over').html(currentQ.answer).css('zIndex', 7).delay(1000).fadeOut('slow');
                resetStory();
                vidShifts();
            } else {
                $('#over').fadeIn();
                $('#over').html("Your choice injured you.").delay(1000).fadeOut('slow');
                // resetStory();
                // vidShifts();
            }
        }
    });

    function randomQuestion() {
        var rand = Math.floor((Math.random() * 4));
        var x = $.inArray(rand, used);
        console.log(x);
        if (x == -1) {
            // reset();
            used.push(rand);
            currentQ = game[rand];
        } else if (used.length === 4) {
            // $('body').remove();
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
        if (number === 0 && aud.currentTime > 130) {
            $('#inputBox').val('');
            // alert('Time Up!')
            resetQuestion();
            poemIndex = 0;
        } else if (number === 0) {
            $('#inputBox').val('');
            aud.pause();
            $('#canvasDiv').remove();
            // alert('Time Up!')
            resetQuestion();
            poemIndex = 0;
            reload_js('assets/javascript/app4.js');
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
        randomQuestion();
        setupQ();
        runQuestions();
        submit();
        // $('body').stop().css('opacity', 1.0);
        // $('body').fadeTo(1000 * 30 , 0.05);
    }


    function reset() {
        video.currentTime = 0;
        aud.currentTime = 0;
        video.play();
        aud.play();
        // runStory();
        var used = [];
        var vidSkip = 20;
        var vidCount = 0;
        var userInput = '';
        var poemIndex = 0;
        var switchTime = 95;
        $('#over').fadeIn();
        $('#over').html("Game Over").delay(1000).fadeOut('slow');
    }

    function reload_js(src) {
        $('script[src="' + src + '"]').remove();
        $('<script>').attr('src', src).appendTo('head');
    }
    


});

