"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _dateFns = _interopRequireDefault(require("date-fns"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var cellSize = 38;
var green = "#00a699";
var grey = "#6b6b6b";
var mediumGrey = "#ced2d2";
var lightGrey = "#e4e7e7";
var arrow = React.createElement("svg", {
  viewBox: "0 0 1000 1000"
}, React.createElement("path", {
  d: "M694.4 242.4l249.1 249.1c11 11 11 21 0 32L694.4 772.7c-5 5-10 7-16 7s-11-2-16-7c-11-11-11-21 0-32l210.1-210.1H67.1c-13 0-23-10-23-23s10-23 23-23h805.4L662.4 274.5c-21-21.1 11-53.1 32-32.1z"
}));
var styles = {
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
var daysOfTheWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

var getDatesInMonth = function getDatesInMonth(date) {
  var firstDayOfMonth = _dateFns.default.startOfMonth(date);

  var weekIndex = 0;
  return _toConsumableArray(Array(_dateFns.default.getDaysInMonth(date)).keys()).map(function (i) {
    var date = _dateFns.default.addDays(firstDayOfMonth, i);

    var dayWeekIndex = _dateFns.default.getDay(date);

    weekIndex = dayWeekIndex === 0 && i != 0 ? weekIndex + 1 : weekIndex;
    return {
      dayWeekIndex: dayWeekIndex,
      weekIndex: weekIndex,
      date: date
    };
  });
};

var getDaysInWeek = function getDaysInWeek(days) {
  return daysOfTheWeek.map(function (name, i) {
    var dayInMonth = days.find(function (_ref) {
      var dayWeekIndex = _ref.dayWeekIndex;
      return dayWeekIndex === i;
    });
    return dayInMonth ? dayInMonth : {};
  });
};

var sortDatesByWeeksNo = function sortDatesByWeeksNo(days) {
  var numberOfWeeks = Math.ceil(days.length / 7);
  return _toConsumableArray(Array(numberOfWeeks)).map(function (_, weekNo) {
    return getDaysInWeek(days.filter(function (_ref2) {
      var weekIndex = _ref2.weekIndex;
      return weekIndex === weekNo;
    }));
  });
};

var getDatesByWeekNo = function getDatesByWeekNo(date) {
  return sortDatesByWeeksNo(getDatesInMonth(date));
};

var roundMinutes = function roundMinutes(date, minuteMark) {
  return _dateFns.default.setMinutes(date, Math.round(_dateFns.default.getMinutes(date) / minuteMark) * minuteMark);
};

var DateTimePicker =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DateTimePicker, _React$Component);

  function DateTimePicker(props) {
    var _this;

    _classCallCheck(this, DateTimePicker);

    _this = _possibleConstructorReturn(this, (DateTimePicker.__proto__ || Object.getPrototypeOf(DateTimePicker)).call(this, props));
    Object.defineProperty(_assertThisInitialized(_this), "cal", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {}
    });
    var initialValue = props.initialValue ? roundMinutes(props.initialValue, 15) : null;
    _this.state = {
      value: initialValue,
      showCal: false,
      shownMonth: initialValue || new Date(),
      showMinSelect: false
    };
    return _this;
  }

  _createClass(DateTimePicker, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.state.showCal && this.cal && this.cal.focus();
    }
  }, {
    key: "getSelectedStyle",
    value: function getSelectedStyle() {
      return {
        borderColor: this.props.highlightColor,
        backgroundColor: this.props.highlightColor,
        color: "white"
      };
    }
  }, {
    key: "handleDateSelect",
    value: function handleDateSelect(date) {
      var value = this.state.value;
      value = _dateFns.default.setYear(value, _dateFns.default.getYear(date));
      value = _dateFns.default.setMonth(value, _dateFns.default.getMonth(date));
      value = _dateFns.default.setDate(value, _dateFns.default.getDate(date));
      this.setState({
        value: value
      });
      this.props.onChange && this.props.onChange(value);
    }
  }, {
    key: "handleHourSelect",
    value: function handleHourSelect(hr) {
      var value = _dateFns.default.setHours(this.state.value, hr);

      this.setState({
        value: value,
        showMinSelect: true
      });
      this.props.onChange && this.props.onChange(value);
    }
  }, {
    key: "handleMinSelect",
    value: function handleMinSelect(min) {
      var value = _dateFns.default.setMinutes(this.state.value, min);

      this.setState({
        value: value,
        showCal: false
      });
      this.props.onChange && this.props.onChange(value);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var datesInMonthByWeek = getDatesByWeekNo(this.state.shownMonth);
      return React.createElement("div", null, React.createElement("style", {
        dangerouslySetInnerHTML: {
          __html: "\n            .date-time-picker-arrow:active {\n                outline-color: ".concat(this.props.highlightColor, ";\n                outline-offset: -2px;\n              }\n            .valid-cell:hover {\n              background-color: ").concat(lightGrey, "\n            }\n        ")
        }
      }), React.createElement("input", {
        readOnly: true,
        style: _objectSpread({
          userSelect: "none",
          padding: 10,
          fontSize: 14,
          borderStyle: "solid",
          borderWidth: 1,
          borderColor: mediumGrey,
          borderRadius: 3,
          color: grey,
          cursor: "pointer"
        }, !this.state.value ? {
          textAlign: "left"
        } : {
          textAlign: "center"
        }, this.props.inputStyle),
        onClick: function onClick() {
          _this2.setState({
            showCal: !_this2.state.showCal
          });
        },
        placeholder: this.props.placeholder,
        value: this.state.value ? _dateFns.default.format(this.state.value, this.props.dateFormat ? this.props.dateFormat : "DD/MM/YY HH:mm") : ""
      }), this.state.showCal && React.createElement("div", {
        ref: function ref(_ref3) {
          return _this2.cal = _ref3;
        },
        style: _objectSpread({
          position: "absolute",
          width: "100%",
          maxWidth: 315,
          backgroundColor: "white",
          borderRadius: 3,
          margin: "10px 0",
          border: "1px solid #eee",
          outline: 0,
          zIndex: 50
        }, this.props.calStyles ? this.props.calStyles : {}),
        tabIndex: "-1",
        onBlur: function onBlur() {
          return _this2.setState({
            showCal: false
          });
        }
      }, React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          margin: 15
        }
      }, React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%"
        }
      }, React.createElement("div", {
        className: "date-time-picker-arrow",
        style: _objectSpread({}, styles.arrow, {
          transform: "rotate(180deg)"
        }),
        onClick: function onClick() {
          return _this2.setState({
            shownMonth: _dateFns.default.subMonths(_this2.state.shownMonth, 1)
          });
        }
      }, arrow), React.createElement("span", {
        style: {
          fontWeight: "bold",
          userSelect: "none"
        }
      }, _dateFns.default.format(this.state.shownMonth, "MMMM YYYY")), React.createElement("div", {
        className: "date-time-picker-arrow",
        style: styles.arrow,
        onClick: function onClick() {
          return _this2.setState({
            shownMonth: _dateFns.default.addMonths(_this2.state.shownMonth, 1)
          });
        }
      }, arrow)), React.createElement("table", {
        style: {
          tableLayout: "fixed",
          borderCollapse: "collapse",
          margin: "15px 0"
        }
      }, React.createElement("thead", null, React.createElement("tr", null, daysOfTheWeek.map(function (day) {
        return React.createElement("td", {
          key: day,
          style: _objectSpread({}, styles.calCell, {
            cursor: "default",
            color: "#6b6b6b",
            fontSize: 12
          })
        }, day);
      }))), React.createElement("tbody", null, datesInMonthByWeek.map(function (weekDays, i) {
        return React.createElement("tr", {
          key: i,
          style: {
            height: cellSize
          }
        }, weekDays.map(function (day, i) {
          var min = _this2.props.min && _dateFns.default.isAfter(_dateFns.default.startOfDay(_this2.props.min), day.date);

          var max = _this2.props.max && _dateFns.default.isBefore(_dateFns.default.endOfDay(_this2.props.max), day.date); // Render days in week for each week


          return day.date ? React.createElement("td", {
            key: i,
            className: min || max ? "" : "valid-cell",
            style: _objectSpread({}, styles.calCell, {
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "#ccc",
              cursor: "pointer"
            }, _dateFns.default.isSameDay(day.date, _this2.state.value) ? _this2.getSelectedStyle() : {}, min || max ? styles.disabledCell : {}),
            onClick: function onClick() {
              return !(min || max) && _this2.handleDateSelect(day.date);
            }
          }, _dateFns.default.getDate(day.date)) : React.createElement("td", {
            key: i
          });
        }));
      }))), React.createElement("div", {
        style: {
          width: "100%",
          height: 30,
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center"
        }
      }, this.state.showMinSelect ? React.createElement(React.Fragment, null, React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center"
        }
      }, React.createElement("div", {
        style: _objectSpread({}, styles.timeCell, {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
          color: this.props.highlightColor,
          borderColor: this.props.highlightColor
        }),
        onClick: function onClick() {
          return _this2.setState({
            showMinSelect: false
          });
        }
      }, _dateFns.default.getHours(this.state.value))), React.createElement("div", {
        style: {
          padding: "0 10",
          fontWeight: "bold"
        }
      }, ":")) : React.createElement("div", {
        style: {
          marginRight: 10,
          userSelect: "none"
        }
      }, "Hour:"), React.createElement("div", {
        style: {
          overflowX: "auto",
          marginTop: 10,
          marginBottom: 10
        }
      }, React.createElement("table", {
        style: {
          tableLayout: "fixed",
          borderCollapse: "collapse"
        }
      }, React.createElement("tbody", null, React.createElement("tr", null, this.state.showMinSelect ? ["00", "15", "30", "45"].map(function (min) {
        return React.createElement("td", {
          key: min,
          className: "valid-cell",
          style: _objectSpread({}, styles.timeCell, Number(min) === _dateFns.default.getMinutes(_this2.state.value) ? _this2.getSelectedStyle() : {}),
          onClick: function onClick() {
            return _this2.handleMinSelect(Number(min));
          }
        }, React.createElement("div", {
          style: {
            width: cellSize
          }
        }, min));
      }) : _toConsumableArray(Array(24).keys()).reverse().map(function (hour) {
        return React.createElement("td", {
          key: hour,
          className: "valid-cell",
          style: _objectSpread({}, styles.timeCell, hour === _dateFns.default.getHours(_this2.state.value) ? _this2.getSelectedStyle() : {}),
          onClick: function onClick() {
            return _this2.handleHourSelect(hour);
          }
        }, React.createElement("div", {
          style: {
            width: cellSize
          }
        }, hour));
      })))))))));
    }
  }]);

  return DateTimePicker;
}(React.Component);

exports.default = DateTimePicker;
Object.defineProperty(DateTimePicker, "defaultProps", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    highlightColor: green
  }
});