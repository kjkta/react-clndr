// @flow
import * as React from "react";
import dateFns from "date-fns";
import { ClickedOutside } from "./components";

const cellSize = 38;
const green = "#00a699";
const mediumGrey = "#ced2d2";
const lightGrey = "#e4e7e7";
const arrow = (
  <svg viewBox="0 0 1000 1000">
    <path d="M694.4 242.4l249.1 249.1c11 11 11 21 0 32L694.4 772.7c-5 5-10 7-16 7s-11-2-16-7c-11-11-11-21 0-32l210.1-210.1H67.1c-13 0-23-10-23-23s10-23 23-23h805.4L662.4 274.5c-21-21.1 11-53.1 32-32.1z" />
  </svg>
);

const styles = {
  arrow: {
    width: 20,
    height: 20,
    padding: 5,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: mediumGrey,
    borderRadius: 3,
    cursor: "pointer"
  },
  calCell: {
    textAlign: "center",
    userSelect: "none",
    width: cellSize
  },
  timeInput: {
    borderWidth: 0,
    textAlign: "right",
    width: 40,
    fontSize: 16,
    padding: 2.5
  },
  disabledCell: {
    color: lightGrey
  }
};

const daysOfTheWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

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
  const numberOfWeeks = Math.ceil(days.length / 7);
  return Array.from(Array(numberOfWeeks).keys()).map(weekNo =>
    getDaysInWeek(days.filter(({ weekIndex }) => weekIndex === weekNo))
  );
};

const getDatesByWeekNo = date => sortDatesByWeeksNo(getDatesInMonth(date));

type Props = {
  initialValue: Date,
  dateFormat?: string,
  inputStyle?: { [string]: any },
  calStyles?: { [string]: any },
  highlightColor: string,
  min?: Date,
  max?: Date,
  placeholder?: string,
  onChange?: (value: Date) => any
};

type State = {
  value: Date | null,
  showCal: boolean,
  shownMonth: Date
};

export default class DateTimePicker extends React.Component<Props, State> {
  static defaultProps = {
    initialValue: new Date(),
    highlightColor: green
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      value: props.initialValue,
      showCal: false,
      shownMonth: props.initialValue || new Date()
    };
  }
  cal = {};

  getSelectedStyle() {
    return {
      borderColor: this.props.highlightColor,
      backgroundColor: this.props.highlightColor,
      color: "white"
    };
  }

  handleDateSelect(date: Date) {
    let value = this.state.value;
    value = dateFns.setYear(value, dateFns.getYear(date));
    value = dateFns.setMonth(value, dateFns.getMonth(date));
    value = dateFns.setDate(value, dateFns.getDate(date));
    this.setState({ value });
    this.props.onChange && this.props.onChange(value);
  }

  handleHourSelect(hr: string) {
    hr = Number(hr);
    hr = Math.min(23, hr);
    hr = Math.max(0, hr);
    const value = dateFns.setHours(this.state.value, Number(hr));
    this.setState({ value });
    this.props.onChange && this.props.onChange(value);
  }

  handleMinSelect(min: string) {
    min = Number(min);
    min = Math.min(59, min);
    min = Math.max(0, min);
    const value = dateFns.setMinutes(this.state.value, parseInt(min));
    this.setState({ value });
    this.props.onChange && this.props.onChange(value);
  }

  render() {
    const datesInMonthByWeek = getDatesByWeekNo(this.state.shownMonth);
    return (
      <div>
        <style
          dangerouslySetInnerHTML={{
            __html: `
            .date-time-picker-arrow:active {
                outline-color: ${this.props.highlightColor};
                outline-offset: -2px;
              }
            .valid-cell:hover {
              background-color: ${lightGrey}
            }
        `
          }}
        />
        <input
          readOnly={true}
          style={this.props.inputStyle}
          onClick={() => {
            if (!this.state.showCal) {
              this.setState({ showCal: true });
            }
          }}
          placeholder={this.props.placeholder}
          value={
            this.state.value
              ? dateFns.format(
                  this.state.value,
                  this.props.dateFormat
                    ? this.props.dateFormat
                    : "DD/MM/YY HH:mm"
                )
              : ""
          }
        />
        {this.state.showCal && (
          <ClickedOutside
            onOutsideClick={e => {
              e.stopPropagation();
              this.setState({ showCal: false });
            }}
            style={{
              position: "absolute",
              width: "100%",
              maxWidth: 315,
              backgroundColor: "white",
              borderRadius: 3,
              margin: "10px 0",
              border: "1px solid #eee",
              outline: 0,
              zIndex: 50,
              ...(this.props.calStyles ? this.props.calStyles : {})
            }}
            tabIndex="-1"
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
                      shownMonth: dateFns.subMonths(this.state.shownMonth, 1)
                    })
                  }
                >
                  {arrow}
                </div>

                <span style={{ fontWeight: "bold", userSelect: "none" }}>
                  {dateFns.format(this.state.shownMonth, "MMMM YYYY")}
                </span>
                <div
                  className="date-time-picker-arrow"
                  style={styles.arrow}
                  onClick={() =>
                    this.setState({
                      shownMonth: dateFns.addMonths(this.state.shownMonth, 1)
                    })
                  }
                >
                  {arrow}
                </div>
              </div>
              <table
                style={{
                  tableLayout: "fixed",
                  borderCollapse: "collapse",
                  margin: "15px 0"
                }}
              >
                <thead>
                  <tr>
                    {daysOfTheWeek.map(day => (
                      <td
                        key={day}
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
                  {datesInMonthByWeek.map((weekDays, i) => (
                    <tr key={i} style={{ height: cellSize }}>
                      {weekDays.map((day, i) => {
                        const min =
                          this.props.min &&
                          dateFns.isAfter(
                            dateFns.startOfDay(this.props.min),
                            day.date
                          );
                        const max =
                          this.props.max &&
                          dateFns.isBefore(
                            dateFns.endOfDay(this.props.max),
                            day.date
                          );
                        // Render days in week for each week
                        return day.date ? (
                          <td
                            key={i}
                            className={min || max ? "" : "valid-cell"}
                            style={{
                              ...styles.calCell,
                              borderWidth: 1,
                              borderStyle: "solid",
                              borderColor: "#ccc",
                              cursor: "pointer",
                              ...(dateFns.isSameDay(day.date, this.state.value)
                                ? this.getSelectedStyle()
                                : {}),
                              ...(min || max ? styles.disabledCell : {})
                            }}
                            onClick={() =>
                              !(min || max) && this.handleDateSelect(day.date)
                            }
                          >
                            {dateFns.getDate(day.date)}
                          </td>
                        ) : (
                          <td key={i} />
                        );
                      })}
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
                  justifyContent: "flex-start",
                  alignItems: "center"
                }}
              >
                <label htmlFor="hour">Time: </label>
                <input
                  id="hour"
                  type="number"
                  style={styles.timeInput}
                  min={0}
                  max={23}
                  value={dateFns.getHours(this.state.value)}
                  onInput={({ target }) => {
                    this.handleHourSelect(target.value);
                  }}
                />
                :
                <input
                  type="number"
                  style={styles.timeInput}
                  min={0}
                  max={59}
                  value={dateFns.getMinutes(this.state.value)}
                  onInput={({ target }) => {
                    this.handleMinSelect(target.value);
                  }}
                />
              </div>
            </div>
          </ClickedOutside>
        )}
      </div>
    );
  }
}
