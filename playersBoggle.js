$(document).ready(function() {

if (localStorage.bestScores) {
  var allScores = JSON.parse(localStorage.getItem('bestScores'));
  for ( var i = 0; i < allScores.length ; i++ ) {
  $('ol.scoreBoard').append('<li class="score">' + allScores[i] + '</li>');
  }
} else {
  var allScores = [];
}

var letters = ["A", "A", "A", "A", "A", "A", "B", "B", "C", "C", "D", "D", "D", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "F", "G", "G", "H", "H", "H", "H", "H", "I", "I", "I", "I", "I", "I", "J", "K", "L", "L", "L", "L", "M", "M", "N", "N", "N", "N", "N", "N", "O", "O", "O", "O", "O", "O", "O", "P", "P", "Qu", "R", "R", "R", "R", "R", "S", "S", "S", "S", "S", "S", "T", "T", "T", "T", "T", "T", "T", "T", "T", "T", "U", "U", "U", "V", "V", "W", "W", "W", "X", "Y", "Y", "Y", "Z"];
var dictionaryWords;
var enteredWords = [];
var validWords = [];
var score = 0;

// jQuery to shuffle board with new letters, clear from previous game, alert rules, hide/show buttons, focus on player input, and start the countdown from 120 seconds, 2 minutes.
var shuffleboard = function(){
  $('.shuffleBoard').on('click', (function(){
    alert('!!!!!!!!!!READ THESE RULES BEFORE YOU PLAY!!!!!!!!!! Letters for words must touch HORIZONTALLY, VERTICALLY, or DIAGONALLY and may only be used once per word. Words must be at least 3 letters in length. Good luck!');
    var counter = 20;
    $('.playerForm').show();
    $('.playerInput').focus();
    $('.shuffleBoard').fadeOut(10);
    $('.dice').each(function(){
     $(this).text(letters[Math.floor(Math.random()*letters.length)]);
    });
    setInterval(function() {
      counter--;
      if (counter > 0) {
        span = document.getElementById("countdown");
        span.innerHTML = counter;
      } else if (counter === 0) {
         alert('2 minutes up! Click Get Score!');
         clearInterval(counter);
         $('.playerForm').hide();
      }
    }, 1000);
        $('.gameWords li').remove();
        enteredWords.length = 0;
        validWords.length = 0;
        score = 0;
  }));
};
shuffleboard();

// takes player input and puts into list
var playerWords = function() {
    $('.playerForm').submit(function(event){
      event.preventDefault();
      if ($('.playerInput').val() !== '') {
        var answerPlayerOne = $('.playerInput').val();
        $('ol.gameWords').append('<li class="answer">' + answerPlayerOne + '</li>');
      }
      $('.playerInput').val('');
      return false;
    });
  };
playerWords();

// on submit, takes player words ul and pushes to array
var getWords = function(){
  $('.scoreSum').on('click', function(){
    $('.shuffleBoard').fadeIn(3000);
    $('li.answer').each(function(){
      enteredWords.push(this.innerHTML);
    });
    getValidWords();
  });

// finds valid words on boggle dictionary file and puts indexed words back into array
// find way to let only one of each word go through
  var getValidWords = function(){
    for (var i = 0; i < enteredWords.length; i++){
      var goodWords = boggleDictionary.indexOf(enteredWords[i]);
      if (goodWords !== -1){
        validWords.push(boggleDictionary[goodWords]);
      }
    }
    getGameScore();
  };

// valid words ran through if statement to score each word and add to score
  var getGameScore = function(){
    for (var i = 0; i < validWords.length; i++) {
      if (validWords[i].length === 3) {
        score++;
      } else if (validWords[i].length === 4) {
        score += 2;
      } else if (validWords[i].length === 5) {
        score += 3;
      } else if (validWords[i].length === 6) {
        score += 4;
      } else if (validWords[i].length >= 7) {
        score += 5;
      }
    }
    postScore();
  };

// display sum of all words and display how many valid words played
// sort .scoreBoard to have top score first
// set local storage for All Scores to save top scores
  var postScore = function(){
    allScores.push(score);
    var name = swal("Good job!", "You found " + validWords.length + " valid words for " + score + " points", "success");
    allScores.sort(function(a,b){
      return b-a;
    });
    $('.scoreBoard').empty();
    if (name !== null && score !== 0) {
      for ( var i = 0; i < allScores.length ; i++ ) {
      $('ol.scoreBoard').append('<li class="score">' + allScores[i] +  '</li>');
      }
    } else {
      score = 0;
    }
   localStorage.setItem('bestScores', JSON.stringify(allScores));
  };
};
  var clearScoreBoard = function(){
    $('.clearScores').on('click', function(){
      $('.scoreBoard').empty();
      localStorage.clear();
    });
  };
getWords();
clearScoreBoard();
});
