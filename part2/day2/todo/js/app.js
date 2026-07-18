import {
    loadTodos,
    saveTodos,
    createTodo
} from "./storage.js";

/* HTML 요소 가져오기 */
const todoInput = document.querySelector("#todo-input");
const addButton = document.querySelector("#add-btn");
const todoList = document.querySelector("#todo-list");
const filterSection = document.querySelector(".filter-section");
const totalCount = document.querySelector("#total-count");
const completedCount = document.querySelector("#completed-count");
const quote = document.querySelector("#quote");

/* 저장된 할 일 불러오기 */
let todos = loadTodos();

/* 현재 선택된 필터 */
let currentFilter = "all";

/**
 * 현재 필터에 맞는 할 일만 반환한다.
 */
function getFilteredTodos() {
    if (currentFilter === "active") {
        return todos.filter(function(todo) {
            return todo.done === false;
        });
    }

    if (currentFilter === "completed") {
        return todos.filter(function(todo) {
            return todo.done === true;
        });
    }

    return todos;
}

/**
 * 할 일 목록을 화면에 출력한다.
 */
function renderTodos() {
    const filteredTodos = getFilteredTodos();

    todoList.innerHTML = "";

    if (filteredTodos.length === 0) {
        const emptyMessage = document.createElement("li");

        emptyMessage.className = "empty-message";
        emptyMessage.textContent = "표시할 할 일이 없습니다.";

        todoList.appendChild(emptyMessage);
    } else {
        filteredTodos.forEach(function(todo) {
            const todoItem = document.createElement("li");
            const checkbox = document.createElement("input");
            const todoText = document.createElement("span");
            const deleteButton = document.createElement("button");

            todoItem.className = "todo-item";
            todoItem.dataset.id = todo.id;

            if (todo.done) {
                todoItem.classList.add("completed");
            }

            checkbox.type = "checkbox";
            checkbox.className = "todo-checkbox";
            checkbox.checked = todo.done;
            checkbox.setAttribute(
                "aria-label",
                `${todo.text} 완료 여부`
            );

            todoText.className = "todo-text";
            todoText.textContent = todo.text;

            deleteButton.type = "button";
            deleteButton.className = "delete-btn";
            deleteButton.textContent = "✕";
            deleteButton.setAttribute(
                "aria-label",
                `${todo.text} 삭제`
            );

            todoItem.append(
                checkbox,
                todoText,
                deleteButton
            );

            todoList.appendChild(todoItem);
        });
    }

    updateSummary();
}

/**
 * 전체 개수와 완료 개수를 갱신한다.
 */
function updateSummary() {
    const doneCount = todos.filter(function(todo) {
        return todo.done;
    }).length;

    totalCount.textContent = todos.length;
    completedCount.textContent = doneCount;
}

/**
 * 새로운 할 일을 추가한다.
 */
function addTodo() {
    const text = todoInput.value.trim();

    if (text === "") {
        alert("할 일을 입력해주세요.");
        todoInput.focus();
        return;
    }

    const newTodo = createTodo(text);

    todos.push(newTodo);

    saveTodos(todos);
    renderTodos();

    todoInput.value = "";
    todoInput.focus();
}

/**
 * 할 일의 완료 상태를 변경한다.
 */
function toggleTodo(id) {
    todos = todos.map(function(todo) {
        if (todo.id === id) {
            return {
                ...todo,
                done: !todo.done
            };
        }

        return todo;
    });

    saveTodos(todos);
    renderTodos();
}

/**
 * 선택한 할 일을 삭제한다.
 */
function deleteTodo(id) {
    todos = todos.filter(function(todo) {
        return todo.id !== id;
    });

    saveTodos(todos);
    renderTodos();
}

/* 추가 버튼 클릭 */
addButton.addEventListener("click", function() {
    addTodo();
});

/* 입력창에서 Enter 키 입력 */
todoInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTodo();
    }
});

/*
 * 이벤트 위임
 * 각각의 할 일에 이벤트를 등록하지 않고
 * 부모 ul 요소에 한 번만 이벤트를 등록한다.
 */
todoList.addEventListener("click", function(event) {
    const todoItem = event.target.closest(".todo-item");

    if (todoItem === null) {
        return;
    }

    const id = Number(todoItem.dataset.id);

    if (event.target.matches(".todo-checkbox")) {
        toggleTodo(id);
        return;
    }

    if (event.target.closest(".delete-btn")) {
        deleteTodo(id);
    }
});

/* 필터 버튼 이벤트 */
filterSection.addEventListener("click", function(event) {
    const selectedButton =
        event.target.closest(".filter-btn");

    if (selectedButton === null) {
        return;
    }

    currentFilter = selectedButton.dataset.filter;

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    filterButtons.forEach(function(button) {
        button.classList.remove("active");
    });

    selectedButton.classList.add("active");

    renderTodos();
});

/**
 * fetch를 이용해 오늘의 한마디를 불러온다.
 */
async function loadQuote() {
    try {
        const response =
            await fetch("../data/quotes.json");

        if (!response.ok) {
            throw new Error(
                `HTTP 오류: ${response.status}`
            );
        }

        const quotes = await response.json();

        if (!Array.isArray(quotes) || quotes.length === 0) {
            throw new Error("문구 데이터가 없습니다.");
        }

        const randomIndex =
            Math.floor(Math.random() * quotes.length);

        quote.textContent = quotes[randomIndex];
    } catch (error) {
        console.error(
            "오늘의 한마디를 불러오지 못했습니다.",
            error
        );

        quote.textContent =
            "작은 실천이 큰 변화를 만듭니다.";
    }
}

/* 처음 화면 출력 */
renderTodos();
loadQuote();