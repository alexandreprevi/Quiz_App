class Quiz {
    constructor(userName, amountQuestion) {
        this.allQuestions = [];
        this.correctAnswer = 0;
        this.wrongAnswer = 0;
        this.currentQuestion;
        this.questionCounter = 0;
        this.questionIndex = 0;
        this.userName = userName;
        this.amountQuestion = amountQuestion;
    }
    displayNewQuestion() {

        if (this.questionCounter >= this.amountQuestion.value) {

            // end game results
            if (this.correctAnswer == this.amountQuestion.value) {
                // excellent 10 / 10
                displayResultsMain.innerText = "Excellent!"
            } else if ((this.correctAnswer / this.amountQuestion.value) <= 0.9 && (this.correctAnswer / this.amountQuestion.value) >= 0.5) {
                // good job from 05 / 10 to 09 / 10
                displayResultsMain.innerText = "Good job!"
            } else {
                // could be better from 01 / 10 to 04 / 10
                displayResultsMain.innerText = "Better luck next time!"
            }
            displayResultsP.innerText = `${this.userName.value}, you got ${this.correctAnswer} correct answers out of ${this.amountQuestion.value} questions!`;
            return;
        } else {

            // update question counter
            this.questionCounter++;
            questionCounterText.innerText = this.questionCounter + "/" + this.amountQuestion.value;

            // get question
            this.currentQuestion = quiz1.allQuestions[this.questionIndex];
            question.innerText = this.currentQuestion.question;

            // get category of this question
            category.innerText = this.currentQuestion.category;

            // get the possible choices for this question
            for (let i = 0; i < choices.length; i++) {
                choices[i].style.border = "none";
                choices[i].innerText = this.currentQuestion.choices[i];
            }

            // update question index
            this.questionIndex++;
        }
    };
}

class Question {
    constructor(category, question, choices, answer) {
        this.category = category;
        this.question = question;
        this.choices = choices;
        this.answer = answer;
    }
}

function playQuiz() {
    getInputs();
    quiz1.displayNewQuestion();
};

function getInputs() {
    userName = document.getElementById("userName").value;
    amountQuestion = document.getElementById("amountQuestion").value;
};



let quiz1 = new Quiz(userName, amountQuestion);
let json = getJSON('http://www.mocky.io/v2/5d964b4033000077962f9037');

for (let question of json) {
    let x = new Question(question.category, question.question, question.choices, question.answer);
    quiz1.allQuestions.push(x);
}


const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const category = document.getElementById("category");
const displayResultsMain = document.getElementById("results-main");
const displayResultsP = document.getElementById("results-p");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("previous-button");

let arrayToCompare = [];


///// Event Listener /////


// Listen to the player answer
for (let i = 0; i < choices.length; i++) {
    choices[i].addEventListener("click", function () {

        // add class to selected answer
        choices[i].style.border = "1px solid blue";
        choices[i].classList.add("selected");
    });
};

nextButton.addEventListener("click", function () {

    
    console.log(quiz1.currentQuestion.answer);
    // create an array with the selected answers
    for (let i = 0; i < choices.length; i++) {
        if (choices[i].classList.contains("selected")) {
            arrayToCompare.push(choices[i].innerText);
        }
    }
    console.log(arrayToCompare);
    // Compare answer of user and correct answer
    if (quiz1.currentQuestion.answer == arrayToCompare) {
        quiz1.correctAnswer++;
    } else {
        quiz1.wrongAnswer++;
    }

    // Reset array and remove class selected for next question
    arrayToCompare = [];
    for (let i = 0; i < choices.length; i++) {
        choices[i].classList.remove("selected");
    }

    // Display the next question
    quiz1.displayNewQuestion();
});



/* prevButton.addEventListener("click", function (){
    quiz1.questionCounter-=2;
    quiz1.questionIndex-=2;
    quiz1.displayNewQuestion();
}); */

























/* // Listen to the player answer
for (let i = 0; i < choices.length; i++) {
    choices[i].addEventListener("click", function () {

        // Apply class correct or incorrect according to player answer
        let classToApply = 'incorrect';

        if (choices[i].innerText == quiz1.currentQuestion.answer) {
            classToApply = 'correct';
            quiz1.correctAnswer++;
        } else {
            quiz1.wrongAnswer++;
        }

        choices[i].classList.add(classToApply);

        // animation for right/wrong answers with set timeout
        setTimeout(() => {
            choices[i].classList.remove(classToApply);
            quiz1.displayNewQuestion();
        }, 1000);

    });
};
 */

