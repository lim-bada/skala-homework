console.log("dom_event.js 연결 성공!");

// HTML 요소 가져오기
const message = document.querySelector("#message");
const changeButton = document.querySelector("#change-btn");

const todoInput = document.querySelector("#todo-input");
const addButton = document.querySelector("#add-btn");
const todoList = document.querySelector("#todo-list");
const notice = document.querySelector("#notice");


// 1. 버튼 클릭 시 문구와 클래스 변경
changeButton.addEventListener("click", function () {
    message.textContent = "DOM을 이용해 문구를 변경했습니다!";
    message.classList.toggle("highlight");
});


// 2. 할 일을 추가하는 함수
function addTodo() {
    // 입력창에 작성한 값 읽기
    const todoText = todoInput.value.trim();

    // 빈 값 방지
    if (todoText === "") {
        notice.textContent = "할 일을 먼저 입력해주세요.";
        todoInput.focus();
        return;
    }

    // 새로운 li 요소 생성
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");

    // 할 일 문구를 담을 span 생성
    const todoSpan = document.createElement("span");
    todoSpan.textContent = todoText;

    // 삭제 버튼 생성
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "삭제";
    deleteButton.classList.add("delete-btn");

    // 삭제 버튼 클릭 이벤트
    deleteButton.addEventListener("click", function () {
        newTodo.remove();
        notice.textContent = `"${todoText}" 항목을 삭제했습니다.`;
    });

    // li 안에 문구와 삭제 버튼 넣기
    newTodo.appendChild(todoSpan);
    newTodo.appendChild(deleteButton);

    // ul에 새로운 li 추가
    todoList.appendChild(newTodo);

    notice.textContent = `"${todoText}" 항목을 추가했습니다.`;

    // 입력창 초기화
    todoInput.value = "";
    todoInput.focus();
}


// 추가 버튼 클릭
addButton.addEventListener("click", addTodo);


// 입력창에서 Enter 키 입력
todoInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTodo();
    }
});