# A Date & Time picker for React

[![NPM](https://nodei.co/npm/date-time-picker-react.png)](https://nodei.co/npm/date-time-picker-react/)

View the demo [here](https://kjkta.github.io/date-time-picker-react/).

## Install

`yarn add date-time-picker-react -D`

## Usage

Name | Type | Required | Description
---|---|---|---
initialValue | `Moment` | No | An initial date/time. Default is now.
dateFormat | `string` | No | A `Moment` format. Default is "DD/MM/YY HH:mm".
inputStyle | `{ [string]: any }` | No | Additional styles for the input element.
highlightColor | `string` | No | The selected/focussed highlight color.
min | `Moment` | No | The earliest selectable date.
max | `Moment` | No | The lastest selectable date.
onChange | `(value: Moment) => any` | No | Dispatches selected date/time on every date/time change.