import _ from "lodash";
import React, { Component } from "react";
import moment from 'moment';
import { withRouter } from "react-router";
import MarkdownEditor from "../common/forms/MarkdownEditor";
import TextInput from "../common/forms/TextInput";
import DatePicker from "../common/forms/DatePicker";
import ImageFileInputWithPreview from "../common/forms/ImageFileInputWithPreview";
import SubmitWithCancel from "../common/forms/SubmitWithCancel";
import ArtistSelect from "../artists/ArtistSelect";
import LabelSelect from "../labels/LabelSelect";
import ReleaseTypeSelect from "../releases/ReleaseTypeSelect";
import { validTypes } from "../../config/images";
import { imageUrl } from "../../models/releases";

class ReleaseForm extends Component {
  constructor(props) {
    super(props);

    const release = props.release
      ? props.release
      : {
          artist_id: undefined,
          label_id: 1,
          title: "",
          description: "",
          catalog_number: "",
          release_date: moment().format('YYYY-MM-DD'),
          release_type: "Album",
        };

    this.state = {
      release,
      image: undefined,
      preview_url: release.filename ? imageUrl(release.url.large) : undefined,
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

  handleArtistChange = e => {
    const release = { ...this.state.release, artist_id: e.target.value };
    this.setState({ ...this.state, release });
  };

  handleLabelChange = e => {
    const release = { ...this.state.release, label_id: e.target.value };
    this.setState({ ...this.state, release });
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

  handleTitleChange = e => {
    const release = { ...this.state.release, title: e.target.value };
    this.setState({ ...this.state, release });
  };

  handleDescriptionChange = value => {
    const release = { ...this.state.release, description: value };
    this.setState({ ...this.state, release });
  };

  handleCatalogNumberChange = e => {
    const release = { ...this.state.release, catalog_number: e.target.value };
    this.setState({ ...this.state, release });
  };

  handleReleaseDateChange = e => {
    const release = { ...this.state.release, release_date: e.target.value };
    this.setState({ ...this.state, release });
  };

  handleReleaseTypeChange = e => {
    const release = { ...this.state.release, release_type: e.target.value };
    this.setState({ ...this.state, release });
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
      <form
        onSubmit={this.props.onSubmit}
        encType="multipart/form-data"
        className="form release-form"
      >
        <div className="columns">
          <div className="column is-one-quarter">
            <ArtistSelect
              onChange={this.handleArtistChange}
              value={this.state.release.artist_id}
            />
          </div>
          <div className="column is-one-quarter">
            <LabelSelect
              onChange={this.handleLabelChange}
              value={this.state.release.label_id}
            />
          </div>
          <div className="column is-one-quarter">
            <TextInput
              label="Catalog Number"
              onChange={this.handleCatalogNumberChange}
              value={this.state.release.catalog_number}
              error={
                this.state.errors && this.state.errors.catalog_number
                  ? this.state.errors.catalog_number
                  : undefined
              }
            />
          </div>
          <div className="column is-one-quarter">
              <ReleaseTypeSelect
                onChange={this.handleReleaseTypeChange}
                value={this.state.release.release_type}
              />
          </div>
        </div>
        <div className="columns">
          <div className="column is-one-quarter">
            <DatePicker
              label="Release Date"
              onChange={this.handleReleaseDateChange}
              value={this.state.release.release_date}
            />
          </div>
          <div className="column">
            <TextInput
              label="Title"
              value={this.state.release.title}
              onChange={this.handleTitleChange}
              error={
                this.state.errors && this.state.errors.title
                  ? this.state.errors.title
                  : undefined
              }
            />
          </div>
        </div>
        <MarkdownEditor
          label="Description"
          onChange={this.handleDescriptionChange}
          value={this.state.release.description}
          error={
            this.state.errors && this.state.errors.description
              ? this.state.errors.description
              : undefined
          }
        />
        <ImageFileInputWithPreview
          preview_url={this.state.preview_url}
          error={this.state.wrong_format}
          error_message="Only jpg, jpeg and png images are valid"
          name="image"
          onChange={this.handleFileSelection}
        />
        {this.state.errors && this.state.errors.image && (
          <p className="help is-danger image-error">
            {this.state.errors.image}
          </p>
        )}
        <SubmitWithCancel onClick={this.handleCancelClick} />
      </form>
    );
  }
}

export default withRouter(ReleaseForm);
