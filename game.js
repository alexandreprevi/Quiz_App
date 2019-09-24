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
let question3 = new Question('Food', 'Where does the "raclette" come from?', ['Italy', 'France', 'Switzerland', 'Austria'], 'Switzerland');
let question4 = new Question('Sport', 'Where was the 1986 World Cup held?', ['Rio de Janeiro', 'Mexico', 'Buenos Aires', 'Sao Paulo'], 'Mexico');
let question5 = new Question('Animals', 'Hammerhead and cookie-cutter are types of which large cartilaginous fish?', ['Shark', 'Dolphin', 'Whale', 'Orca'], 'Shark');
let question6 = new Question('General knowledge', 'Which artist painted The Potato Eaters?', ['Claude Monet', 'Rembrandt', 'Vincent Van Gogh', 'Leonardo Da Vinci'], 'Vincent Van Gogh');
let question7 = new Question('Mythology', 'How many labours were performed by Hercules?', ['ten', 'eleven', 'twelve', 'thirteen'], 'twelve');
let question8 = new Question('Geography', 'What is the USA state capital of California?', ['San Fransisco', 'Sacramento', 'Los Angeles', 'San Diego'], 'Sacramento');
let question9 = new Question('Language', 'What does the latin prefix "dino" (as in dinosaur) mean?', ['Giant', 'Noisy', 'Old', 'Terrible'], 'Terrible');
let question10 = new Question('Mathematics', 'The area of a circle with a radius of 56.5cms is approximately how many square meters?' ['1', '3', '5', '10'], '1');



const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

const questionCounterText = document.getElementById("questionCounter");
const category = document.getElementById("category");

const displayResults = document.getElementById("results");


/* Quiz Variables */
let currentQuestion;
let questionCounter = 0;
let correctAnswer = 0;
let wrongAnswer = 0;
let allQuestions = [question1, question2, question3];

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

    // could create different text according to the result 10/10 = excellent, from 6/10 to 9/10 = good job, from 0/10 to 5/10 = better luck next time;
    displayResults.innerText = `congrats ${userName.value}, you got ${correctAnswer} correct answers out of ${amountQuestion.value} questions!`;
    
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

    });
};