`use strict`

let question = 0;
let score = 0;

function startQuiz() {
  console.log('start quiz running');
  $("#start-quiz").click(event, function(){
    $("main").remove();
    $("header img").css("display", "block");
    question += 1;
    renderQuestions();
    console.log(question);
    questionTracker();
  });
}

function renderQuestions() {
  console.log('render questions running');
  if (question < BANK.length) {
    return $("#quiz-render").html(`
    <h2 class="question-text">${BANK[question-1].question} </h2>
    <form class="answers">
      <fieldset>
        <label class="answerOption">
        <input type="radio" value="${BANK[question-1].answers[0]}" name="answer" required>
        <span>${BANK[question-1].answers[0]}</span>
        </label>
        <label class="answerOption">
        <input type="radio" value="${BANK[question-1].answers[1]}" name="answer" required>
        <span>${BANK[question-1].answers[1]}</span>
        </label>
        <label class="answerOption">
        <input type="radio" value="${BANK[question-1].answers[2]}" name="answer" required>
        <span>${BANK[question-1].answers[2]}</span>
        </label>
        <label class="answerOption">
        <input type="radio" value="${BANK[question-1].answers[3]}" name="answer" required>
        <span>${BANK[question-1].answers[3]}</span>
        </label>
        <button type="submit" class="submitButton">Submit</button>
      </fieldset>
  </form>
    `)};
}

function submitAnswer() {
  console.log('submit answer running');
  $(".submitButton").click(event, function(){
    event.preventDefault();
    renderFeedback();
  })
}

function renderFeedback() {
  // console.log('render feedback running');
  // $(".submitButton").click(event, function() {
  //   console.log('clicked!');
  //   event.preventDefault();
    let selectedGuess = $('input:checked');
    let answerGuess = selectedGuess.val();
    let correctAnswer = `${BANK[question].correctAnswer}`;
    console.log(answerGuess);
    console.log(correctAnswer);
    if (answerGuess === correctAnswer) {
      $('#quiz-render').html(
      `<h2>Correct!</h2>
      <p>Killed it! That's right, the correct answer was ${correctAnswer}.</p>
      <a href="/Users/TrevorOsterman/Projects/quiz-app/question-page.html" class="continueLink">Continue</a>`
    )} else {
      $('#quiz-render').html(
      `<h2>Sorry!</h2>
      <p>Uh oh! The answer we were looking for was ${correctAnswer}.</p>
      <a href="/Users/TrevorOsterman/Projects/quiz-app/question-page.html" class="continueLink">Continue</a>`)};
  }

function continueQuiz() {
  console.log('continue running')
}

function questionTracker() {
  console.log('question tracker running');
  $("span.question-count").text(question);
}

function scoreTracker() {
  console.log('score tracker working');
  $(".score").html(score);
}

function renderResults() {
  console.log('render results');
}

function handleQuiz() {
  startQuiz();
  submitAnswer();
  // renderFeedback();
  continueQuiz();
  questionTracker();
  scoreTracker();
  renderResults();
  console.log('handle quiz running');
}

$(handleQuiz);
