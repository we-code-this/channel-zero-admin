import React, { Component } from "react";
import { withRouter } from "react-router";
import TextInput from "../../components/common/forms/TextInput";
import MarkdownEditor from "../../components/common/forms/MarkdownEditor";
import SubmitWithCancel from "../../components/common/forms/SubmitWithCancel";

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
    if (
      props.errors.name !== state.errors.name ||
      props.errors.description !== state.errors.description
    ) {
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

  handleCancelClick = () => {
    this.props.history.goBack();
  };

  render() {
    const artist = this.state.artist;

    return (
      <form onSubmit={this.props.onSubmit}>
        <TextInput
          label="Name"
          value={artist.name}
          onChange={this.handleNameChange}
          error={this.state.errors.name}
        />
        <MarkdownEditor
          label="Description"
          onChange={this.handleDescriptionChange}
          value={artist.description}
          error={this.state.errors.description}
        />
        <SubmitWithCancel onClick={this.handleCancelClick} />
      </form>
    );
  }
}

export default withRouter(ArtistForm);
