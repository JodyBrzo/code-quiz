//access the unordered list from the HTML
let quizList = document.querySelector("#quiz-list");
//Keep track of what question we are currently on
let questionNumber = 0;

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

  $(document).ready(function () 
  {
    $("#startQuizButton").on("click", function (event) 
    {
      $("#startQuiz").addClass("d-none");
      $("#quizQuestions").removeClass("d-none");
      showQuestions();
    });
  
    $("#quiz-list button").on("click", function (event) 
    {
      var button = event.target;
      var buttonIndex = $(button).attr("data-index");
      buttonIndex = parseInt(buttonIndex,10);
      checkAnswer(buttonIndex);
    });

    $("#playerInitials").on("click", function(){
      $("#answer").addClass("d-none");
    });

    
  });

//fution to render the questions on the screen
function showQuestions() {
  //get the question from the object masterQuiz based on the variable questionNumber to tell what question we are on  
  var question = masterQuiz[questionNumber].question;
  //set the h1 element questionContent to the question
  $("#questionContent").html(question);
  $("#answer").addClass("d-none");

  //array of choices
  var choices = masterQuiz[questionNumber].choice;

  var buttons = $("#quiz-list button");

  for (var i = 0; i < choices.length; i++) {
    $(buttons[i]).html(choices[i]);
  }
}
function checkAnswer(buttonIndex)
{

    if (questionNumber < masterQuiz.length -1) 
    {
      var answerStatus = $("#answerStatus");
      var answer = masterQuiz[questionNumber].answer;
      if (answer === buttonIndex)
      {
        answerStatus.html("Correct");
      }
      else
      {
        answerStatus.html("Wrong");
      }
      $("#answer").removeClass("d-none");
      setTimeout(() => {
        questionNumber++;
        showQuestions();
      }, 1000);
    }
    else
    {
      $("#quizQuestions").addClass("d-none");
      $("#quizFinish").removeClass("d-none");
      $("#answer").removeClass("d-none");
    }
}