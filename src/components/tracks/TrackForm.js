import _ from "lodash";
import React, { Component } from "react";
import { withRouter } from "react-router";
import TextInput from "../common/forms/TextInput";
import SubmitWithCancel from "../common/forms/SubmitWithCancel";

class TrackForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      track: props.track,
      errors: props.errors
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (!_.isEqual(props.errors, state.errors)) {
      return { ...state, errors: props.errors };
    }

    return null;
  }

  handleCancelClick = e => {
    e.preventDefault();
    this.props.history.goBack();
  };

  handleNumberChange = e => {
    const track = { ...this.state.track, number: e.target.value };
    this.setState({ ...this.state, track });
  };

  handleTitleChange = e => {
    const track = { ...this.state.track, title: e.target.value };
    this.setState({ ...this.state, track });
  };

  render() {
    return (
      <form
        onSubmit={this.props.onSubmit}
        className="form track-form"
      >
        <input type="hidden" name="disc_id" value={this.state.track.disc_id} />
        <div className="columns">
          <div className="column is-1">
            <TextInput
              label="Number"
              onChange={this.handleNumberChange}
              value={this.state.track.number}
              error={
                this.state.errors && this.state.errors.number
                  ? this.state.errors.number
                  : undefined
              }
            />
          </div>
          <div className="column is-11">
            <TextInput
              name="title"
              label="Track Title"
              onChange={this.handleTitleChange}
              value={this.state.track.title}
              error={
                this.state.errors && this.state.errors.title
                  ? this.state.errors.title
                  : undefined
              }
            />
          </div>
        </div>
        
        <SubmitWithCancel onClick={this.handleCancelClick} />
      </form>
    );
  }
}

export default withRouter(TrackForm);
