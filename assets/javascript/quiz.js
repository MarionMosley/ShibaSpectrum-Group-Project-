
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
        question: "Placeholder1",
        answer:["Placeholder", "Placeholder"] ,
         
    },
    {
        question: "Placeholder2",
        answer:["Placeholder", "Placeholder"] ,
         
    },
    {
        question: "Placeholder3",
        answer:["Placeholder", "Placeholder"] ,
        
    },
    {
        question: "Placeholder4",
        answer:["Placeholder", "Placeholder"] ,
        
    },
    {
        question: "Placeholder5",
        answer:["Placeholder", "Placeholder"] ,
    },
    
    {
        question: "Placeholder6",
        answer:["Placeholder", "Placeholder"] ,
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


    fetch(`http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true`, {})
        .then(response => response.json())
        .then(data => {
        console.log(data);
        image = data[0];
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

