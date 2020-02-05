import React from "react";
import {
  getDaysInMonth,
  getDay,
  isSameWeek,
  format,
  isAfter,
  startOfDay,
  isBefore,
  endOfDay,
  isSameDay
} from "date-fns";

export const getDatesInMonth = date => {
  let firstDayOfMonth = new Date(date);
  firstDayOfMonth.setDate(1);
  let weekIndex = 0;
  return Array.from({ length: getDaysInMonth(date) }).map((_, dayIndex) => {
    // Get the date for this day
    let date = new Date(firstDayOfMonth);
    let dayOfMonth = date.getDate() + dayIndex;
    date.setDate(dayOfMonth);

    let weekdayIndex = getDay(date);

    if (weekdayIndex === 0) {
      // It's Sunday, increment to the next week
      weekIndex = weekIndex + 1;
    }
    return {
      dayOfMonth,
      weekdayIndex:
        weekdayIndex === 0
          ? // Make Monday the first day of the week
            6
          : weekdayIndex - 1,
      weekIndex:
        // It's Sunday
        weekdayIndex === 0 &&
        // It's not the first week of the month
        weekIndex > 0
          ? // Put the Sunday on the previous week
            weekIndex - 1
          : // Continue on the current week
            weekIndex,
      date
    };
  });
};

const getDaysInWeek = days =>
  Array.from({
    length: 7 // There are 7 days in a week
  }).map((_, i) => {
    const dayInMonth = days.find(({ weekdayIndex }) => weekdayIndex === i);
    return dayInMonth ? dayInMonth : {};
  });

const sortDatesByWeeksNo = days => {
  const numberOfWeeks = days.reduce((n, day, i) => {
    let prevDay = days[i - 1];
    if (prevDay) {
      let sameWeek = prevDay.weekIndex === day.weekIndex;
      if (!sameWeek) {
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

  return (
    <CalendarContext.Provider
      value={{
        shownMonthDate,
        setShownMonthDate,
        selectedDate,
        // Intercept date updates to dispatch onChangeDate
        setSelectedDate: async function(date) {
          setSelectedDate(date);
          if (onChangeDate) {
            onChangeDate(date);
          }
        },
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

  const isBeforeMin = min && isBefore(day.date, startOfDay(min));
  const isAfterMax = max && isAfter(day.date, endOfDay(max));
  const isInRange = !isBeforeMin && !isAfterMax;

  if (day.date) {
    return (
      <CalendarCellContext.Provider value={day}>
        <td
          key={day.date}
          tabIndex="0"
          data-react-any-calendar-cell=""
          data-out-of-range={isInRange ? undefined : ""}
          data-selected={isSameDay(day.date, selectedDate) ? "" : undefined}
          onKeyDown={
            isInRange
              ? function(e) {
                  if (e.key === "Enter") {
                    setSelectedDate(day.date);
                  }
                }
              : undefined
          }
          onClick={
            isInRange
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
