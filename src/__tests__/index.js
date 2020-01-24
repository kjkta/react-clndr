import React from "react";
import { render } from "@testing-library/react";
import { Calendar, CalendarMonthCell } from "../";

test("it sets the out-of-range data selector correctly", function() {
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
