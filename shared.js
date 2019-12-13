import dateFns from "date-fns";

export const daysOfTheWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const getDatesInMonth = date => {
  const firstDayOfMonth = dateFns.startOfMonth(date);
  let weekIndex = 0;
  return Array.from(Array(dateFns.getDaysInMonth(date)).keys()).map(i => {
    const date = dateFns.addDays(firstDayOfMonth, i);
    const dayWeekIndex = dateFns.getDay(date);
    weekIndex = dayWeekIndex === 0 && i != 0 ? weekIndex + 1 : weekIndex;
    return {
      dayWeekIndex,
      weekIndex,
      date
    };
  });
};

const getDaysInWeek = days =>
  daysOfTheWeek.map((name, i) => {
    const dayInMonth = days.find(({ dayWeekIndex }) => dayWeekIndex === i);
    return dayInMonth ? dayInMonth : {};
  });

const sortDatesByWeeksNo = days => {
  const numberOfWeeks = days.reduce((n, day, i) => {
    let prevDay = days[i - 1];
    if (prevDay) {
      let same = dateFns.isSameWeek(prevDay.date, day.date);
      if (!same) {
        return n + 1;
      }
    }
    return n;
  }, 1);
  return Array.from(Array(numberOfWeeks).keys()).map(weekNo =>
    getDaysInWeek(days.filter(({ weekIndex }) => weekIndex === weekNo))
  );
};

export const getDatesByWeekNo = date =>
  sortDatesByWeeksNo(getDatesInMonth(date));
