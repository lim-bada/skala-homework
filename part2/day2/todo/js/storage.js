const STORAGE_KEY = "todoList";

/**
 * localStorage에 저장된 할 일 목록을 불러온다.
 */
export function loadTodos() {
    const savedTodos = localStorage.getItem(STORAGE_KEY);

    if (savedTodos === null) {
        return [];
    }

    try {
        const parsedTodos = JSON.parse(savedTodos);

        if (!Array.isArray(parsedTodos)) {
            return [];
        }

        return parsedTodos;
    } catch (error) {
        console.error("할 일 목록을 불러오지 못했습니다.", error);
        return [];
    }
}

/**
 * 현재 할 일 배열을 localStorage에 저장한다.
 */
export function saveTodos(todos) {
    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(todos)
        );
    } catch (error) {
        console.error("할 일 목록을 저장하지 못했습니다.", error);
    }
}

/**
 * 입력받은 내용으로 새로운 할 일 객체를 만든다.
 */
export function createTodo(text) {
    return {
        id: Date.now(),
        text: text,
        done: false
    };
}