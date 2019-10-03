class Question {
    constructor(category, question, choices, answer) {
        this.category = category;
        this.question = question;
        this.choices = choices;
        this.answer = answer;
    }

}


let allQuestions = [];


let json = getJSON('http://www.mocky.io/v2/5d9602fa330000869a2f8e7e');

for (let question of json) {
    let x = new Question(question.category, question.question, question.choices, question.answer);
    allQuestions.push(x);
}


const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

const questionCounterText = document.getElementById("questionCounter");
const category = document.getElementById("category");

const displayResultsMain = document.getElementById("results-main");
const displayResultsP = document.getElementById("results-p");


///// Quiz Variables /////
let currentQuestion;
let questionCounter = 0;
let correctAnswer = 0;
let wrongAnswer = 0;

function getUserInfo(){
    const userName = document.getElementById("userName");
    const amountQuestion = document.getElementById("amountQuestion");
}

function playQuiz() {
    
    getUserInfo();
    questionCounter = 0;
    wrongAnswer = 0;
    correctAnswer = 0;
    questionIndex = 0;

    displayNewQuestion();
};

function displayNewQuestion() {
    if (questionCounter >= amountQuestion.value) {
    // end game
    
    if(correctAnswer == amountQuestion.value){
        // excellent 10 / 10
        displayResultsMain.innerText = "Excellent!"
    } else if ((correctAnswer / amountQuestion.value) <= 0.9 && (correctAnswer / amountQuestion.value) >= 0.5) {
        // good job from 05 / 10 to 09 / 10
        displayResultsMain.innerText = "Good job!"
    } else {
        // could be better from 01 / 10 to 04 / 10
        displayResultsMain.innerText  = "Better luck next time!"
    }
    displayResultsP.innerText = `${userName.value}, you got ${correctAnswer} correct answers out of ${amountQuestion.value} questions!`;
    return;
    }

    // update question counter
    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + amountQuestion.value;

    // get question
    currentQuestion = allQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    // get category of this question
    category.innerText = currentQuestion.category;

    // get the possible choices for this question
    for (let i = 0; i < choices.length; i++) {
        choices[i].innerText = currentQuestion.choices[i];
    }
    // update question counter
    questionIndex++;
};

///// Event Listener /////

// Listen to the player answer
for (let i = 0; i < choices.length; i++) {
    choices[i].addEventListener("click", function () {

        // Apply class correct or incorrect according to player answer
        let classToApply = 'incorrect';

        if (choices[i].innerText == currentQuestion.answer) {
            classToApply = 'correct';
            correctAnswer++;
        } else {
            wrongAnswer++;
        }

        choices[i].classList.add(classToApply);

        // animation for right/wrong answers with set timeout
        setTimeout(() => {
            choices[i].classList.remove(classToApply);
            displayNewQuestion();
        }, 1000);

    });
};


