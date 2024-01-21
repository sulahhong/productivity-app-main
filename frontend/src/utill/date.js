//현재 날짜를 불러오는 함수
export const getStringDate = (date) => {
    return date.toISOString().slice(0, 10);
  };

//현재 시간을 불러오는 함수 (초 단위)
export const getDateHourMinuteSecond = (date) => {

    const year = date.getFullYear();
    const month = date.getMonth() +1 ;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

  const formattedDate = `${year}년 ${month}월 ${day}일 ${hours}:${minutes}:${seconds}`;

  return formattedDate;
};

//현재 시간을 불러오는 함수 (분 단위)
export const getDateHourMinute = (date) => {

  const year = date.getFullYear();
  const month = date.getMonth() +1 ;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

const formattedDate = `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;

return formattedDate;
};

//현재 시간을 불러오는 함수 (분 단위), 영문
export const getDateHourMinuteEng = (date) => {

  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'};
  const formattedDate = date.toLocaleDateString('en-US', options);

return formattedDate;
};

//현재 시간을 불러오는 함수 (초 단위), 영문
export const getDateHourMinuteSecondEng = (date) => {

  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);

return formattedDate;
};