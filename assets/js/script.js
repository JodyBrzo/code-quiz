//access the unordered list from the HTML
let quizList = document.querySelector("#quiz-list");
//Keep track of what question we are currently on
let questionNumber = 0;
//set timer variable
let secondsLeft = 0;
//id of timer object
let timerInterval;
//array to retrieve scores from local storage
let highScores=[];

//object containg all of our quesitons, possible choices and correct answer
let masterQuiz =
  [
    {
      question: "question 1",
      choice: ["choice A", "choice B", "choice C", "choice D"],
      answer: 1
    },

    {
      question: "question 2",
      choice: ["choice A", "choice B", "choice C", "choice D"],
      answer: 0
    },

    {
      question: "question 3",
      choice: ["choice A", "choice B", "choice C", "choice D"],
      answer: 2
    },

    {
      question: "question 4",
      choice: ["choice A", "choice B", "choice C", "choice D"],
      answer: 1
    },

    {
      question: "question 5",
      choice: ["choice A", "choice B", "choice C", "choice D"],
      answer: 3
    }
  ];

  //add event listeners and show/hide necessary items
  $(document).ready(function () 
  {
    $("#startQuizButton").on("click", function() 
    {
      startQuiz();
    });
  
    $("#quiz-list button").on("click", function(event) 
    {
      quizListButton(event);
    });

    $("#playerInitials").on("click", function(){ //hide last answer when user clicks in the text box
      clearPlayerInitialsTextBox();
    });

    $("#highScoresLink").on("click", function(){ 
      showHighScores();
    });

    $("#goBack").on("click", function(){ 
      startOver();
    });

    $("#clearHighScores").on("click", function(){ 
      clearHighScores();
    });

    $("#playerInitialsButton").on("click", function(){ 
      setUserScore();
      showHighScores();
    });

    loadHighScores();
    setTimer();
  });

  function startQuiz()
  {
    $("#startQuiz").addClass("d-none"); //hide
    $("#quizQuestions").removeClass("d-none"); //show
    startTimer();
    showQuestions();  //go to show questions function
  }

  function loadHighScores()
  {
    var highScoresArray = localStorage.getItem("highScores");
    if (highScoresArray) //if not undefined
    {
      highScores = JSON.parse(highScoresArray);
    }
    else
    {
      localStorage.setItem("highScores",JSON.stringify(highScores));
    }
  }

  function quizListButton(event)
  {
    var button = event.target;  //get the button that was clicked
    var buttonIndex = $(button).attr("data-index"); //get the index of the button clicked
    buttonIndex = parseInt(buttonIndex,10); //convert index to int
    checkAnswer(buttonIndex); //go to check abnswer function and pass it the index of the clicked button
  }

  function clearPlayerInitialsTextBox()
  {
    $("#answer").addClass("d-none");
  }

  function showHighScores()
  {
    $("#header").addClass("d-none");
    $("#startQuiz").addClass("d-none");
    $("#quizQuestions").addClass("d-none");
    $("#quizFinish").addClass("d-none");
    $("#highScores").removeClass("d-none");
  }

  function setUserScore()
  {
    var score = 
    {
      initials: $("#playerInitials").val(),
      score: secondsLeft
    }

    highScores.push(score);
    localStorage.setItem("highScores",JSON.stringify(highScores));

  }
  function startOver()
  {
    $("#header").removeClass("d-none");
    $("#startQuiz").removeClass("d-none");
    $("#quizQuestions").addClass("d-none");
    $("#highScores").addClass("d-none");
  }

  function clearHighScores()
  {

  }

  function setTimer() 
  {
    secondsLeft = 0;
    $("#timerValue").html(secondsLeft);
  }

  function startTimer()
  {
    secondsLeft = 75;
    timerInterval = setInterval(function() {
      secondsLeft--;
      $("#timerValue").html(secondsLeft);
      if(secondsLeft === 0) {
        clearInterval(timerInterval);
      }
    }, 1000);
  }

  function stopTimer()
  {
    clearInterval(timerInterval);
  }

//function to render the questions on the screen
function showQuestions() {
  //get the question from the object masterQuiz based on the variable questionNumber to tell what question we are on  
  var question = masterQuiz[questionNumber].question;
  //set the h1 element questionContent to the question
  $("#questionContent").html(question);
  $("#answer").addClass("d-none");

  //array of choices
  var choices = masterQuiz[questionNumber].choice;

  var buttons = $("#quiz-list button"); //array of buttons from the ul

  for (var i = 0; i < choices.length; i++) {
    $(buttons[i]).html(choices[i]);  //set the text of the button to the corrosponding choice
  }
}

//function to compare user choice to the answer
function checkAnswer(buttonIndex)
{
    if (questionNumber < masterQuiz.length -1) //cehck the answer and show the next question as long as it is not the last question
    {
      var answerStatus = $("#answerStatus"); //html paragraph to display correct or wrong
      var answer = masterQuiz[questionNumber].answer; //get the answer from the wuesion object

      if (answer === buttonIndex)  //compare the answer to the user choice
      {
        answerStatus.html("Correct"); //display correct
      }
      else
      {
        answerStatus.html("Wrong"); //display wrong 
        secondsLeft -= 10;  //subtract 10 seconds from the timer.
      }

      $("#answer").removeClass("d-none");  //show the answer section
      setTimeout(() => {  //set a 1 second timer to pause the screen so the user can see if they chose correctly before displaying the next set of questions
        questionNumber++;  //increment the question counter
        showQuestions(); //go to the function to show the next question
      }, 1000);
    }
    else  //if this is the last question, there are no more to show, go to the "All Done" page
    {
      $("#quizQuestions").addClass("d-none"); //hide the quesions
      $("#quizFinish").removeClass("d-none"); //show the All Done page
      $("#answer").removeClass("d-none");     //show the last answer 
      stopTimer();
    }
}