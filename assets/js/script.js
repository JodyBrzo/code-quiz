//access the unordered list from the HTML
let quizList = document.querySelector("#quiz-list");
//Keep track of what question we are currently on
let questionNumber = 0;
//set timer variable
let secondsLeft = 0;
//id of timer object
let timerInterval;
//array to retrieve scores from local storage
let highScores = [];

//object containg all of our quesitons, possible choices and correct answer
let masterQuiz =
  [
    {
      question: "Commonly used data types DO NOT include:",
      choice: ["strings", "booleans", "alerts", "number"],
      answer: 2 //alerts
    },

    {
      question: "The condition in an if / else statement is enclosed within _________.",
      choice: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: 2 //parentheses
    },

    {
      question: "Arrays in JavaScript can be used to store ________.",
      choice: ["numbers and strings", "other arrays", "booleans", "all of the above"],
      answer: 3 //all of the above
    },

    {
      question: "A very useful tool used during developement and debugging for printing content to the debugger is:",
      choice: ["JavaScript", "terminal / bash", "for loops", "console.log"],
      answer: 3 //console.log
    },

    {
      question: "String values must be enclosed within ______ when being assigned to variables.",
      choice: ["commas", "curly brackets", "quotes", "parentheses"],
      answer: 2 //quotes
    }
  ];

//add event listeners and show/hide necessary items
$(document).ready(function () {
  $("#startQuizButton").on("click", function () {
    startQuiz();
  });

  $("#playerInitials").on("click", function () { //hide last answer when user clicks in the text box
    clearPlayerInitialsTextBox();
  });

  $("#highScoresLink").on("click", function () {
    showHighScores();
  });

  $("#goBack").on("click", function () {
    startOver();
  });

  $("#clearHighScores").on("click", function () {
    clearHighScores();
  });

  $("#playerInitialsButton").on("click", function () {
    setUserScore();
  });

  bindQuestionButtons();
  loadHighScores();
  setTimer();
});

function startQuiz() {
  $("#startQuiz").addClass("d-none"); //hide
  $("#quizQuestions").removeClass("d-none"); //show
  startTimer();
  // bindQuestionButtons();
  questionNumber = 0;
  showQuestion();  //go to show questions function
}

function loadHighScores() {
  var highScoresArray = localStorage.getItem("highScores");
  if (highScoresArray) //if not undefined
  {
    highScores = JSON.parse(highScoresArray);
  }
  else {
    localStorage.setItem("highScores", JSON.stringify(highScores));
  }
}

function quizListButton(event) {
  var button = event.target;  //get the button that was clicked
  var buttonIndex = $(button).attr("data-index"); //get the index of the button clicked
  buttonIndex = parseInt(buttonIndex, 10); //convert index to int
  console.log(button);
  checkAnswer(buttonIndex); //go to check abnswer function and pass it the index of the clicked button
}

//event for when a chice button is clicked
function bindQuestionButtons() {
  $("#quiz-list button").on("click", function (event) {
    quizListButton(event);
  });
}

function unBindQuestionButtons() {
  $("#quiz-list button").off();
}

function clearPlayerInitialsTextBox() {
  $("#answer").addClass("d-none");
}

function showHighScores() {
  $("#header").addClass("d-none");
  $("#startQuiz").addClass("d-none");
  $("#quizQuestions").addClass("d-none");
  $("#quizFinish").addClass("d-none");
  $("#highScores").removeClass("d-none");

  $("#highScoresList").empty();
  for (var i = 0; i < highScores.length; i++) {
    var counter = i + 1;
    $("#highScoresList").append("<li>" + counter + ". " + highScores[i].initials + "- " + highScores[i].score + "</li>");
  }
  setTimer();
}

function setUserScore() {
  var playerInitials = $("#playerInitials");
  if (playerInitials.val() !== "") {
    var score =
    {
      initials: playerInitials.val(),
      score: secondsLeft
    }

    highScores.push(score);
    localStorage.setItem("highScores", JSON.stringify(highScores));

    playerInitials.val("");
        showHighScores();
  }
  else {
    alert("You must enter your initials to record a score.");
  }
}

function startOver() {
  $("#header").removeClass("d-none");
  $("#startQuiz").removeClass("d-none");
  $("#quizQuestions").addClass("d-none");
  $("#highScores").addClass("d-none");
}

function clearHighScores() {
  highScores = [];
  localStorage.setItem("highScores", JSON.stringify(highScores));
  $("#highScoresList").empty();
}

function setTimer() {
  secondsLeft = 0;
  $("#timerValue").html(secondsLeft);
}

function startTimer() {
  secondsLeft = 75;
  timerInterval = setInterval(function () {
    secondsLeft--;
    $("#timerValue").html(secondsLeft);
    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      $("#quizQuestions").addClass("d-none"); //hide the quesions
      $("#quizFinish").removeClass("d-none"); //show the All Done page
      $("#answer").removeClass("d-none");     //show the last answer 
      questionNumber = 0;
      stopTimer();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

//function to render the questions on the screen
function showQuestion() {
  
  if (questionNumber !== masterQuiz.length)
  {
    //get the question from the object masterQuiz based on the variable questionNumber to tell what question we are on  
    var question = masterQuiz[questionNumber].question;
    //set the h1 element questionContent to the question
    $("#questionContent").html(question);
    $("#answer").addClass("d-none");  //hiding

    //array of choices
    var choices = masterQuiz[questionNumber].choice;
    var buttons = $("#quiz-list button"); //array of buttons from the ul

    for (var i = 0; i < choices.length; i++) {
      var counter = i + 1;
      $(buttons[i]).html(counter + ". " + choices[i]);  //set the text of the button to the corrosponding choice
    }
    buttons.prop('disabled', false);
  }
  else
  {
    $("#quizQuestions").addClass("d-none"); //hide the quesions
    $("#quizFinish").removeClass("d-none"); //show the All Done page
    $("#answer").removeClass("d-none");     //show the last answer 
    $("#score").html(secondsLeft);
    questionNumber = 0;
    stopTimer();  
  }
}

//function to compare user choice to the answer
function checkAnswer(buttonIndex) {
  $("#quiz-list button").prop('disabled', true);
  if (questionNumber < masterQuiz.length) //cehck the answer and show the next question as long as it is not the last question
  {
    var answerStatus = $("#answerStatus"); //html paragraph to display correct or wrong
    var answer = masterQuiz[questionNumber].answer; //get the answer from the wuesion object
    console.log("Question: " + questionNumber + ", answer: " + answer + ", buttonIndex: " + buttonIndex);
    if (answer === buttonIndex)  //compare the answer to the user choice
    {
      answerStatus.html("Correct"); //display correct
    }
    else {
      answerStatus.html("Wrong"); //display wrong 
      secondsLeft -= 10;  //subtract 10 seconds from the timer.
    }
    $("#answer").removeClass("d-none");  //show the answer section

    questionNumber++;
    setTimeout(() => {  //set a 1 second timer to pause the screen so the user can see if they chose correctly before displaying the next set of questions
       showQuestion(); //go to the function to show the next question
    }, 1500);
  }
}