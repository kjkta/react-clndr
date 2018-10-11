## A Date & Time picker for React

[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

### Install

`yarn add date-time-picker-react`

### Usage

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
initialValue | `Date` | `new Date()` | An initial date/time. Default is now.
dateFormat | `string` | `"DD/MM/YY HH:mm"` | A Date format. Default is "DD/MM/YY HH:mm".
inputStyle | `{ [string]: any }` | `null` | Additional styles for the input element.
highlightColor | `string` | `"#00a699"` | The selected/focussed highlight color.
min | `Date` | `null` | The earliest selectable date.
max | `Date` | `null` | The lastest selectable date.
onChange | `(value: Date) => any` | null | Dispatches selected date/time on every date/time change.

### Contributing

- Install deps with `yarn`
- Run webpack with `yarn dev`
- Build with `yarn build`
- Type check with `yarn flow`

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
