import React from "react";
import {
  render,
  fireEvent,
  waitForDomChange,
  waitForElement
} from "@testing-library/react";
import { Calendar, CalendarMonthCell } from "../";

test("onChangeDate is dispatched when selecting a day", async function() {
  let today = new Date();
  let dateAfterToday = new Date();
  let dayAfterToday = today.getDate() + 1;
  dateAfterToday = dateAfterToday.setDate(dayAfterToday);
  let onChange = jest.fn();

  const { getByText, container, debug } = render(
    <Calendar initialDate={today} onChangeDate={onChange}>
      <CalendarMonthCell
        day={{
          date: today
        }}
      >
        {today.getDate()}
      </CalendarMonthCell>

      <CalendarMonthCell
        day={{
          date: dateAfterToday
        }}
      >
        {dayAfterToday}
      </CalendarMonthCell>
    </Calendar>
  );

  let tomorrowCell = container.getElementsByTagName("td")[1];
  fireEvent.click(tomorrowCell);
  expect(tomorrowCell.dataset.selected).toBe("");
  expect(onChange).toHaveBeenCalledWith(dateAfterToday);
});

test("it sets the out-of-range data selector correctly for min", function() {
  let dayBeforeMin = new Date();
  dayBeforeMin.setDate(dayBeforeMin.getDate() - 1);

  let dayAfterMin = new Date();
  dayAfterMin.setDate(dayAfterMin.getDate() + 1);

  const { container } = render(
    // Calendar to provide the context
    <Calendar min={new Date()}>
      {/* Let's just put just the day cells we need in there*/}
      <CalendarMonthCell
        day={{
          date: dayBeforeMin
        }}
      >
        Day before min
      </CalendarMonthCell>
      <CalendarMonthCell
        day={{
          date: dayAfterMin
        }}
      >
        Day after min
      </CalendarMonthCell>
    </Calendar>
  );
  expect(container.getElementsByTagName("td")[0].dataset.outOfRange).toBe("");
  expect(container.getElementsByTagName("td")[1].dataset.outOfRange).toBe(
    undefined
  );
});

test("it sets the out-of-range data selector correctly for max", function() {
  let dayBeforeMin = new Date();
  dayBeforeMin.setDate(dayBeforeMin.getDate() - 1);

  let dayAfterMin = new Date();
  dayAfterMin.setDate(dayAfterMin.getDate() + 1);

  const { container } = render(
    // Calendar to provide the context
    <Calendar max={new Date()}>
      {/* Let's just put just the day cells we need in there*/}
      <CalendarMonthCell
        day={{
          date: dayBeforeMin
        }}
      >
        Day before min
      </CalendarMonthCell>
      <CalendarMonthCell
        day={{
          date: dayAfterMin
        }}
      >
        Day after min
      </CalendarMonthCell>
    </Calendar>
  );
  expect(container.getElementsByTagName("td")[0].dataset.outOfRange).toBe(
    undefined
  );
  expect(container.getElementsByTagName("td")[1].dataset.outOfRange).toBe("");
});

test("it sets the out-of-range data selector correctly for min and max", function() {
  let dayBeforeMin = new Date();
  dayBeforeMin.setDate(dayBeforeMin.getDate() - 1);

  let dayAfterMin = new Date();
  dayAfterMin.setDate(dayAfterMin.getDate() + 1);

  let dayBeforeMax = new Date();
  dayBeforeMax.setDate(dayBeforeMax.getDate() - 1);

  let dayAfterMax = new Date();
  dayAfterMax.setDate(dayAfterMax.getDate() + 1);

  const { container } = render(
    // Calendar to provide the context
    <Calendar min={new Date()} max={new Date() + 1}>
      {/* Let's just put just the day cells we need in there*/}
      <CalendarMonthCell
        day={{
          date: dayBeforeMin
        }}
      >
        Day before min
      </CalendarMonthCell>

      <CalendarMonthCell
        day={{
          date: dayAfterMin
        }}
      >
        Day after min
      </CalendarMonthCell>
      <CalendarMonthCell
        day={{
          date: dayBeforeMax
        }}
      >
        Day before max
      </CalendarMonthCell>
      <CalendarMonthCell
        day={{
          date: dayAfterMax
        }}
      >
        Day after max
      </CalendarMonthCell>
    </Calendar>
  );
  expect(container.getElementsByTagName("td")[0].dataset.outOfRange).toBe("");

  expect(container.getElementsByTagName("td")[1].dataset.outOfRange).toBe(
    undefined
  );
  expect(container.getElementsByTagName("td")[2].dataset.outOfRange).toBe("");
});
test("it sets the out-of-range data selector correctly when there is no max or min", function() {
  let dayBeforeMin = new Date();
  dayBeforeMin.setDate(dayBeforeMin.getDate() - 1);

  let dayAfterMin = new Date();
  dayAfterMin.setDate(dayAfterMin.getDate() + 1);

  const { container } = render(
    // Calendar to provide the context
    <Calendar>
      {/* Let's just put just the day cells we need in there*/}
      <CalendarMonthCell
        day={{
          date: dayBeforeMin
        }}
      >
        Day before min
      </CalendarMonthCell>
      <CalendarMonthCell
        day={{
          date: dayAfterMin
        }}
      >
        Day after min
      </CalendarMonthCell>
    </Calendar>
  );
  expect(container.getElementsByTagName("td")[0].dataset.outOfRange).toBe(
    undefined
  );
  expect(container.getElementsByTagName("td")[1].dataset.outOfRange).toBe(
    undefined
  );
});
