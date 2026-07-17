// 1. 변수, 숫자, 연산자 실습

const calculateButton = document.querySelector("#calculate-btn");
const calculateResult = document.querySelector("#calculate-result");

calculateButton.addEventListener("click", function () {
    const firstNumber = 50;
    const secondNumber = 60;

    const total = firstNumber + secondNumber;

    calculateResult.textContent =
        `${firstNumber} + ${secondNumber} = ${total}`;
});


// 2. 조건문 실습

const ageInput = document.querySelector("#age-input");
const ageButton = document.querySelector("#age-btn");
const ageResult = document.querySelector("#age-result");

ageButton.addEventListener("click", function () {
    const age = Number(ageInput.value);

    if (ageInput.value === "") {
        ageResult.textContent = "나이를 입력해주세요.";
        return;
    }

    if (age >= 21) {
        ageResult.textContent = "성인입니다.";
    } else {
        ageResult.textContent = "미성년자입니다.";
    }
});


// 3. 배열과 반복문 실습

const showArrayButton = document.querySelector("#show-array-btn");
const arrayResult = document.querySelector("#array-result");

const subjects = [
    "HTML",
    "CSS",
    "JavaScript"
];

showArrayButton.addEventListener("click", function () {
    let output = "";

    for (let i = 0; i < subjects.length; i++) {
        output += `${i + 1}. ${subjects[i]} `;
    }

    arrayResult.textContent = output;

    console.log("현재 과목 배열:", subjects);
});


// 4. 배열 항목 추가 실습

const subjectInput = document.querySelector("#subject-input");
const addSubjectButton = document.querySelector("#add-subject-btn");
const subjectResult = document.querySelector("#subject-result");

addSubjectButton.addEventListener("click", function () {
    const newSubject = subjectInput.value.trim();

    if (newSubject === "") {
        subjectResult.textContent = "추가할 과목을 입력해주세요.";
        return;
    }

    subjects.push(newSubject);

    subjectResult.textContent =
        `${newSubject} 과목이 추가되었습니다.`;

    console.log("과목 추가 후 배열:", subjects);

    subjectInput.value = "";
});