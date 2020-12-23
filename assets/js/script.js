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

//object containing all of our questions, possible choices and correct answer
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
      question: "A very useful tool used during development and debugging for printing content to the debugger is:",
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
$(document).ready(function () 
{
  $("#startQuizButton").on("click", function () {  //listener for the start quiz button
    startQuiz();
  });

  $("#playerInitials").on("click", function () { //hide last answer when user clicks in the text box
    clearPlayerInitialsTextBox();
  });

  $("#highScoresLink").on("click", function () {  //listen for when the highscores link is clicked
    showHighScores();
  });

  $("#goBack").on("click", function () {  //listener for the start over button click
    startOver();   
  });

  $("#clearHighScores").on("click", function () {  //listener for the clear highscores button
    clearHighScores();
  });

  $("#playerInitialsButton").on("click", function () {  //listener for the button that submits the plyers initials and score
    setUserScore();
  });

  bindQuestionButtons();  //call the function to listen for the choice button click
  loadHighScores();  //get the scores from local stroage
  setTimer();     //set the timer function
});

//display the proper div, start the timer and show the quesions
function startQuiz() {
  $("#startQuiz").addClass("d-none"); //hide
  $("#quizQuestions").removeClass("d-none"); //show
  startTimer();
  questionNumber = 0;
  showQuestion();  //go to show questions function
}

//get the highscores from memory and load them into an array called highScoreArray
function loadHighScores() {
  var highScoresArray = localStorage.getItem("highScores");
  if (highScoresArray) //if not undefined
  {
    highScores = JSON.parse(highScoresArray);  //make sure there is a highscores object
  }
  else {
    localStorage.setItem("highScores", JSON.stringify(highScores));  //if not make one and store it to local storage
  }
}

//get the data-index of the button clicked and send it to the checkAnswer function to see if user is right or wrong
function quizListButton(event) {
  var button = event.target;  //get the button that was clicked
  var buttonIndex = $(button).attr("data-index"); //get the index of the button clicked
  buttonIndex = parseInt(buttonIndex, 10); //convert index to int
  checkAnswer(buttonIndex); //go to check answer function and pass it the index of the clicked button
}

//event for when a choice button is clicked
function bindQuestionButtons() 
{
  $("#quiz-list button").on("click", function (event) 
  {
    quizListButton(event); //send the object clicked to the quizlist button function
  });
}

//turn off event listener
function unBindQuestionButtons() 
{
  $("#quiz-list button").off();
}

//when the user clicked inside the initials text box, hide their last answer status
function clearPlayerInitialsTextBox() 
{
  $("#answer").addClass("d-none");
}

//make sure that all the divs are hidden no matter what the user is on and show the high scores div/
function showHighScores() 
{
  $("#header").addClass("d-none");
  $("#startQuiz").addClass("d-none");
  $("#quizQuestions").addClass("d-none");
  $("#quizFinish").addClass("d-none");
  $("#highScores").removeClass("d-none");

    //use the highScores array and create list items to display the results
  $("#highScoresList").empty();
  for (var i = 0; i < highScores.length; i++) 
  {
    var counter = i + 1;
    $("#highScoresList").append("<li>" + counter + ". " + highScores[i].initials + "- " + highScores[i].score + "</li>");
  }
  setTimer();  //set timer to 0 and reset the display  - incase user clicks view highscore in the middle of a quiz
}

//write score to local storage and display the scores div
function setUserScore() 
{
  var playerInitials = $("#playerInitials");  //set the users initials to PlayerInitials from the text box
  if (playerInitials.val() !== "") { //make sure user entered something 
    var score =
    {
      initials: playerInitials.val(),  //set the values to the score object
      score: secondsLeft
    }

    highScores.push(score);  //append to the end of the score object
    localStorage.setItem("highScores", JSON.stringify(highScores));  //convert to a string and sent to local storage

    playerInitials.val("");  //clear the text box
        showHighScores();  //go get the scores and show them
  }
  else 
  {
    alert("You must enter your initials to record a score.");  //alert the user initials can not be blank to record a score
  }
}

//show only the header, initial quiz page
function startOver() 
{
  $("#header").removeClass("d-none");
  $("#startQuiz").removeClass("d-none");
  $("#quizQuestions").addClass("d-none");
  $("#highScores").addClass("d-none");
}

//when user clicks the clear scores button then clear the local array and set it to local storage and clear the UL scores line items
function clearHighScores() 
{
  highScores = [];
  localStorage.setItem("highScores", JSON.stringify(highScores));
  $("#highScoresList").empty();
}

//reset the timer and update display
function setTimer() 
{
  secondsLeft = 0;
  $("#timerValue").html(secondsLeft);
}

//start the timer
function startTimer() 
{
  secondsLeft = 75; 
  timerInterval = setInterval(function () 
  {  //every 1 second subtract a second and check if time remainig is 0
    secondsLeft--;
    $("#timerValue").html(secondsLeft);
    if (secondsLeft === 0) 
    {
      stopTimer();
      $("#quizQuestions").addClass("d-none"); //hide the quesions
      $("#quizFinish").removeClass("d-none"); //show the All Done page
      $("#answer").removeClass("d-none");     //show the last answer 
      $("#score").html(secondsLeft);
      questionNumber = 0;
    }
  }, 1000);
}

//clear the timer
function stopTimer() 
{
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

    for (var i = 0; i < choices.length; i++) 
    {
      var counter = i + 1;
      $(buttons[i]).html(counter + ". " + choices[i]);  //set the text of the button to the corresponding choice
    }
    buttons.prop('disabled', false);  //disable the buttons for clicking
  }
  else
  {
    stopTimer();
    $("#quizQuestions").addClass("d-none"); //hide the questions
    $("#quizFinish").removeClass("d-none"); //show the All Done page
    $("#answer").removeClass("d-none");     //show the last answer 
    $("#score").html(secondsLeft);
    questionNumber = 0;
  }
}

//function to compare user choice to the answer
function checkAnswer(buttonIndex) {
  $("#quiz-list button").prop('disabled', true);
  if (questionNumber < masterQuiz.length) //check the answer and show the next question as long as it is not the last question
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
      if (secondsLeft >= 10)
      {
        secondsLeft -= 10;  //subtract 10 seconds from the timer.
      }
    }
    $("#answer").removeClass("d-none");  //show the answer section

    questionNumber++;
    setTimeout(() => {  //set a 1.5 second timer to pause the screen so the user can see if they chose correctly before displaying the next set of questions
       showQuestion(); //go to the function to show the next question
    }, 1500);
  }
}