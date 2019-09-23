class Question {
    constructor(category, question, choices, answer) {
        this.category = category;
        this.question = question;
        this.choices = choices;
        this.answer = answer;
    }
}

let question1 = new Question('Geography', 'What city is the capital city of France?', ['Paris', 'Bordeaux', 'Lyon', 'Marseille'], 'Paris');
let question2 = new Question("History", 'When took place the french revolution?', ['1883', '1783', '1789', '1879'], '1789');
let question3 = new Question('Food', 'Where does the "raclette" come from?', ['Italy', 'France', 'Swiss', 'Austria'], 'Swiss');


const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const amountQuestion = document.getElementById("amountQuestion");
const questionCounterText = document.getElementById("questionCounter");
const category = document.getElementById("category");


/* Quiz Variables */
let currentQuestion;
let maxQuestion = 3;
let questionCounter = 0;
let correctAnswer = 0;
let wrongAnswer = 0;
let allQuestions = [question1, question2, question3];


function getInfo(){
    const userName = document.getElementById("userName").value;
    const endText = document.getElementById("end");
    endText.innerText = userName;
}



function PlayQuiz() {
    questionCounter = 0;
    wrongAnswer = 0;
    correctAnswer = 0;
    questionIndex = 0;

    displayNewQuestion();
};

function displayNewQuestion() {
    if (questionCounter == maxQuestion) {
        // End Game
        return window.location.assign("/end.html");
    }
    // update question counter
    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + maxQuestion;

    // get question
    currentQuestion = allQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    // get category of this question
    category.innerText = currentQuestion.category;

    // get the possible choices for this question
    for (let i = 0; i < choices.length; i++) {
        choices[i].innerText = currentQuestion.choices[i];
    }

    questionIndex++;
};

/* Event Listener */

for (let i = 0; i < choices.length; i++) {
    choices[i].addEventListener("click", function () {

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
       
        console.log(correctAnswer);
        console.log(wrongAnswer);

    });
};


PlayQuiz();