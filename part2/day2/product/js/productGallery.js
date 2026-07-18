const themeButton = document.querySelector("#theme-button");
const body = document.body;

/**
 * 현재 테마에 맞게 버튼의 문구와 접근성 속성을 변경한다.
 */
function updateThemeButton() {
    const isDarkMode = body.classList.contains("dark");

    if (isDarkMode) {
        themeButton.textContent = "☀️ 라이트";
        themeButton.setAttribute("aria-pressed", "true");
    } else {
        themeButton.textContent = "🌙 다크";
        themeButton.setAttribute("aria-pressed", "false");
    }
}

/**
 * 이전에 저장한 테마가 있으면 다시 적용한다.
 */
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    body.classList.add("dark");
}

updateThemeButton();

/**
 * 다크모드 버튼 클릭 이벤트
 */
themeButton.addEventListener("click", function () {
    body.classList.toggle("dark");

    const isDarkMode = body.classList.contains("dark");

    if (isDarkMode) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }

    updateThemeButton();
});