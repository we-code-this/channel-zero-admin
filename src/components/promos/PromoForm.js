import _ from "lodash";
import React, { Component } from "react";
import { withRouter } from "react-router";
import TextInput from "../common/forms/TextInput";
import ImageFileInputWithPreview from "../common/forms/ImageFileInputWithPreview";
import SubmitWithCancel from "../common/forms/SubmitWithCancel";
import PromoLocationSelect from "./PromoLocationSelect";
import { validSvg } from "../../config/images";
import { imageUrl } from "../../models/promos";

class PromoForm extends Component {
  constructor(props) {
    super(props);

    const promo = props.promo
      ? props.promo
      : {
          name: "",
          url: "",
          location: "horizontal"
        };

    this.state = {
      promo,
      image: undefined,
      preview_url: promo.filename ? imageUrl(promo.image_url) : undefined,
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

  handleNameChange = e => {
    const promo = { ...this.state.promo, name: e.target.value };
    this.setState({ ...this.state, promo });
  };

  handleUrlChange = e => {
    const promo = { ...this.state.promo, url: e.target.value };
    this.setState({ ...this.state, promo });
  };

  handleLocationChange = e => {
    const promo = { ...this.state.promo, location: e.target.value };
    this.setState({ ...this.state, promo });
  };

  valid = type => {
    let valid = false;

    validSvg.map(validType => {
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
        className="form"
      >
        <div className="columns">
          <div className="column is-one-quarter">
            <PromoLocationSelect
              onChange={this.handleLocationChange}
              value={this.state.promo.location}
            />
          </div>
          <div className="column is-one-quarter">
            <TextInput
              label="URL"
              value={this.state.promo.url}
              onChange={this.handleUrlChange}
            />
          </div>
          <div className="column is-half">
            <TextInput
              label="Name"
              value={this.state.promo.name}
              onChange={this.handleNameChange}
              error={
                this.state.errors && this.state.errors.name
                  ? this.state.errors.name
                  : undefined
              }
            />
          </div>
        </div>
        <ImageFileInputWithPreview
          preview_url={this.state.preview_url}
          error={this.state.wrong_format}
          error_message="Only svg images are valid"
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

export default withRouter(PromoForm);
