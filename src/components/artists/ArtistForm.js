import React, { Component } from "react";
import _ from "lodash";
import { withRouter } from "react-router";
import TextInput from "../common/forms/TextInput";
import MarkdownEditor from "../common/forms/MarkdownEditor";
import SubmitWithCancel from "../common/forms/SubmitWithCancel";

class ArtistForm extends Component {
  constructor(props) {
    super(props);

    const artist = props.artist ? props.artist : { name: "", description: "" };

    this.state = {
      artist,
      errors: props.errors
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (!_.isEqual(props.errors, state.errors)) {
      return { ...state, artist: props.artist, errors: props.errors };
    }

    return null;
  }

  handleNameChange = e => {
    const artist = { ...this.state.artist, name: e.target.value };
    this.setState({ ...this.state, artist });
  };

  handleDescriptionChange = value => {
    const artist = { ...this.state.artist, description: value };
    this.setState({ ...this.state, artist });
  };

  handleCancelClick = e => {
    e.preventDefault();
    this.props.history.goBack();
  };

  render() {
    const artist = this.state.artist;

    return (
      <form onSubmit={this.props.onSubmit} className="form">
        <TextInput
          label="Name"
          value={artist.name}
          onChange={this.handleNameChange}
          error={
            this.state.errors && this.state.errors.name
              ? this.state.errors.name
              : undefined
          }
        />
        <MarkdownEditor
          label="Description"
          onChange={this.handleDescriptionChange}
          value={artist.description}
          error={
            this.state.errors && this.state.errors.description
              ? this.state.errors.description
              : undefined
          }
        />
        <SubmitWithCancel onClick={this.handleCancelClick} />
      </form>
    );
  }
}

export default withRouter(ArtistForm);
