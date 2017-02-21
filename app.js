questionList;

var state = {
  questionNum: -2,
  score: 0
};

//Render Functions
var renderStart = function() {
  $('.js-quiz-begin').toggleClass('hidden');
  $('.js-question').toggleClass('hidden');
  $('.js-answers').toggleClass('hidden');
  $('.js-info').toggleClass('hidden');
  $('button').toggleClass('hidden');
  $('button').text('Continue');
  renderQuestion(state);
  renderForm(state);
  renderCount(state);
  renderScore(state);
};

var renderQuestion = function(state) {
  var whichQuestion = questionList[state.questionNum];
  $('.js-question').find('h3').text(whichQuestion.question);
};

var renderForm = function(state) {
  var answerChoices = questionList[state.questionNum].choices;
  var choiceInputs = answerChoices.map(function(index) {
    return '<span class="choice">' + index + '</span><br>';
  });
  $('.js-answer-field').empty();
  for (var i=0; i < choiceInputs.length; i++) {
    var inputField = '<input type="radio" name="answer" value="' + i + '">';
    var finalInput = inputField + choiceInputs[i];
    $('.js-answer-field').append(finalInput);
  }
};

var renderCount = function(state) {
  $('.js-count').find('span').text('Question ' + (state.questionNum + 1) + ' of 10');
};

var renderScore = function(state) {
  $('.js-score').find('span').text('Current Score: ' + state.score);
};

var renderCorrect = function() {
  $('.js-question').find('h3').text("Great job! You are correct!");
  $('.js-answers').toggleClass('hidden');
  $('.js-explanation').toggleClass('hidden');
  $('.js-explanation').find('img').attr('src', questionList[state.questionNum].image);
  $('.js-explanation').find('p').text(questionList[state.questionNum].explanation);
  $('button').toggleClass('hidden');
};

var renderIncorrect = function() {
  $('.js-question').find('h3').text("Sorry that's incorrect.");
  $('.js-answers').toggleClass('hidden');
  $('.js-explanation').toggleClass('hidden');
  $('.js-explanation').find('img').attr('src', questionList[state.questionNum].image);
  $('.js-explanation').find('p').text(questionList[state.questionNum].explanation);
  $('button').toggleClass('hidden');
};

var renderResults = function() {
  $('.js-question').toggleClass('hidden');
  $('.js-explanation').toggleClass('hidden');
  $('.js-info').toggleClass('hidden');
  $('.js-quiz-end').toggleClass('hidden');
  $('.js-results').find('p').text('You got ' + state.score + ' out of 10 questions correct.');
  if (state.score > 9) {
    $('.js-results').find('p').append('<p>Who do you think you are, Neil deGrasse Tyson?!</p>');
  } else if (state.score > 7) {
    $('.js-results').find('p').append('<p>Yay! You ARE smarter than the average 6th grader! I was worried there for a second.</p>');
  } else if (state.score > 3) {
    $('.js-results').find('p').append('<p>Yeah, it turns out you are NOT smarter than a 6th grader, but you probably already knew that.</p>');
  } else {
    $('.js-results').find('p').append('<p>Ouch. Maybe you should try some 5th grade science instead....</p>');
  }
  $('button').text('Try Again');
};

var renderRestart = function() {
  $('.js-quiz-end').toggleClass('hidden');
  $('.js-quiz-begin').toggleClass('hidden');
  $('button').text('Start');
};

//Event Handlers
$('form').submit(function() {
  event.preventDefault();
  if ($('input[type=radio]:checked').length === 1) {
    var answer = parseInt($('input[type=radio]:checked')[0].value);
    if (answer === questionList[state.questionNum].answer) {
      renderCorrect();
      state.score +=1;
      renderScore(state);
    } else {
      renderIncorrect();
    }
  } else {
    alert("You must choose an answer.")
  }
});

$('button').click(function() {
  if (state.questionNum === 9) {
    renderResults();
    state.questionNum = -1;
  } else if (state.questionNum === -1) {
    state.questionNum = -2;
    state.score = 0;
    renderRestart();
  } else if (state.questionNum === -2) {
    state.questionNum = 0;
    renderStart();
  } else {
    $(this).toggleClass('hidden');
    $('.js-explanation').toggleClass('hidden');
    $('.js-answers').toggleClass('hidden');
    state.questionNum += 1;
    renderQuestion(state);
    renderForm(state);
    renderCount(state);
    renderScore(state);
  }
});
