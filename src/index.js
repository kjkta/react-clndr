import React from "react";
import {
  startOfMonth,
  getDaysInMonth,
  addDays,
  getDay,
  isSameWeek,
  format,
  isAfter,
  startOfDay,
  isBefore,
  endOfDay,
  isSameDay
} from "date-fns";

const getDatesInMonth = date => {
  const firstDayOfMonth = startOfMonth(date);
  let weekIndex = 0;
  return Array.from({ length: getDaysInMonth(date) }).map((_, i) => {
    const date = addDays(firstDayOfMonth, i);
    const dayWeekIndex = getDay(date);
    weekIndex = dayWeekIndex === 0 && i != 0 ? weekIndex + 1 : weekIndex;
    return {
      dayWeekIndex:
        dayWeekIndex === 0
          ? // Make Monday the first day of the week
            6
          : dayWeekIndex - 1,
      weekIndex:
        dayWeekIndex === 0
          ? // Put Sunday in the previous week
            weekIndex - 1
          : weekIndex,
      date
    };
  });
};

const getDaysInWeek = days =>
  Array.from({
    length: 7 // There are 7 days in a week
  }).map((_, i) => {
    const dayInMonth = days.find(({ dayWeekIndex }) => dayWeekIndex === i);
    return dayInMonth ? dayInMonth : {};
  });

const sortDatesByWeeksNo = days => {
  const numberOfWeeks = days.reduce((n, day, i) => {
    let prevDay = days[i - 1];
    if (prevDay) {
      let same = isSameWeek(prevDay.date, day.date);
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

const getDatesByWeekNo = date => sortDatesByWeeksNo(getDatesInMonth(date));

const now = new Date();
const CalendarContext = React.createContext();

export function Calendar({
  initialDate = now,
  onChangeDate,
  min,
  max,
  children
}) {
  const [shownMonthDate, setShownMonthDate] = React.useState(function() {
    // Set to the first day of the month
    let monthDate = new Date(initialDate);
    monthDate.setDate(1);
    return monthDate;
  });

  const [selectedDate, setSelectedDate] = React.useState(initialDate);

  React.useEffect(
    function() {
      if (onChangeDate) {
        onChangeDate(selectedDate);
      }
    },
    [onChangeDate, selectedDate]
  );

  return (
    <CalendarContext.Provider
      value={{
        shownMonthDate,
        setShownMonthDate,
        selectedDate,
        setSelectedDate,
        min,
        max
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}

export function ChangeMonthButton({ interval = 1, children }) {
  const { setShownMonthDate } = React.useContext(CalendarContext);
  return (
    <button
      type="button"
      data-react-any-calendar-month-button=""
      onClick={function() {
        setShownMonthDate(
          date => new Date(date.setMonth(date.getMonth() + interval))
        );
      }}
    >
      {children}
    </button>
  );
}

export function CurrentMonth({ children }) {
  const { shownMonthDate } = React.useContext(CalendarContext);
  return (
    <div data-react-any-calendar-current-month="">
      {children
        ? children(shownMonthDate)
        : format(shownMonthDate, "MMMM YYYY")}
    </div>
  );
}

export function CalendarMonth({ children }) {
  return <table data-react-any-calendar-table="">{children}</table>;
}

export function CalendarMonthHeading({
  weekLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
}) {
  return (
    <thead>
      <tr>
        {weekLabels.map(day => (
          <td key={day} data-react-any-calendar-heading-cell="">
            {day}
          </td>
        ))}
      </tr>
    </thead>
  );
}

export function CalendarMonthDays({ children }) {
  const { shownMonthDate } = React.useContext(CalendarContext);
  const datesInMonthByWeek = getDatesByWeekNo(shownMonthDate);
  return (
    <tbody>
      {datesInMonthByWeek.map(function(weekDays, weekIndex) {
        return (
          <tr key={shownMonthDate + weekIndex} data-react-any-calendar-row="">
            {children(weekDays)}
          </tr>
        );
      })}
    </tbody>
  );
}

const CalendarCellContext = React.createContext();

export function CalendarMonthCell({ day, children, ...props }) {
  const { selectedDate, setSelectedDate, min, max } = React.useContext(
    CalendarContext
  );

  const isBeforeMin = min && isAfter(startOfDay(min), day.date);
  const isAfterMax = max && isBefore(endOfDay(max), day.date);
  const isInRage = !isBeforeMin || !isAfterMax;
  if (day.date) {
    return (
      <CalendarCellContext.Provider value={day}>
        <td
          key={day.date}
          tabIndex="0"
          data-react-any-calendar-cell=""
          data-out-of-range={isInRage ? "" : undefined}
          data-selected={isSameDay(day.date, selectedDate) ? "" : undefined}
          onKeyDown={
            isInRage
              ? function(e) {
                  if (e.key === "Enter") {
                    setSelectedDate(day.date);
                  }
                }
              : undefined
          }
          onClick={
            isInRage
              ? function() {
                  setSelectedDate(day.date);
                }
              : undefined
          }
          {...props}
        >
          {children}
        </td>
      </CalendarCellContext.Provider>
    );
  } else {
    // Empty cell
    // TODO: Add support for prev/next month days
    return <td></td>;
  }
}

export function CalendarMonthDayNumber() {
  const day = React.useContext(CalendarCellContext);
  return (
    <span data-react-any-calendar-day-number="">{day.date.getDate()}</span>
  );
}
