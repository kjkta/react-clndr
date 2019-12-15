import React from "react";
import dateFns from "date-fns";

const getDatesInMonth = date => {
  const firstDayOfMonth = dateFns.startOfMonth(date);
  let weekIndex = 0;
  return Array.from({ length: dateFns.getDaysInMonth(date) }).map((_, i) => {
    const date = dateFns.addDays(firstDayOfMonth, i);
    const dayWeekIndex = dateFns.getDay(date);
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

const getDatesByWeekNo = date => sortDatesByWeeksNo(getDatesInMonth(date));

const now = new Date();
const CalendarContext = React.createContext();

export function Calendar({ initialDate = now, onChangeDate, children }) {
  const [shownMonthDate, setShownMonthDate] = React.useState(initialDate);
  const [selectedDate, setSelectedDate] = React.useState(initialDate);

  React.useEffect(
    function() {
      if (onChangeDate) {
        onChangeDate(selectedDate);
      }
    },
    [selectedDate]
  );

  return (
    <CalendarContext.Provider
      value={{
        shownMonthDate,
        setShownMonthDate,
        selectedDate,
        setSelectedDate
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
        : dateFns.format(shownMonthDate, "MMMM YYYY")}
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
  const { selectedDate, setSelectedDate } = React.useContext(CalendarContext);

  // TODO: Implement min and max date ranges
  const min = min && dateFns.isAfter(dateFns.startOfDay(min), day.date);
  const max = max && dateFns.isBefore(dateFns.endOfDay(max), day.date);
  if (day.date) {
    return (
      <CalendarCellContext.Provider value={day}>
        <td
          key={day.date}
          tabIndex="0"
          data-react-any-calendar-cell=""
          data-out-of-range={min || max ? "" : undefined}
          data-selected={
            dateFns.isSameDay(day.date, selectedDate) ? "" : undefined
          }
          onKeyDown={function(e) {
            if (e.key === "Enter") {
              setSelectedDate(day.date);
            }
          }}
          onClick={function() {
            setSelectedDate(day.date);
          }}
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
