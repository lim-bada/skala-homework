console.log("quiz.js 연결 성공!");

// 퀴즈 데이터
const quizData = [
    {
        question: "HTML에서 가장 큰 제목을 나타내는 태그는 무엇인가요?",
        answers: [
            { text: "<h6>", correct: false },
            { text: "<p>", correct: false },
            { text: "<h1>", correct: true },
            { text: "<title>", correct: false }
        ]
    },
    {
        question: "CSS에서 클래스를 선택할 때 사용하는 기호는 무엇인가요?",
        answers: [
            { text: "#", correct: false },
            { text: ".", correct: true },
            { text: "*", correct: false },
            { text: "@", correct: false }
        ]
    },
    {
        question: "JavaScript에서 클릭 이벤트를 연결하는 메서드는 무엇인가요?",
        answers: [
            { text: "addEventListener()", correct: true },
            { text: "querySelector()", correct: false },
            { text: "createElement()", correct: false },
            { text: "textContent()", correct: false }
        ]
    },
    {
        question: "입력 요소에 작성한 값을 가져올 때 사용하는 속성은 무엇인가요?",
        answers: [
            { text: "innerHTML", correct: false },
            { text: "value", correct: true },
            { text: "classList", correct: false },
            { text: "src", correct: false }
        ]
    },
    {
        question: "JavaScript 모듈에서 다른 파일의 기능을 가져올 때 사용하는 키워드는 무엇인가요?",
        answers: [
            { text: "export", correct: false },
            { text: "return", correct: false },
            { text: "import", correct: true },
            { text: "await", correct: false }
        ]
    },
    {
    question: "CSS에서 요소의 안쪽 여백을 지정하는 속성은 무엇인가요?",
        answers: [
            { text: "margin", correct: false },
            { text: "padding", correct: true },
            { text: "border", correct: false },
            { text: "display", correct: false }
        ]
    }

];

// HTML 요소 선택
const questionNumber = document.querySelector("#question-number");
const scoreText = document.querySelector("#score");
const questionText = document.querySelector("#question");
const answerButtons = document.querySelector("#answer-buttons");
const resultMessage = document.querySelector("#result-message");

const nextButton = document.querySelector("#next-btn");

const quizBox = document.querySelector(".quiz-box");
const finalBox = document.querySelector("#final-box");
const finalScore = document.querySelector("#final-score");
const restartButton = document.querySelector("#restart-btn");

// 현재 문제 번호와 점수
let currentQuestionIndex = 0;
let score = 0;

/**
 * 현재 문제를 화면에 표시하는 함수
 */
function showQuestion() {
    resetQuestion();

    const currentQuestion = quizData[currentQuestionIndex];

    questionNumber.textContent =
        `문제 ${currentQuestionIndex + 1} / ${quizData.length}`;

    scoreText.textContent = `점수: ${score}`;

    questionText.textContent = currentQuestion.question;

    // 보기 버튼 생성
    currentQuestion.answers.forEach(function (answer) {
        const button = document.createElement("button");

        button.type = "button";
        button.textContent = answer.text;
        button.classList.add("answer-btn");

        // 정답 여부를 data 속성으로 저장
        button.dataset.correct = answer.correct;

        button.addEventListener("click", selectAnswer);

        answerButtons.appendChild(button);
    });
}

/**
 * 이전 문제의 보기와 결과를 초기화하는 함수
 */
function resetQuestion() {
    nextButton.hidden = true;

    resultMessage.textContent =
        "정답이라고 생각하는 보기를 선택하세요.";

    resultMessage.classList.remove(
        "correct-message",
        "wrong-message"
    );

    answerButtons.innerHTML = "";
}

/**
 * 사용자가 보기를 선택했을 때 실행되는 함수
 */
function selectAnswer(event) {
    const selectedButton = event.target;

    const isCorrect =
        selectedButton.dataset.correct === "true";

    if (isCorrect) {
        selectedButton.classList.add("correct");

        resultMessage.textContent = "정답입니다! 🎉";
        resultMessage.classList.add("correct-message");

        score++;
        scoreText.textContent = `점수: ${score}`;
    } else {
        selectedButton.classList.add("wrong");

        resultMessage.textContent =
            "오답입니다. 😅";

        resultMessage.classList.add("wrong-message");
    }

    // 모든 보기 버튼 확인
    const buttons =
        answerButtons.querySelectorAll(".answer-btn");

    buttons.forEach(function (button) {
        // 정답 버튼은 초록색으로 표시
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }

        // 한 번 선택한 뒤에는 재선택하지 못하도록 비활성화
        button.disabled = true;
    });

    nextButton.hidden = false;
}

/**
 * 다음 문제로 이동하는 함수
 */
function moveToNextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {
        showFinalResult();
    }
}

/**
 * 마지막 결과를 표시하는 함수
 */
function showFinalResult() {
    quizBox.hidden = true;
    finalBox.hidden = false;

    finalScore.textContent =
        `총 ${quizData.length}문제 중 ${score}문제를 맞혔습니다.`;
}

/**
 * 퀴즈를 처음부터 다시 시작하는 함수
 */
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;

    quizBox.hidden = false;
    finalBox.hidden = true;

    showQuestion();
}

// 다음 문제 버튼 클릭
nextButton.addEventListener("click", moveToNextQuestion);

// 다시 풀기 버튼 클릭
restartButton.addEventListener("click", restartQuiz);

// 첫 문제 출력
showQuestion();