questionList;
console.log(questionList);

/* Question Format
var list = [{
  question: 'string',
  choices: ['another string', 'another', 'a third', 'final choice'],
  answer: 0
  ifWrong: 'string'
}];
*/

var state = {
  questionNum: 0,
  score: 0,
  question: questionList[0]
};

$('form').submit(function() {
  event.preventDefault();
  renderQuestion(state);
  //show if right or wrong
      //if right say good job or something
      //if wrong show questionList[i].ifWrong
  //update score
  //show next question button
});

var renderQuestion = function(state) {
  var whichQuestion = questionList[state.questionNum];
  $('.js-question').find('h3').text(whichQuestion.question);
};
