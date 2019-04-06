import _ from "lodash";
import React, { Component } from "react";
import { withRouter } from "react-router";
import { validTypes } from "../../config/images";
import ImageFileInputWithPreview from "../common/forms/ImageFileInputWithPreview";
import SubmitWithCancel from "../common/forms/SubmitWithCancel";
import { imageUrl } from "../../models/artist_images";

class ArtistImageForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      artist_id: props.artist_id,
      image: this.props.image,
      preview_url: this.props.image
        ? imageUrl(this.props.image.filename)
        : undefined,
      wrong_format: false,
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

  handleFileSelection = e => {
    if (this.valid(e.target.files[0].type)) {
      this.setState({
        ...this.state,
        image: e.target.files[0],
        preview_url: URL.createObjectURL(e.target.files[0]),
        wrong_format: false
      });
    } else {
      e.target.value = null;
      this.setState({
        ...this.state,
        preview_url: undefined,
        wrong_format: true
      });
    }
  };

  valid = type => {
    let valid = false;

    validTypes.map(validType => {
      if (validType === type) {
        valid = true;
      }

      return validType;
    });

    return valid;
  };

  render() {
    return (
      <form onSubmit={this.props.onSubmit} encType="multipart/form-data">
        {this.props.edit ? (
          <input type="hidden" name="id" value={this.state.image.id} />
        ) : (
          <input type="hidden" name="artist_id" value={this.state.artist_id} />
        )}
        <ImageFileInputWithPreview
          preview_url={this.state.preview_url}
          error={this.state.wrong_format}
          error_message="Only jpg, jpeg and png images are valid"
          name="image"
          onChange={this.handleFileSelection}
        />
        {this.state.errors && (
          <p className="help is-danger">{this.state.errors.image}</p>
        )}
        <SubmitWithCancel onClick={this.handleCancelClick} />
      </form>
    );
  }
}

export default withRouter(ArtistImageForm);
