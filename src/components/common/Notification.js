import React, { Component } from "react";
import Transition from "react-transition-group/Transition";

const duration = 300;

const defaultStyle = {
  transition: `all ${duration}ms ease-in-out`,
  opacity: 0,
  height: 0,
  padding: "0 2.5rem 0 1.5rem",
  marginBottom: 0
};

const transitionStyles = {
  entering: {
    opacity: 0,
    height: 0,
    padding: "0 2.5rem 0 1.5rem",
    "margin-bottom": 0
  },
  entered: {
    opacity: 1,
    height: "auto",
    padding: "1.25rem 2.5rem 1.25rem 1.5rem",
    marginBottom: "1rem"
  },
  exiting: {
    opacity: 1,
    height: "auto",
    padding: "1.25rem 2.5rem 1.25rem 1.5rem",
    marginBottom: "1rem"
  },
  exited: {
    opacity: 0,
    height: 0,
    padding: "0 2.5rem 0 1.5rem",
    marginBottom: 0
  }
};

class Notification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: props.show
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.show !== state.show) {
      return { show: props.show };
    }

    return null;
  }

  render() {
    const notificationClasses = ["notification"];

    if (this.props.color) {
      notificationClasses.push(`is-${this.props.color}`);
    }

    return (
      <Transition in={this.state.show} timeout={duration}>
        {state => (
          <div
            className={notificationClasses.join(" ")}
            style={{
              ...defaultStyle,
              ...transitionStyles[state]
            }}
          >
            <button className="delete" onClick={this.props.onDismiss} />
            {this.props.children}
          </div>
        )}
      </Transition>
    );
  }
}

export default Notification;
