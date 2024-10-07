const questions = [
    {
        question: "Which is largest animal in the world?",
        answers: [
            { text: "Shark",      correct: false},
            { text: "Blue whale", correct: true },
            { text: "Elephant",   correct: false},
            { text: "Giraffe",    correct: false},
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            { text: "Vatican City", correct: true },
            { text: "Bhutan",       correct: false},
            { text: "Nepal",        correct: false},
            { text: "Sri Lanka",    correct: false},
        ]
    },
    {
        question: "Which is largest desert in the world?",
        answers: [
            { text: "Kalahari",    correct: false},
            { text: "Gobi",        correct: false},
            { text: "Sahara",      correct: false},
            { text: "Antarctica",  correct: true },
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            { text: "Asia",        correct: true },
            { text: "Australia",   correct: false},
            { text: "Europe",      correct: false},
            { text: "Africa",      correct: false},
        ]
    }
];

const questionElm = document.getElementById("question");
const answerBtn   = document.getElementById("answers");
const nextBtn     = document.getElementById("next-btn");

let currentQuesIndx = 0;
let score = 0;

function startQuiz(){
    currentQuesIndx = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQues = questions[currentQuesIndx];
    let questionNo = currentQuesIndx + 1;
    questionElm.innerHTML = questionNo + ". " + currentQues.question;

    currentQues.answers.forEach(answer => {
        const btn = document.createElement("button");
        btn.innerHTML = answer.text;
        btn.classList.add("btn");
        answerBtn.appendChild(btn);
        if(answer.correct){
            btn.dataset.correct = answer.correct;
        }
        btn.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextBtn.style.display = "none";
    while(answerBtn.firstChild){
        answerBtn.removeChild(answerBtn.firstChild);
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerBtn.children).forEach(btn => {
        if(btn.dataset.correct === "true"){
            btn.classList.add("correct");
        }
        btn.disabled = true;
    });
    nextBtn.style.display = "block";
}

function showScore(){
    resetState();
    questionElm.innerHTML = "You scored " + score + " out of " + questions.length + "!";
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

function handleNextButton(){
    currentQuesIndx++;
    if(currentQuesIndx < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextBtn.addEventListener("click", ()=>{
    if(currentQuesIndx < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();