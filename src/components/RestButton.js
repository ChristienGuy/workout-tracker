import React, { Component } from "react";

import { Typography, Button } from "material-ui";

export default class RestButton extends Component {
  state = {
    timer: 0
  };

  startRest = () => {
    // start a 45 second timer
    this.setState({
      timer: 45 * 1000
    });
  };

  render() {
    const { timer } = this.state;
    return (
      <Button color="primary" variant="raised" onClick={this.startRest}>
        {timer === 0 ? (
          "Rest"
        ) : (
          <Timer
            onEndTimer={() => {
              this.setState({ timer: 0 });
            }}
            milliseconds={timer}
          />
        )}
      </Button>
    );
  }
}

export class Timer extends Component {
  state = {
    milliseconds: this.props.milliseconds
  };

  timer = 0;

  componentWillMount() {
    if (this.timer === 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown = () => {
    let milliseconds = this.state.milliseconds - 1000;
    this.setState({
      milliseconds
    });

    if (milliseconds === 0) {
      clearInterval(this.timer);
      this.props.onEndTimer();
    }
  };

  render() {
    return (
      <Typography color="inherit">{this.state.milliseconds / 1000}</Typography>
    );
  }
}
