# Code-Quiz
Test your coding knowledge and beat your own time!  You have 75 seconds on the clock! Answer the questions as quickly as you can but be careful, one wrong answer will cost you 10 seconds. Try to beat your own high score with the most time left on the clock.


# Link to live site
[Code Quiz](https://jodybrzo.github.io/code-quiz/index.html)

# Technologies Used
JavaScript 63.1% HTML 26.2% CSS 10.7%

# Mock-up
![Code Quiz](assets/images/code-quiz.gif)


## Why I made this project
I made this project because I wanted to use jQuery for a cleaner way to show and hide 'pages' within the project and make it easier to access elements in the DOM.  Although this project looks like it has several different HTML pages it actually only has one HTML file.  All of the markup is written in the body of inidex.HTML and each 'page' is it's own div with a unique ID.  Using jQuery in the JavaScript file I simply access the desired div by ID and the .addClass() or .removeClass() method and pass in d-none to either show or hide the div I need to display or hide.  Example, to show the div that displays the current question and answers: " $("#quizQuestions").addClass("d-none"); ". This project also uses JSON methods to access the local storage to store the user initials and score.  Utilizing a timer the user has 75 seconds to answer the questions correctly.  A wrong answer will take a 10 second deduction off the timer resulting in a lower score for the user.  Once all of the questions are answered or the timer runs out the user is able to record their initials and remaining time as their score to the local storage. 

## What I learned
Taking the time to write this project really taught me a lot.  I enjoyed using jQuery for a more streamlined way to access and manipulate the DOM.  Being able to add and change HTML markup on the fly as the site is running was really a fun thing to see and accomplish with jQuery.  Learning how to access the local storage and that the difference between local and session storage is, I can see how this will be an important part of future projects.  I also have a much better understanding of how timers work after making this project. Overall I had a lot of fun making this and I appreciate seeing how HTML, CSS, JavaScript, Bootstrap, jQuery and JSON work together to make an application.

## Challenges 
I had a hard time thinking about how to start this project.  I decided to start with the HTML and get the pages made that I needed then went on to creating the object that holds all the questions, choices and answers in CSS.  Once I got the hang of using jQuery to show/hide the div's I needed to then things started to flow into place.
