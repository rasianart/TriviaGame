$(document).ready(function() {

    var gameObject = {
        game: [{
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
        }],

        poem: [
            '',
            'Degredation followed display.',
            'Degredation followed display.',
            'Reifyed and emptied.',
            'Reifyed and emptied.',
            'Reifyed and emptied.',
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
        ],

        userGuess: '',
        currentQ: '',
        used: [],
        number: 30,
        vidSkip: 20,
        vidCount: 0,
        userInput: '',
        poemIndex: 0,
        switchTime: 95,
        video: document.getElementById('vid'),
        aud: document.getElementById('aud'),
        // this.aud.volume = 0;



        submitV: function() {
            $('#inputBox').keydown(function(event) {
                if (event.keyCode == 13) {
                    // this.form.submit();
                    event.preventDefault();
                    this.userInput = document.getElementById('inputBox').value;
                    if (this.userInput == this.currentQ.answer) {
                        alert('Correct');
                        this.resetStory();
                    } else {
                        alert('Wrong');
                        this.resetStory();
                    }
                }
            });
        },



        vidShifts: function() {
            if (this.video.currentTime > 31 && this.video.currentTime < 61) {
                console.log(this.video.currentTime);
                this.video.currentTime = 65;
                this.video.play();
            } else {};
            if (this.video.currentTime > 66 && this.video.currentTime < 105) {
                console.log(this.video.currentTime);
                this.video.currentTime = 174;
                this.video.play();
                $('#inputBox').css({ 'bottom': 0, 'marginBottom': '50px' });
            } else {};
        },



        randomQuestion: function() {
            var rand = Math.floor((Math.random() * 4));
            var x = $.inArray(rand, used);
            console.log(x);
            if (x == -1) {
                used.push(rand);
                currentQ = game[rand];
            } else if (used.length === 4) {
                // $('body').remove();
                // reset();
                return;
            } else {
                randomQuestion();
            }
        },

        setupQ: function() {
            $('#timer').html('30');
            $('.choices').empty();
            $('#question').html(this.currentQ.question);
            for (var i = 0; i < 4; i++) {
                var choiceBox = document.getElementById('choices' + i);
                choiceBox.innerHTML = this.currentQ.choices[i];
            }
        },

        runStory: function() {
            counter = setInterval(this.decrementQuestion, 1000);
        },

        runQuestions: function() {
            counter = setInterval(this.decrementStory, 1000);
        },

        // The decremeent function.
        decrementQuestion: function() {
            var oldNumber = this.number;
            this.number--;
            $('#timer').html('<h2>' + this.number + '</h2>');
            if (this.number === 0 && this.aud.currentTime > 130) {
                $('#inputBox').val('');
                // alert('Time Up!')
                this.resetQuestion();
                this.poemIndex = 0;
            } else if (this.number === 0) {
                $('#inputBox').val('');
                this.aud.pause();
                $('#canvasDiv').remove();
                // alert('Time Up!')
                this.resetQuestion();
                this.poemIndex = 0;
            }
            if (this.number !== oldNumber) {
                $('#inputBox').val(gameObject.poem[gameObject.poemIndex]);
                this.poemIndex += 1;
            }
        },

        decrementStory: function() {
            this.number--;
            $('#timer').html('<h2>' + number + '</h2>');
            // var aud = document.getElementById('aud');
            if (this.number == 0) {
                this.aud.pause();
            }
        },
            // The stop function
        stop: function() {
            clearInterval(counter);
        },

        resetStory: function() {
            this.stop();
            this.number = 30;
            $('#timer').html('<h2>' + this.number + '</h2>');
            this.runStory();
            if (this.aud.currentTime < 264) {
                this.aud.currentTime = this.switchTime;
                this.aud.play();
                this.switchTime = 262;
            }
            $('#question').empty();
            $('.choices').empty();
        },

        resetQuestion: function() {
            this.stop();
            this.number = 30;
            $('#timer').html('<h2>' + this.number + '</h2>');
            this.randomQuestion();
            this.setupQ();
            this.runQuestions();
            this.submitV();
            // $('body').stop().css('opacity', 1.0);
            // $('body').fadeTo(1000 * 30 , 0.05);
        }


        // reset: function() {
        //     this.video.currentTime = 0;
        //     this.aud.currentTime = 0;
        //     this.play();
        //     this.runStory();
        //     this.used = [];
        //     this.vidSkip = 20;
        //     this.vidCount = 0;
        //     this.userInput = '';
        //     this.poemIndex = 0;
        //     this.switchTime = 95;
        // }
    };


    gameObject.video.play();
    gameObject.runStory();

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

});
