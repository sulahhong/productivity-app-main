//현재 날짜를 불러오는 함수
export const getStringDate = (date) => {
    return date.toISOString().slice(0, 10);
  };