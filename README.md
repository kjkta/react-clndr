## A Date & Time picker for React

View the demo [here](https://kjkta.github.io/date-time-picker-react/).

[![NPM](https://nodei.co/npm/date-time-picker-react.png)](https://nodei.co/npm/date-time-picker-react/)

### Install

`yarn add date-time-picker-react -D`

### Usage

React and Moment are peer dependencies for `date-time-picker-react`. These dependencies are not installed with date-time-picker-react, so your project needs to have them installed for the datepicker to work. You can then use it like so:

```js
import DateTimePicker from "date-time-picker-react";

class Demo extends React.Component {
  ...
  render() {
    return (
      <DateTimePicker onChange={value => {
        // do something...
      }}>
    );
  }
  ...
}
```

#### Props

Name | Type | Default | Description
---|---|---|---
initialValue | `Moment` | `moment()` | An initial date/time. Default is now.
dateFormat | `string` | `"DD/MM/YY HH:mm"` | A `Moment` format. Default is "DD/MM/YY HH:mm".
inputStyle | `{ [string]: any }` | `null` | Additional styles for the input element.
highlightColor | `string` | `"#00a699"` | The selected/focussed highlight color.
min | `Moment` | `null` | The earliest selectable date.
max | `Moment` | `null` | The lastest selectable date.
onChange | `(value: Moment) => any` | null | Dispatches selected date/time on every date/time change.

### Contributing

- Install deps with `yarn`
- Run webpack with `yarn dev`
- Build with `yarn build`
- Type check with `yarn flow`
- Lint with `yarn lint`