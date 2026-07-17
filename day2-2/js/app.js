import { getDelayedData } from "./data.js";

console.log("app.js 모듈 연결 성공!");

// HTML 요소 선택
const loadButton = document.querySelector("#load-btn");
const status = document.querySelector("#status");
const dataList = document.querySelector("#data-list");

// 지연 시간: 2000ms = 5초
const delayTime = 5000;

// 버튼 클릭 이벤트
loadButton.addEventListener("click", async function () {
    console.log("1. 데이터 요청 시작");

    status.textContent = `${delayTime / 1000}초 동안 데이터를 불러오는 중입니다...`;
    dataList.innerHTML = "";

    // 중복 클릭 방지
    loadButton.disabled = true;

    try {
        // 비동기 데이터가 올 때까지 기다림
        const data = await getDelayedData(delayTime);

        console.log("2. 데이터 수신 완료", data);

        // 가져온 데이터만큼 반복
        data.forEach(function (item) {
            const listItem = document.createElement("li");
            listItem.classList.add("data-item");

            const title = document.createElement("h3");
            title.textContent = item.title;

            const description = document.createElement("p");
            description.textContent = item.description;

            listItem.appendChild(title);
            listItem.appendChild(description);

            dataList.appendChild(listItem);
        });

        status.textContent = "데이터 불러오기가 완료되었습니다.";
    } catch (error) {
        console.error("데이터 불러오기 실패:", error);

        status.textContent = "데이터를 불러오는 중 오류가 발생했습니다.";
    } finally {
        loadButton.disabled = false;
    }
});