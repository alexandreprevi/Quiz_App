class Question {
    constructor(category, question, choices, answer){
    this.category = category;
    this.question = question;
    this.choices = choices;
    this.answer = answer;
    }
}

let question1 = new Question('Geography', 'What city is the capital city of France?', ['Paris', 'Bordeaux', 'Lyon', 'Marseille'], 0);
let question2 = new Question("History", 'When took place the french revolution?', ['1883', '1783', '1789', '1879'], 2);
let question3 = new Question('Food', 'Where does the "raclette" come from?', ['Italy', 'France', 'Swiss', 'Austria'], 2);


const question = document.getElementById("question");
const choices = document.getElementsByClassName("choice-text");
const amountQuestion = document.getElementById("amountQuestion");
console.log(choices);

/* Quiz Variables */
let currentQuestion;
let questionCounter = 0;
let correctAnswer = 0;
let wrongAnswer = 0;
let allQuestions = [question1, question2, question3];






function PlayQuiz(){
    questionCounter = 0;
    wrongAnswer = 0;
    correctAnswer = 0;
    questionIndex = 0;

    displayNewQuestion();
}

function displayNewQuestion(){
    questionCounter++;
    currentQuestion = allQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    // get the possible choices for this question
    for (let i = 0; i<choices.length; i++){
        choices[i].innerText = currentQuestion.choices[i];
    }
}

PlayQuiz();