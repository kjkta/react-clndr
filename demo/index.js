import * as React from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import DateTimePicker from "../DateTimePicker.js";

class Demo extends React.Component {
  state = {
    history: []
  };
  render() {
    return (
      <div>
        <DateTimePicker
          min={moment()}
          max={moment().add(10, "days")}
          onChange={value => {
            this.setState({ history: [...this.state.history, value.clone()] });
          }}
        />
        <h4>History</h4>
        <div>
          {this.state.history.map((moment, i) => (
            <div key={i}>{moment.format("dddd, MMMM Do YYYY, HH:mm")}</div>
          ))}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById("demo"));
