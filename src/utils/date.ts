export const changeDateToFormattedString = (param: Date) => {
    const year = param.getFullYear();
    const month = param.getMonth();
    const date = param.getDate();
    const ampm = param.getHours() < 12 ? '오전' : '오후';
    let hour = param.getHours();
    const minute = param.getMinutes();
    const second = param.getSeconds();

    if (hour > 12) {
        hour -= 12;
    }

    return `${year}년 ${month}월 ${date}일 ${ampm} ${hour}시 ${minute}분 ${second}초`;
};
