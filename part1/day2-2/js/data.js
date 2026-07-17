// 화면에 출력할 학습 데이터
export const studyData = [
    {
        id: 1,
        title: "HTML",
        description: "웹 페이지의 구조를 작성합니다."
    },
    {
        id: 2,
        title: "CSS",
        description: "웹 페이지의 디자인과 배치를 담당합니다."
    },
    {
        id: 3,
        title: "JavaScript",
        description: "웹 페이지에 동적인 기능을 추가합니다."
    },
    {
        id: 4,
        title: "JavaScript Module",
        description: "import와 export로 코드를 파일별로 분리합니다."
    }
];

// 일정 시간이 지난 후 데이터를 반환하는 비동기 함수
export function getDelayedData(delay) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(studyData);
        }, delay);
    });
}