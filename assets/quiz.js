//variables
var startBtn = document.getElementById('start')
var timerEl = document.getElementById('countdown')
var quiz = document.getElementById('quiz');
var results = document.getElementById('results');
var submitButton = document.getElementById('submit');
var multipleQuestions = [
    {
    question: "Which general term refers to all kinds of harmful software, including viruses and spyware?",
    answers: {
        1: "Hardware",
        2: "Malware",
        3: "Warehouse",
        4: "Trojans", 
    },
    theAnswer: 2,
}, {
    question: "CPU stands for...?",
    answers: {
        1: "Central Processing Unit",
        2: "Critical Patch Update",
        3: "Chest Pain Units",
        4: "Cost Per Unit", 
    },
    theAnswer: 1,
}, {
    question: "What two passwords are reported to have been regularly used in the early 2000s?",
    answers: {
        1: "123456",
        2: "Password",
        3: "Both A & B",
        4: "Only A",
    },
    theAnswer: 3,
}, {
    question: "What combination of keys minimizes all open programs?",
    answers: {
        1: "Ctrl + Shift + PgDn",
        2: "Crtl + Alt + W",
        3: "Ctrl + Alt + Tab",
        4: "Windows Key + M",
    },
    theAnswer: 4,
    }
];


// Functions
function Quiz() {
    var output =[];
    multipleQuestions.forEach(
        //current value and the index
        // use template literals 
    (currentQuestion, questionNumber) => {
        // store possible answers
        var answers = [];
        //for each available answer
        for(number in currentQuestion.answers) {

            // add a radio button
            answers.push(
                //use back-tick to save on code
                `<label>
                <input type="radio" name="question${questionNumber}" value="${number}"> </input>
                ${number} :
                ${currentQuestion.answers[number]}
             </label>`
            );
        }
        // add question and its answers to the output
        output.push(
            `<div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join('')} </div>`
            );
        }
    );
            
        //combine into one
        quiz.innerHTML = output.join('');
}

function showResults() {
    //get answer containers from quiz
    var answerContainers = quiz.querySelectorAll('.answers');

    //keep track of user's answers
    var correctAnswers = 0;

    //For Each question loop
    multipleQuestions.forEach( (currentQuestion, questionNumber) => {
        
        //find answers
        var answerContainer = answerContainers[questionNumber];
        var selector = `input[name=question${questionNumber}]:checked`;
        var userAnswer = (answerContainer.querySelector(selector) || {}).value;

        //if answer is correct
        if(userAnswer === currentQuestion.theAnswer) {
            //add to the number of correct answers
            correctAnswers++;

            // color the answers green
            answerContainers[questionNumber].style.color = 'lightgreen';
        }
        //if answer is wrong
        else {
            // color is red
            answerContainers[questionNumber].style.color = 'red';
            //sec -=10; I should be able to subtract time but it wont
        }
    });
    //show correct answers 
    results.innerHTML = `${correctAnswers} out of ${multipleQuestions.length}`;
}

function countdown () {
    var sec = 30;
    var timer = setInterval(function() {
        if(sec >=0) {
            timerEl.innerHTML = sec;
            sec--;
        }
        else {
            clearInterval(timer)
            timerEl.innerHTML ="";
        }
    }, 1000);
}


startBtn.onclick=countdown


//display Quiz
Quiz();

//Show results after Submit
submitButton.addEventListener('click', showResults);
