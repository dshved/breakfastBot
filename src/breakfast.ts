function millisecToTimeStruct(millisec: number): string {
  if (isNaN(millisec)) {
    return "";
  }
  const days = millisec / (60 * 60 * 24);
  const hours = (days - ~~days) * 24;
  const minutes = (hours - ~~hours) * 60;
  const seconds = (minutes - ~~minutes) * 60;
  return `${~~days} д. ${~~hours} ч. ${~~minutes} м. ${~~seconds} с.`;
}

export function whenBreakfast(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  let today = now.getDate();
  while (new Date(year, month, today).getDay() !== 4) {
    today++;
  }
  const breakfast = +new Date(year, month, today);
  const startDate = 1517432400;
  const oneWeekSeconds = 604800;
  const startBreakfastSeconds = 34200;
  const durationBreakfastSeconds = 10800;
  const offset = breakfast / 1000 - startDate;
  const breakfastToday = offset / (2 * oneWeekSeconds);

  if (parseInt(breakfastToday.toString(), 10) === breakfastToday) {
    const result =
      Math.floor(breakfast / 1000) +
      startBreakfastSeconds -
      Math.floor(+now / 1000);
    if (result > 0) {
      return `До завтрака осталось: ${millisecToTimeStruct(result)}`;
    } else if (result < -durationBreakfastSeconds) {
      let result = Math.floor(breakfast / 1000) - Math.floor(+now / 1000);
      return `До завтрака осталось: ${millisecToTimeStruct(
        oneWeekSeconds * 2 + result + startBreakfastSeconds,
      )}`;
    }
    return "Завтрак уже идет!🍳";
  } else {
    const result = Math.floor(breakfast / 1000) - Math.floor(+now / 1000);
    return `До завтрака осталось: ${millisecToTimeStruct(
      oneWeekSeconds + result + startBreakfastSeconds,
    )}`;
  }
}
