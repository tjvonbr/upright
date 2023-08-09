// Only use this for comparing workout dates -- very fragile and needs a better solution
export function isSameDay(day1: Date, day2: Date) {
  return (
    convertUTCToLocal(day1).getFullYear() === day2.getFullYear() &&
    convertUTCToLocal(day1).getMonth() === day2.getMonth() &&
    convertUTCToLocal(day1).getDate() === day2.getDate()
  );
}

export function convertUTCToLocal(date: Date) {
  const newDate = new Date(
    date.getTime() + date.getTimezoneOffset() * 60 * 1000
  );

  const offset = date.getTimezoneOffset() / 60;
  const hours = date.getHours();

  newDate.setHours(hours - offset);

  return newDate;
}
