// @flow
import * as React from "react";

export class ClickedOutside extends React.Component<
  {
    children: React.Element<*>,
    onOutsideClick: Event => void
  },
  { clicked: boolean }
> {
  state = { clicked: false };
  ref = React.createRef();
  componentDidMount() {
    document.addEventListener("click", this.handleClick, true);
  }
  componentWillUnmount() {
    if (document) {
      document.removeEventListener("click", this.handleClick, false);
    }
  }
  handleClick = (e: Event) => {
    let ref = this.ref.current;
    if (ref && !ref.contains(e.target)) {
      this.props.onOutsideClick && this.props.onOutsideClick(e);
    }
  };
  render() {
    // eslint-disable-next-line no-unused-vars
    let { children, onOutsideClick, ...rest } = this.props;
    return (
      <div ref={this.ref} {...rest}>
        {children}
      </div>
    );
  }
}
