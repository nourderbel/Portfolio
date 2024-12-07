const questions = [
    {
        question: "Quelle est la syntaxe correcte pour afficher 'Hello World' dans la console ?",
        answer: [
            { text: "console.log('Hello World');", correct: true },
            { text: "print('Hello World');", correct: false },
            { text: "echo 'Hello World';", correct: false },
            { text: "log.console('Hello World');", correct: false },
        ],
    },
    {
        question: "Quel mot-clé est utilisé pour déclarer une variable en JavaScript ?",
        answer: [
            { text: "var", correct: true },
            { text: "int", correct: false },
            { text: "float", correct: false },
            { text: "char", correct: false },
        ],
    },
    {
        question: "Lequel des éléments suivants n'est pas un type de données JavaScript ?",
        answer: [
            { text: "String", correct: false },
            { text: "Number", correct: false },
            { text: "Boolean", correct: false },
            { text: "Float", correct: true },
        ],
    },
    {
        question: "Quel est le résultat de `typeof null` en JavaScript ?",
        answer: [
            { text: "null", correct: false },
            { text: "object", correct: true },
            { text: "undefined", correct: false },
            { text: "string", correct: false },
        ],
    },
    {
        question: "Quelle méthode est utilisée pour convertir JSON en objet JavaScript ?",
        answer: [
            { text: "JSON.parse()", correct: true },
            { text: "JSON.stringify()", correct: false },
            { text: "JSON.convert()", correct: false },
            { text: "JSON.objectify()", correct: false },
        ],
    },
    {
        question: "À quoi fait référence le mot-clé 'this' en JavaScript ?",
        answer: [
            { text: "L'objet courant", correct: true },
            { text: "L'objet global", correct: false },
            { text: "L'objet parent", correct: false },
            { text: "L'élément DOM", correct: false },
        ],
    },
    {
        question: "Quelle méthode ajoute un ou plusieurs éléments à la fin d'un tableau ?",
        answer: [
            { text: "push()", correct: true },
            { text: "pop()", correct: false },
            { text: "shift()", correct: false },
            { text: "unshift()", correct: false },
        ],
    },
    {
        question: "Lequel des éléments suivants est utilisé pour créer une fonction asynchrone ?",
        answer: [
            { text: "async", correct: true },
            { text: "await", correct: false },
            { text: "setTimeout", correct: false },
            { text: "then", correct: false },
        ],
    },
    {
        question: "Que fait l'opérateur '===' en JavaScript ?",
        answer: [
            { text: "Compare seulement les valeurs", correct: false },
            { text: "Compare les valeurs et les types", correct: true },
            { text: "Assigne une valeur", correct: false },
            { text: "Aucune des réponses ci-dessus", correct: false },
        ],
    },
    {
        question: "Quelle méthode peut être utilisée pour sélectionner un élément HTML par son ID ?",
        answer: [
            { text: "document.getElementById()", correct: true },
            { text: "document.querySelector()", correct: false },
            { text: "document.selectElement()", correct: false },
            { text: "document.getElementByClass()", correct: false },
        ],
    },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Suivant";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButton.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();
    questionElement.innerHTML = `Votre score est ${score} sur ${questions.length}!`;
    nextButton.innerHTML = "Recommencer";
    nextButton.style.display = "block";
    nextButton.addEventListener("click", startQuiz);
}

startQuiz();
