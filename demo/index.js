import * as React from "react";
import ReactDOM from "react-dom";
import dateFns from "date-fns";
import DateTimePicker from "../DateTimePicker";

class Demo extends React.Component {
  state = {
    history: [],
    highlightColor: ""
  };
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "flex-start",
          width: "100%",
          maxWidth: 1200,
          justifyContent: "space-between"
        }}
      >
        <div>
          <h4>Picker</h4>
          <DateTimePicker
            placeholder="picka date"
            highlightColor={
              this.state.highlightColor.length > 0
                ? this.state.highlightColor
                : undefined
            }
            min={new Date()}
            max={dateFns.addDays(new Date(), 10)}
            onChange={value => {
              this.setState({
                history: this.state.history.concat(value)
              });
            }}
          />
        </div>
        <div style={{ margin: "0 10" }}>
          <h4>History</h4>
          <div>
            {this.state.history.map((date, i) => (
              <div key={i}>
                {dateFns.format(date, "dddd, MMMM Do YYYY, HH:mm")}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 style={{ color: this.state.highlightColor }}>Highlight Color</h4>
          <input
            value={this.state.highlightColor}
            onChange={({ target }) =>
              this.setState({ highlightColor: target.value })
            }
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById("demo"));
