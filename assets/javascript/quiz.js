
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


let totalscore = "Something! (we will put a randomised image under this?)";
endPage.classList.add('hide');
//Questions and answers 
var questionIndex = [
    {
        question: "Which word best describes your approach to decision-making?",
        answer:["Logical", "Intuitive", "Impulsive"] ,
         
    },
    {
        question: "Which of the following best describes your communication style?",
        answer:["Direct and to the point", "Diplomatic and tactful", "Expressive and enthusiastic"] ,
         
    },
    {
        question: "How do you typically respond to stress?",
        answer:["By working harder and staying focused", "By seeking support and talking to others", "By avoiding the situation altogether"] ,
        
    },
    {
        question: "How would you describe your level of assertiveness?",
        answer:["Very assertive", "Moderately assertive", "Not very assertive"] ,
        
    },
    {
        question: "Which of the following best describes your attitude towards rules and authority?",
        answer:["Respectful and compliant", "Skeptical and questioning", "Rebellious and defiant"] ,
    },
    
    {
        question: "How do you typically handle criticism or negative feedback?",
        answer:["By taking it as an opportunity to learn and improve", "By becoming defensive or angry", "By feeling hurt and withdrawing"] ,
    },

    {
        question: "How do you prefer to spend your free time?",
        answer:["Engaging in physical activities", "Pursuing creative hobbies", "Relaxing and unwinding at home"] ,
    },

    {
        question: "Which of the following best describes your level of risk-taking?",
        answer:["Very willing to take risks and try new things", "Moderately willing to take risks", "Not willing to take risks and preferring safety"] ,
    },

    {
        question: "Which of the following best describes your level of self-discipline?",
        answer:["Very disciplined and able to stick to routines and schedules", "Moderately disciplined, but sometimes struggle with consistency", "Not very disciplined and often struggle to stay on track"] ,
    },

    {
        question: "Which of the following best describes your level of empathy towards others?",
        answer:["Very empathetic and attuned to others' emotions", "Moderately empathetic", "Not very empathetic"] ,
    },

    {
        question: "How do you make decisions?",
        answer:["By relying on your intuition", "By carefully weighing all options", "By seeking advice and input from others"] ,
    },

    {
        question: "Do you like cats or dogs more?",
        answer:["Cats", "Dogs",] ,
    },
];


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
        button.innerText = answer;
        button.classList.add('btn')
        if (question.correctAnswer === answer) {
            button.dataset.correct = true
        }
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
    const answerChosen = e.target
    const correct = answerChosen.dataset.correct;
   
       
        
    answerChosen.classList.add('selected')
    if (currentQuestionIndex === questionShuffle.length - 1) {
        endQuiz()
    } else {
        setTimeout(() => {
            nextQuestion();
        }, 1000);
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
    endofquizresult.textContent = 'Your result is: ' + totalscore; //need to change totalscore to be the generated answer (using score)
    

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


$('#submitbtn').on('click', function(){ //on quiz finish click, loads the "random" video
    console.log('aaaaa')
    location.replace('./main.html');
});

