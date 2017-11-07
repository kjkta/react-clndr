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
  showModal: boolean,
  shownMonth: Moment
};

const styles = {
  arrow: {
    width: 20,
    height: 20,
    padding: 5,
    border: "1px solid #eee",
    borderRadius: 3
  }
};

const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getDatesInMonth = (date: Moment) => {
  const firstDayOfMonth = date.date(1);
  let weekIndex = 0;
  return [...Array(date.daysInMonth()).keys()].map(i => {
    const date = moment(firstDayOfMonth).add(i, "days");
    const dayWeekIndex = date.day();
    weekIndex = dayWeekIndex === 0 && i != 0 ? weekIndex + 1 : weekIndex;
    return {
      index: 0,
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
    showModal: true,
    shownMonth: this.props.initialValue || moment()
  };

  render() {
    const datesInMonthByWeek = getMonthWeeks(
      getDatesInMonth(this.state.shownMonth)
    );
    return (
      <div>
        <input
          style={{
            ...this.props.inputStyle,
            userSelect: "none",
            padding: 10,
            fontSize: 16
          }}
          readOnly
          onClick={() => this.setState({ showModal: !this.state.showModal })}
          value={this.state.value.format(
            this.props.dateFormat ? this.props.dateFormat : "DD/MM/YY HH:mm"
          )}
        />
        {this.state.showModal && (
          <div
            style={{
              width: "100%",
              maxWidth: 360,
              backgroundColor: "white",
              borderRadius: 5,
              margin: "10px 0",
              border: "1px solid #eee"
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                margin: 10
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
                  style={styles.arrow}
                  onClick={() =>
                    this.setState({
                      shownMonth: this.state.shownMonth.subtract(1, "month")
                    })}
                >
                  {svgs.leftArrow}
                </div>

                <span style={{ padding: "10 ", fontWeight: "bold" }}>
                  {this.state.shownMonth.format("MMMM YYYY")}
              </span>
                <div
                  style={styles.arrow}
                  onClick={() =>
                    this.setState({
                      shownMonth: this.state.shownMonth.add(1, "month")
                    })}
                >
                  {svgs.rightArrow}
                </div>
              </div>
              <table style={{ width: "100%", flex: 1}}>
                <thead>
                  <tr>{daysOfTheWeek.map(day => <td>{day}</td>)}</tr>
                </thead>
                <tbody>
                  {datesInMonthByWeek.map(weekDays => (
                    <tr>
                      {weekDays.map(
                        day =>
                          // Render days in week for each week

                          day.date ? (
                            <td
                              style={{
                                textAlign: "center",
                                cursor: "pointer",
                                ...(day.date.isSame(this.state.value, "day")
                                  ? {
                                      backgroundColor: "yellow"
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
