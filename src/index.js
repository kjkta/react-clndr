// @flow
import React from "react";
import moment from "moment";
import type Moment from "moment";
import * as svgs from "./svgs";

type Props = {
  initialValue?: Moment,
  dateFormat: string,
  inputStyle: { [string]: any }
};

type State = {
  value: Moment,
  showCal: boolean,
  shownMonth: Moment
};

const cellSize = 38;
const green = "#00a699";
const grey = "#6b6b6b";

const styles = {
  arrow: {
    width: 20,
    height: 20,
    padding: 5,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: grey,
    borderRadius: 3
  },
  tableCell: {
    textAlign: "center",
    userSelect: "none",
    width: cellSize
  }
};

const daysOfTheWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const getDatesInMonth = (date: Moment) => {
  const firstDayOfMonth = date.date(1);
  let weekIndex = 0;
  return [...Array(date.daysInMonth()).keys()].map(i => {
    const date = moment(firstDayOfMonth).add(i, "days");
    const dayWeekIndex = date.day();
    weekIndex = dayWeekIndex === 0 && i != 0 ? weekIndex + 1 : weekIndex;
    return {
      dayWeekIndex,
      weekIndex,
      date
    };
  });
};

const getMonthWeeks = days => {
  return [
    getDaysInWeek(days.filter(({ weekIndex }) => weekIndex === 0)),
    getDaysInWeek(days.filter(({ weekIndex }) => weekIndex === 1)),
    getDaysInWeek(days.filter(({ weekIndex }) => weekIndex === 2)),
    getDaysInWeek(days.filter(({ weekIndex }) => weekIndex === 3))
  ];
};

const getDaysInWeek = days => {
  return daysOfTheWeek.map((name, i) => {
    const dayInMonth = days.find(({ dayWeekIndex }) => dayWeekIndex === i);
    return dayInMonth ? dayInMonth : {};
  });
};

export default class DateTimePicker extends React.Component<Props, State> {
  state = {
    value: this.props.initialValue || moment(),
    showCal: true,
    shownMonth: this.props.initialValue || moment()
  };

  render() {
    const datesInMonthByWeek = getMonthWeeks(
      getDatesInMonth(this.state.shownMonth)
    );
    return (
      <div>
        <style
          dangerouslySetInnerHTML={{
            __html: `
            .arrow:active {
                outline: auto 5px ${green};
                outline-offset: -2px;
              }
        `
          }}
        />
        <input
          style={{
            ...this.props.inputStyle,
            width: "100%",
            maxWidth: 135,
            userSelect: "none",
            padding: 10,
            fontSize: 16,
            borderStyle: "solid",
            borderWidth: 1,
            borderRadius: 3,
            textAlign: "center",
            ...(this.state.showCal
              ? {
                  borderColor: green
                }
              : {})
          }}
          readOnly
          onClick={() => this.setState({ showCal: !this.state.showCal })}
          value={this.state.value.format(
            this.props.dateFormat ? this.props.dateFormat : "DD/MM/YY HH:mm"
          )}
        />
        {this.state.showCal && (
          <div
            style={{
              width: "100%",
              maxWidth: 315,
              backgroundColor: "white",
              borderRadius: 3,
              margin: "10px 0",
              border: "1px solid #eee"
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                margin: 15
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignContent: "center",
                  width: "100%"
                }}
              >
                <div
                  className="arrow"
                  style={{ ...styles.arrow, transform: "rotate(180deg)" }}
                  onClick={() =>
                    this.setState({
                      shownMonth: this.state.shownMonth.subtract(1, "month")
                    })}
                >
                  {svgs.arrow}
                </div>

                <span style={{ padding: 10, fontWeight: "bold" }}>
                  {this.state.shownMonth.format("MMMM YYYY")}
                </span>
                <div
                  className="arrow"
                  style={styles.arrow}
                  onClick={() =>
                    this.setState({
                      shownMonth: this.state.shownMonth.add(1, "month")
                    })}
                >
                  {svgs.arrow}
                </div>
              </div>
              <table
                style={{ tableLayout: "fixed", borderCollapse: "collapse" }}
              >
                <thead>
                  <tr>
                    {daysOfTheWeek.map(day => (
                      <td
                        style={{
                          ...styles.tableCell,
                          cursor: "default",
                          color: "#6b6b6b",
                          fontSize: 12
                        }}
                      >
                        {day}
                      </td>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {datesInMonthByWeek.map(weekDays => (
                    <tr style={{ height: cellSize }}>
                      {weekDays.map(
                        day =>
                          // Render days in week for each week
                          day.date ? (
                            <td
                              key={day.date.date()}
                              style={{
                                ...styles.tableCell,
                                borderWidth: 1,
                                borderStyle: "solid",
                                borderColor: "#ccc",
                                cursor: "pointer",
                                ...(day.date.isSame(this.state.value, "day")
                                  ? {
                                      borderColor: green,
                                      backgroundColor: green,
                                      color: "white"
                                    }
                                  : {})
                              }}
                              onClick={() => this.setState({ value: day.date })}
                            >
                              {day.date.date()}
                            </td>
                          ) : (
                            <td />
                          )
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  }
}
