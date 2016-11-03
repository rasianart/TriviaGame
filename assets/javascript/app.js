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

var userGuess;
var currentQ;
var used = [];
var number = 30;
var vidSkip = 20;
var vidCount = 0;
userInput = '';

var video = document.getElementById('vid');
    video.play();
$('#inputBox').keydown(function(event) {
        if (event.keyCode == 13) {
            // this.form.submit();
            event.preventDefault();
            userInput = document.getElementById('inputBox').value;
            if(isNaN(userInput)){
                alert('Enter a number please');
            } else {
                alert('enter');
                 
// $(document).one('click', function () {
    run();
    randomQuestion();
    setupQ();
    // $('body').fadeTo(1000 * 30 , 0.05);
    // var video = document.getElementById('vid');
    // video.play();
    $('.draggable').draggable();
// });

// video controller
$(document).keydown(function(event) {
    if (event.keyCode == 39 || event.keyCode == 37){
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

// document.addEventListener('ondragend', function (event) {
//       event.dataTransfer.setData('text', event.target.innerHTML);
//       console.log('hey');
//     });

$('.choices').on('click', function() {
        userGuess = $(this).html();
        console.log(userGuess);
        if (userGuess === currentQ.answer) {
            alert('Great, next question!');
            reset();
        } else {
            alert('Wrong answer, next question.');
            reset();
        }
});
}}});
function randomQuestion() {
    var rand = Math.floor((Math.random() * 4 ));
    var x = $.inArray(rand, used);
    console.log(x);
    if (x == -1) {
        used.push(rand);
        currentQ = game[rand];
    } else if (used.length === 4) {
        $('body').remove();
        return;
    }
    else {
        randomQuestion();
    }
}

function setupQ () {
    $('#timer').html('30');
    $('.choices').empty();
    $('#question').html(currentQ.question);
    console.log(currentQ.question);
    for(var i=0; i < 4; i++){
    var choiceBox = document.getElementById('choices' + i);
    choiceBox.innerHTML = currentQ.choices[i];
    } 
}

function run(){
    counter = setInterval(decrement, 1000);
} 

// The decremeent function.
function decrement(){
    number--;
    $('#timer').html('<h2>' + number + '</h2>');
    if (number === 0){
        alert('Time Up!')
        reset();
    } 
    // else if (number === 25){
    //     $('#inputBox').val('Hurry up gurl');
    // }
}

// The stop function
function stop(){
    // Clears our "counter" interval.
    // We just pass the name of the interval
    // to the clearInterval function.
    clearInterval(counter);
}

function reset() {
    stop();
    number = 30;
    $('#timer').html('<h2>' + number + '</h2>');
    randomQuestion();
    setupQ();
    run();
    // $('body').stop().css('opacity', 1.0);
    // $('body').fadeTo(1000 * 30 , 0.05);
}

// $('#inputBox').change(function () {
//     if ($.trim($('#inputBox').val()).length < 1) {

//         $('#output').html('Someway your box is being reported as empty... sadness.');

//     } else {

//         $('#output').html('Your users managed to put something in the box!');
//         //No guarantee it isn't mindless gibberish, sorry.

//     }
// });

