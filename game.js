class Quiz {
    constructor(userName, amountQuestion) {
        this.allQuestions = [];
        this.correctAnswer = 0;
        this.currentQuestion;
        this.questionCounter = 0;
        this.questionIndex = 0;
        this.userName = userName;
        this.amountQuestion = amountQuestion;
    }
    
    displayQuiz() {

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
            this.currentQuestion = this.allQuestions[this.questionIndex];
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

    checkAnswers(){
        
    let arrayToCompare = [];

    // create an array with the selected answers
    for (let i = 0; i < choices.length; i++) {
        if (choices[i].classList.contains("selected")) {
            arrayToCompare.push(choices[i].innerText);
        }
    }
    // Compare answer of user and correct answer

    // Compare the size of the 2 arrays
    if (this.currentQuestion.answer.length != arrayToCompare.length) {
        
    } else {
        // sort the arrays
        this.currentQuestion.answer.sort();
        arrayToCompare.sort();

        // Compare the answer and add points only if all is ok

        let gotWrong = false;
        let gotTrue = false;
        for (let i = 0; i < arrayToCompare.length; i++) {

            if (this.currentQuestion.answer[i] != arrayToCompare[i]) {
                gotWrong = true;
            } else {
                gotTrue = true;
            }
        }

        if (gotTrue == true && gotWrong == false) {
            console.log("Correct!!");
            this.correctAnswer++;
        }
    }

    // Reset array and remove class selected for next question
    arrayToCompare = [];
    for (let i = 0; i < choices.length; i++) {
        choices[i].classList.remove("selected");
    }
    }

    playQuiz() {
        getInputs();
        this.displayQuiz();
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


function getInputs() {
    userName = document.getElementById("userName").value;
    amountQuestion = document.getElementById("amountQuestion").value;
};



const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const category = document.getElementById("category");
const displayResultsMain = document.getElementById("results-main");
const displayResultsP = document.getElementById("results-p");
const nextButton = document.getElementById("next-button");


let quiz1 = new Quiz(userName, amountQuestion);
let json = getJSON('http://www.mocky.io/v2/5d97098b3b00001100c3134e');

for (let question of json) {
    let x = new Question(question.category, question.question, question.choices, question.answer);
    quiz1.allQuestions.push(x);
}



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

    // Check the user answers
    quiz1.checkAnswers();
    // Display the next question
    quiz1.displayQuiz();
});


