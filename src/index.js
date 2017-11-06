// @flow
import React from "react";
import moment from "moment";
import type Moment from "moment";

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
  day: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50
  }
};

const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getDatesInMonth = (date: Moment) => {
  const firstDayOfMonth = date.date(1);
  let weekIndex = 0;
  return [...Array(date.daysInMonth()).keys()].map(i => {
    const date = moment(firstDayOfMonth).add(i, "days");
    const dayWeekIndex = date.day();
    weekIndex = dayWeekIndex === 6 ? weekIndex + 1 : weekIndex;
    return {
      index: 0,
      dayWeekIndex,
      weekIndex,
      date
    };
  });
};

export default class DateTimePicker extends React.Component<Props, State> {
  state = {
    value: this.props.initialValue || moment(),
    showModal: true,
    shownMonth: this.props.initialValue || moment()
  };

  getWeekDay(weekNo, weekDay) {
    return getDatesInMonth(this.state.shownMonth).find(
      day => day.weekIndex === weekNo && day.dayWeekIndex === weekDay
    );
  }

  render() {
    const datesInMonth = getDatesInMonth(this.state.shownMonth);
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
                margin: 20
              }}
            >
              <span style={{ padding: 10, fontWeight: "bold" }}>
                {this.state.value.format("MMMM YYYY")}
              </span>
              <table>
                <thead>
                  <tr>{daysOfTheWeek.map(day => <td>{day}</td>)}</tr>
                </thead>
                <tbody>
                  {// Get unique weekIndexs
                  [
                    ...new Set(datesInMonth.map(({ weekIndex }) => weekIndex))
                  ].map(weekNo => (
                    // Render row for each week
                    <tr>
                      {daysOfTheWeek.map((weekDay, weekDayNo) => (
                        // Render days in week for each week
                        <td>
                          {this.getWeekDay(weekNo, weekDayNo)
                            ? this.getWeekDay(weekNo, weekDayNo).date.date()
                            : ""}
                        </td>
                      ))}
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
