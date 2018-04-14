// @flow
import * as React from "react";
import dateFns from "date-fns";

const cellSize = 38;
const green = "#00a699";
const grey = "#6b6b6b";
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
  timeCell: {
    cursor: "pointer",
    userSelect: "none",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#ccc",
    textAlign: "center",
    width: cellSize,
    height: cellSize
  },
  disabledCell: {
    color: lightGrey
  }
};

const daysOfTheWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const getDatesInMonth = date => {
  const firstDayOfMonth = dateFns.startOfMonth(date);
  let weekIndex = 0;
  return [...Array(dateFns.getDaysInMonth(date)).keys()].map(i => {
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
  return [...Array(numberOfWeeks)].map((_, weekNo) =>
    getDaysInWeek(days.filter(({ weekIndex }) => weekIndex === weekNo))
  );
};

const getDatesByWeekNo = date => sortDatesByWeeksNo(getDatesInMonth(date));

const roundMinutes = (date: Date, minuteMark: number) => {
  return dateFns.setMinutes(
    date,
    Math.round(dateFns.getMinutes(date) / minuteMark) * minuteMark
  );
};

type Props = {
  initialValue?: Date,
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
  shownMonth: Date,
  showMinSelect: boolean
};

export default class DateTimePicker extends React.Component<Props, State> {
  static defaultProps = {
    highlightColor: green
  };
  constructor(props: Props) {
    super(props);
    const initialValue = props.initialValue
      ? roundMinutes(props.initialValue, 15)
      : null;
    this.state = {
      value: initialValue,
      showCal: false,
      shownMonth: initialValue || new Date(),
      showMinSelect: false
    };
  }
  cal = {};

  componentDidUpdate() {
    this.state.showCal && this.cal && this.cal.focus();
  }

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

  handleHourSelect(hr: number) {
    const value = dateFns.setHours(this.state.value, hr);
    this.setState({ value, showMinSelect: true });
    this.props.onChange && this.props.onChange(value);
  }

  handleMinSelect(min: number) {
    const value = dateFns.setMinutes(this.state.value, min);
    this.setState({ value, showCal: false });
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
          readOnly
          style={{
            userSelect: "none",
            padding: 10,
            fontSize: 14,
            borderStyle: "solid",
            borderWidth: 1,
            borderColor: mediumGrey,
            borderRadius: 3,
            color: grey,
            cursor: "pointer",
            ...(!this.state.value
              ? { textAlign: "left" }
              : { textAlign: "center" }),
            ...this.props.inputStyle
          }}
          onClick={() => {
            this.setState({ showCal: !this.state.showCal });
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
          <div
            ref={ref => (this.cal = ref)}
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
                {this.state.showMinSelect ? (
                  <React.Fragment>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          ...styles.timeCell,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontWeight: "bold",
                          color: this.props.highlightColor,
                          borderColor: this.props.highlightColor
                        }}
                        onClick={() => this.setState({ showMinSelect: false })}
                      >
                        {dateFns.getHours(this.state.value)}
                      </div>
                    </div>
                    <div style={{ padding: "0 10", fontWeight: "bold" }}>:</div>
                  </React.Fragment>
                ) : (
                  <div style={{ marginRight: 10, userSelect: "none" }}>
                    Hour:
                  </div>
                )}
                <div
                  style={{
                    overflowX: "auto",
                    marginTop: 10,
                    marginBottom: 10
                  }}
                >
                  <table
                    style={{
                      tableLayout: "fixed",
                      borderCollapse: "collapse"
                    }}
                  >
                    <tbody>
                      <tr>
                        {this.state.showMinSelect
                          ? ["00", "15", "30", "45"].map(min => (
                              <td
                                key={min}
                                className="valid-cell"
                                style={{
                                  ...styles.timeCell,
                                  ...(Number(min) ===
                                  dateFns.getMinutes(this.state.value)
                                    ? this.getSelectedStyle()
                                    : {})
                                }}
                                onClick={() =>
                                  this.handleMinSelect(Number(min))
                                }
                              >
                                <div style={{ width: cellSize }}>{min}</div>
                              </td>
                            ))
                          : [...Array(24).keys()].reverse().map(hour => (
                              <td
                                key={hour}
                                className="valid-cell"
                                style={{
                                  ...styles.timeCell,
                                  ...(hour ===
                                  dateFns.getHours(this.state.value)
                                    ? this.getSelectedStyle()
                                    : {})
                                }}
                                onClick={() => this.handleHourSelect(hour)}
                              >
                                <div style={{ width: cellSize }}>{hour}</div>
                              </td>
                            ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
