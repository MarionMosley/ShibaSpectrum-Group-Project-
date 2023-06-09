
//HTML document links for general structure and content
const quizDocumentEl = document.querySelector('#quiz')
const startBtn = document.querySelector('#startbtn')
const questionsEl = document.querySelector('#questions')
const answersEl = document.querySelector('#answers')
const timer = document.querySelector('#timer')
const scoreEl = document.querySelector('#score')
const questionContainerEl = document.getElementById('question-container')
const endPage = document.getElementById('end-screen')
const endofquizresult = document.getElementById('finalscore')
var submitBtn = document.querySelector('#submitbtn');

const result = document.querySelector('#result');
//name submission at end of quiz
submitBtn.addEventListener("click", submitName);



var currentScore = 0;

endPage.classList.add('hide');

//Questions and answers 
var questionIndex = [
    {
        question: "Which word best describes your approach to decision-making?",
        answer: [
            { text: "Logical", value: 4 },
            { text: "Intuitive", value: 2 },
            { text: "Impulsive", value: 0 }
        ]

    },

    {
        question: "Which of the following best describes your communication style?",
        answer: [
            { text: "Direct and to the point", value: 4 },
            { text: "Diplomatic and tactful", value: 2 },
            { text: "Expressive and enthusiastic", value: 0 }
        ]
    },

    {
        question: "How do you typically respond to stress?",
        answer: [
            { text: "By working harder and staying focused", value: 2 },
            { text: "By seeking support and talking to others", value: 4 },
            { text: "By avoiding the situation altogether", value: 0 }
        ]
    },

    {
        question: "How would you describe your level of assertiveness?",
        answer: [
            { text: "Very assertive", value: 4 },
            { text: "Moderately assertive", value: 2 },
            { text: "Not very assertive", value: 0 }
        ]
    },

    {
        question: "Which of the following best describes your attitude towards rules and authority?",
        answer: [
            { text: "Respectful and compliant", value: 3 },
            { text: "Skeptical and questioning", value: 2 },
            { text: "Rebellious and defiant", value: 4 }
        ]
    },

    {
        question: "How do you prefer to spend your free time?",
        answer: [
            { text: "Engaging in physical activities", value: 4 },
            { text: "Pursuing creative hobbies", value: 4 },
            { text: "Relaxing and unwinding at home", value: 2 }
        ]
    },

    {
        question: "Which of the following best describes your level of risk-taking?",
        answer: [
            { text: "Very willing to take risks and try new things", value: 4 },
            { text: "Moderately willing to take risks", value: 2 },
            { text: "Not willing to take risks and preferring safety", value: 0 }
        ]
    },

    {
        question: "Which of the following best describes your level of self-discipline?",
        answer: [
            { text: "Very disciplined and able to stick to routines and schedules", value: 4 },
            { text: "Moderately disciplined, but sometimes struggle with consistency", value: 2 },
            { text: "Not very disciplined and often struggle to stay on track", value: 0 }
        ]
    },

    {
        question: "Which of the following best describes your level of empathy towards others?",
        answer: [
            { text: "Very empathetic and attuned to others' emotions", value: 4 },
            { text: "Moderately empathetic", value: 2 },
            { text: "Not very empathetic", value: 0 }
        ]
    },

    {
        question: "How do you make decisions?",
        answer: [
            { text: "By relying on your intuition", value: 2 },
            { text: "By carefully weighing all options", value: 4 },
            { text: "By seeking advice and input from others", value: 4 }
        ]
    },

    {
        question: "Do you like cats or dogs more?",
        answer: ["Cats", "Dogs",],
        answer: [
            { text: "Cats", value: 4 },
            { text: "Dogs", value: 2 },
        ]
    },
];



// Score values
console.log(questionIndex[0].question);

var totalscore = currentScore;
/* function addScore() {
    
    currentscore = 
};*/



//randomised questions
let questionShuffle, currentQuestionIndex;




startBtn.addEventListener('click', playQuiz);

//console.log("BUTTON CLICKED!");
//Playing Quiz function
function playQuiz() {

    //start button, prevents refresh, hides button
    //.preventDefault();
    //log to make sure it works
    console.log("Started");

    startBtn.classList.add('hide');
    //so start button hides on small screens
    startBtn.classList.add('hide-small')
    questionShuffle = questionIndex.sort(() => Math.random() - .5)
    currentQuestionIndex = 0


    questionContainerEl.classList.remove('hide');
    nextQuestion();




};


function nextQuestion() {
    reset();
    if (currentQuestionIndex < questionShuffle.length) {
        showQuestion(questionShuffle[currentQuestionIndex]);
        currentQuestionIndex++;
    } else {
        endQuiz();
    }

}



function showQuestion(question) {
    questionsEl.innerText = question.question;
    question.answer.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text;
        button.classList.add('btn')


        button.addEventListener('click', answerSelect)
        answersEl.appendChild(button)
    })
}

function reset() {
    while (answersEl.firstChild) {
        answersEl.removeChild(answersEl.firstChild)
    }
}


function answerSelect(e) {
    const answerChosen = e.target;
    const selectedAnswer = questionShuffle[currentQuestionIndex - 1].answer.find(answer => answer.text === answerChosen.innerText);
    currentScore += selectedAnswer.value;
    localStorage.setItem('userScore', currentScore)


    console.log('Current Score: ', currentScore);

    answerChosen.classList.add('selected')
    if (currentQuestionIndex === questionShuffle.length - 1) {
        endQuiz()
    } else {
        setTimeout(() => {
            nextQuestion();
        }, 100);
    }

}



function endQuiz() {
    //questions and answers hidden
    console.log('quiz has ended');
    //shows endpage screen (need to make!!!)
    endPage.classList.remove('hide');
    //removes the questions/quiz section
    quizDocumentEl.classList.add('hide');
    //presents final score
    theResult();


    const randomImage = $('#random-image');
    let image;


    fetch(`http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true`,) //fetch request for random image 
        .then(response => response.json())
        .then(data => {
            console.log(data);
            image = data[0];    //gets item and assigns it to image var
            console.log(image);
            $(randomImage).append(`
            <img class='click' src=${image}>
        `);
        })
        .catch(error => console.error(error));
}



function submitName(event) {
    event.preventDefault()
    var playerNameInput = document.querySelector("#playername");
    var playerName = playerNameInput.value;
    console.log(playerName);
    localStorage.setItem('Player Name:', playerName);
    locReplace()
    //window.location.href = `main.html?name=${playerName}`;
}

function theResult() {
    let score = localStorage.getItem('userScore');

    if (score >= 26) {
        result.textContent = 'Shiba Life of the Paw-ty'
        console.log(result, score);
    } else if (score >= 15 && score <= 25) {
        result.textContent = 'The Shiba Zen Master'
        console.log(result, score);
    } else if (score >= 1 && score <= 14) {
        result.textContent = 'The Shiba Couch Potato'
        console.log(result, score);
    } else {
        console.log('error loading score');
        result.textContent = 'The Rarest Shiba (0.0001% chance of getting this)'
    }
    localStorage.setItem('Result', result.textContent );

};

//$('#submitbtn').on('click', function () { //on quiz finish click, loads the "random" video
//console.log('aaaaa')
// localStorage.setItem(playerName);
//});

function locReplace() {
    location.replace('./main.html');
}