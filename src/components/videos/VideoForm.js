import React, { Component } from "react";
import he from "he";
import _ from "lodash";
import { withRouter } from "react-router";
import TextInput from "../common/forms/TextInput";
import SubmitWithCancel from "../common/forms/SubmitWithCancel";

class VideoForm extends Component {
  constructor(props) {
    super(props);

    const video = props.video ? props.video : { title: "", src: "" };

    this.state = {
      video,
      errors: props.errors
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (!_.isEqual(props.errors, state.errors)) {
      return { ...state, video: props.video, errors: props.errors };
    }

    return null;
  }

  handleTitleChange = e => {
    const video = { ...this.state.video, title: e.target.value };
    this.setState({ ...this.state, video });
  };

  handleSrcChange = e => {
    const video = { ...this.state.video, src: e.target.value };
    this.setState({ ...this.state, video });
  };

  handleCancelClick = e => {
    e.preventDefault();
    this.props.history.goBack();
  };

  render() {
    const video = this.state.video;

    return (
      <form onSubmit={this.props.onSubmit} className="form">
        <div className="columns">
          <div className="column is-half">
            <TextInput
              label="Title"
              value={he.decode(video.title)}
              onChange={this.handleTitleChange}
              error={
                this.state.errors && this.state.errors.title
                  ? this.state.errors.title
                  : undefined
              }
            />
          </div>
          <div className="column is-half">
            <TextInput
              label="URL"
              name="src"
              value={he.decode(video.src)}
              onChange={this.handleSrcChange}
              error={
                this.state.errors && this.state.errors.src
                  ? this.state.errors.src
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

export default withRouter(VideoForm);
