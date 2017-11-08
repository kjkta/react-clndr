// @flow
import React from "react";
import moment from "moment";
import type Moment from "moment";
import * as svgs from "./svgs";

type Props = {
  initialValue?: Moment,
  dateFormat: string,
  inputStyle: { [string]: any },
  onChange: (value: Moment) => any
};

type State = {
  value: Moment,
  showCal: boolean,
  shownMonth: Moment,
  showMinSelect: boolean
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
    borderRadius: 3,
    cursor: "pointer"
  },
  calCell: {
    textAlign: "center",
    userSelect: "none",
    width: cellSize
  },
  timeCell: {
    height: "100%",
    padding: "0 10px",
    cursor: "pointer",
    userSelect: "none",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#ccc",
    display: "flex",
    alignItems: "center"
  },
  selected: {
    borderColor: green,
    backgroundColor: green,
    color: "white"
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
  constructor(props: Props) {
    super(props);
    const definedInitialValue = props.initialValue || moment();
    const roundedInitialValue = definedInitialValue.set(
      "minutes",
      Math.round(definedInitialValue.get("minutes") / 15) * 15
    );
    this.state = {
      value: roundedInitialValue.clone(),
      showCal: false,
      shownMonth: roundedInitialValue.clone(),
      showMinSelect: false
    };
  }
  cal = {};

  componentDidUpdate() {
    this.state.showCal && this.cal.focus();
  }

  handleDateSelect(date: Moment) {
    const value = this.state.value.set({
      year: date.get("year"),
      month: date.get("month"),
      date: date.get("date")
    });
    this.setState({ value });
    this.props.onChange(value);
  }

  handleHourSelect(hr: number) {
    const value = this.state.value.hour(hr);
    this.setState({ value, showMinSelect: true });
    this.props.onChange(value);
  }

  handleMinSelect(min: number) {
    const value = this.state.value.minute(min);
    this.setState({ value, showCal: false });
    this.props.onChange(value);
  }

  render() {
    const datesInMonthByWeek = getMonthWeeks(
      getDatesInMonth(this.state.shownMonth)
    );
    console.log(this.state);
    return (
      <div>
        <style
          dangerouslySetInnerHTML={{
            __html: `
            .date-time-picker-arrow:active {
                outline: auto 5px ${green};
                outline-offset: -2px;
              }
        `
          }}
        />
        <input
          readOnly
          style={{
            ...this.props.inputStyle,
            width: "100%",
            maxWidth: 150,
            userSelect: "none",
            padding: 10,
            fontSize: 16,
            borderStyle: "solid",
            borderWidth: 1,
            borderRadius: 3,
            textAlign: "center",
            ...(this.state.showCal
              ? {
                  borderColor: green,
                  outline: "auto 5px " + green,
                  outlineOffset: -2
                }
              : {})
          }}
          onFocus={() => {
            this.setState({ showCal: !this.state.showCal });
          }}
          value={this.state.value.format(
            this.props.dateFormat ? this.props.dateFormat : "DD/MM/YY HH:mm"
          )}
        />
        {this.state.showCal && (
          <div
            ref={ref => (this.cal = ref)}
            style={{
              width: "100%",
              maxWidth: 315,
              backgroundColor: "white",
              borderRadius: 3,
              margin: "10px 0",
              border: "1px solid #eee",
              outline: 0
            }}
            tabIndex="-1"
            onBlur={() => this.setState({ showCal: false })}
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
                  alignItems: "center",
                  width: "100%"
                }}
              >
                <div
                  className="date-time-picker-arrow"
                  style={{ ...styles.arrow, transform: "rotate(180deg)" }}
                  onClick={() =>
                    this.setState({
                      shownMonth: this.state.shownMonth.subtract(1, "month")
                    })}
                >
                  {svgs.arrow}
                </div>

                <span style={{ fontWeight: "bold", userSelect: "none" }}>
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
                style={{
                  tableLayout: "fixed",
                  borderCollapse: "collapse",
                  margin: "15 0"
                }}
              >
                <thead>
                  <tr>
                    {daysOfTheWeek.map(day => (
                      <td
                        style={{
                          ...styles.calCell,
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
                                ...styles.calCell,
                                borderWidth: 1,
                                borderStyle: "solid",
                                borderColor: "#ccc",
                                cursor: "pointer",
                                ...(day.date.isSame(this.state.value, "day")
                                  ? styles.selected
                                  : {})
                              }}
                              onClick={() => this.handleDateSelect(day.date)}
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
              <div
                style={{
                  width: "100%",
                  height: 30,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                {this.state.showMinSelect ? (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                      style={{
                        ...styles.timeCell,
                        fontWeight: "bold",
                        color: green,
                        borderColor: green
                      }}
                      onClick={() => this.setState({ showMinSelect: false })}
                    >
                      {this.state.value.hour()}
                    </div>
                    <div style={{ padding: "0 10", fontWeight: "bold" }}>:</div>
                  </div>
                ) : (
                  <div style={{ marginRight: 10, userSelect: "none" }}>
                    Hour:
                  </div>
                )}
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    overflowX: "scroll",
                    paddingTop: 10,
                    paddingBottom: 10
                    // boxShadow: "inset -10px 0px 5px 1px #aaaaaa"
                  }}
                >
                  {this.state.showMinSelect
                    ? ["00", "15", "30", "45"].map(min => {
                        return (
                          <div
                            style={{
                              ...styles.timeCell,
                              ...(Number(min) === this.state.value.minute()
                                ? styles.selected
                                : {})
                            }}
                            onClick={() => this.handleMinSelect(Number(min))}
                          >
                            {min}
                          </div>
                        );
                      })
                    : [...Array(24).keys()].reverse().map(hour => (
                        <div
                          style={{
                            ...styles.timeCell,
                            ...(hour === this.state.value.hour()
                              ? styles.selected
                              : {})
                          }}
                          onClick={() => this.handleHourSelect(hour)}
                        >
                          {hour}
                        </div>
                      ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
