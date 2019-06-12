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
  if (question <= BANK.length) {
    return $("#quiz-render").html(`
    <div class="container">
    <h2 class="question-text">${BANK[question-1].question} </h2>
    <form class="answers">
      <fieldset>
        <label class="answerOption">
        <input type="radio" value="${BANK[question-1].answers[0]}" name="answer" required>
        <span tabindex="0" class="answerText" onclick="selectAnswer()">${BANK[question-1].answers[0]}</span>
        </label>
        <label class="answerOption">
        <input type="radio" value="${BANK[question-1].answers[1]}" name="answer" required>
        <span tabindex="0" class="answerText" onclick="selectAnswer()">${BANK[question-1].answers[1]}</span>
        </label>
        <label class="answerOption">
        <input type="radio" value="${BANK[question-1].answers[2]}" name="answer" required>
        <span tabindex="0" class="answerText" onclick="selectAnswer()">${BANK[question-1].answers[2]}</span>
        </label>
        <label class="answerOption">
        <input type="radio" value="${BANK[question-1].answers[3]}" name="answer" required>
        <span tabindex="0" class="answerText" onclick="selectAnswer()">${BANK[question-1].answers[3]}</span>
        </label>
        <button tabindex="0" type="submit" class="submitButton">Submit</button>
      </fieldset>
  </form>
  </div>
    `)} else {
      renderResults();
    };
}

function selectAnswer() {
  $("body").on("click", 'span', function(event){
    $('.answerText').css('color', 'white');
    $(this).css('color', 'rgb(219, 226, 85)');
  })
}

function submitAnswer() {
  console.log('submit answer running');
  $("body").on("click", ".submitButton", function(event){
    event.preventDefault();
    if ($('input:radio').is(':checked')) {
        renderFeedback();
    } else {
        alert('Pick an answer or else...');
    }
  })
}

function renderFeedback() {
    let selectedGuess = $('input:checked');
    let answerGuess = selectedGuess.val();
    let correctAnswer = `${BANK[question-1].correctAnswer}`;
    console.log(answerGuess);
    console.log(correctAnswer);
    if (answerGuess === correctAnswer) {
      score++;
      scoreTracker();
      $('#quiz-render').html(
      `<h1 class="results">KILLER</h1>
      <p class="results">Nailed it! That's right, the correct answer was ${correctAnswer}.</p>
      <a href="/Users/TrevorOsterman/Projects/quiz-app/question-page.html" class="continueLink">Continue</a>`
    )} else {
      $('#quiz-render').html(
      `<h1 class="results">YOU DIED</h1>
      <p class="results">Sorry! The answer we were looking for was ${correctAnswer}.</p>
      <a href="/Users/TrevorOsterman/Projects/quiz-app/question-page.html" class="continueLink">Continue</a>`)};
  }

function continueQuiz() {
  console.log('continue running');
  $("body").on("click", ".continueLink", function(event){
    event.preventDefault();
    question++;
    renderQuestions();
    questionTracker();
  })
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
  question = 10;
  if (score >= 8){
  $('#quiz-render').html(`
    <h1 class="final">Congrats, you made it out alive!</h1>
      <p class="final">Your final score is ${score}. You'd likely outsmart any horror villain. If you feel like returning to the start, click "Try again" below to go again!</p>
      <a href="index.html">Try again</a>
  `)} else if (score > 4) {
    $('#quiz-render').html(`
    <h1 class="final">Oh no! Didn't quite make it!</h1>
      <p class="final"> Cut down at the last minute! Your final score is ${score}. If you're brave enough, click "Try again" below to give it another shot!</p>
      <a href="index.html">Try again</a>
  `)} else {
    $('#quiz-render').html(`
    <h1 class="final">You didn't stand a chance.</h1>
      <p class="final">You'd be the first to die in a horror flick. Your final score is ${score}. If you're brave enough, click "Try again" below to give it another shot!</p>
      <a href="index.html">Try again</a>
  `)}
  }

function handleQuiz() {
  startQuiz();
  submitAnswer();
  continueQuiz();
  questionTracker();
  scoreTracker();
  console.log('handle quiz running');
}

$(handleQuiz);
