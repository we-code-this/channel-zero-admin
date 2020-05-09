import _ from "lodash";
import React, { Component } from "react";
import he from 'he';
import { withRouter } from "react-router";
import TextInput from "../common/forms/TextInput";
import ImageFileInputWithPreview from "../common/forms/ImageFileInputWithPreview";
import SubmitWithCancel from "../common/forms/SubmitWithCancel";
import { validTypes } from "../../config/images";
import { imageUrl } from "../../models/banners";

class BannerForm extends Component {
  constructor(props) {
    super(props);

    const banner = props.banner
      ? props.banner
      : {
          url: "",
          alt: "",
        };

    banner.url = he.decode(banner.url);
    banner.alt = he.decode(banner.alt);

    this.state = {
      banner,
      desktop_image: undefined,
      mobile_image: undefined,
      desktop_preview_url: banner.desktop_filename ? imageUrl(banner.desktop_url.large) : undefined,
      mobile_preview_url: banner.mobile_filename ? imageUrl(banner.mobile_url.large) : undefined,
      desktop_wrong_format: false,
      mobile_wrong_format: false,
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

  handleChange = e => {
    this.setState({
      banner: {
        ...this.state.banner,
        [e.target.name]: e.target.value,
      }
    });
  };

  handleDesktopFileSelection = e => {
    if (this.valid(e.target.files[0].type)) {
      this.setState({
        ...this.state,
        desktop_image: e.target.files[0],
        desktop_preview_url: URL.createObjectURL(e.target.files[0]),
        desktop_wrong_format: false
      });
    } else {
      e.target.value = null;
      this.setState({
        ...this.state,
        desktop_preview_url: undefined,
        desktop_wrong_format: true
      });
    }
  };

  handleMobileFileSelection = e => {
    if (this.valid(e.target.files[0].type)) {
      this.setState({
        ...this.state,
        mobile_image: e.target.files[0],
        mobile_preview_url: URL.createObjectURL(e.target.files[0]),
        mobile_wrong_format: false
      });
    } else {
      e.target.value = null;
      this.setState({
        ...this.state,
        mobile_preview_url: undefined,
        mobile_wrong_format: true
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

  hasDesktopError = () => {
    return (this.state.desktop_wrong_format || (this.state.errors && this.state.errors.desktop_image));
  };

  hasMobileError = () => {
    return (this.state.mobile_wrong_format || (this.state.errors && this.state.errors.mobile_image));
  };

  desktopErrorMessage = () => {
    if (this.state.desktop_wrong_format) {
      return "Only jpg, jpeg and png images are valid";
    }

    if (this.state.errors && this.state.errors.desktop_image) {
      return this.state.errors.desktop_image;
    }
  };

  mobileErrorMessage = () => {
    if (this.state.mobile_wrong_format) {
      return "Only jpg, jpeg and png images are valid";
    }

    if (this.state.errors && this.state.errors.mobile_image) {
      return this.state.errors.mobile_image;
    }
  };

  render() {
    return (
      <form
        onSubmit={this.props.onSubmit}
        encType="multipart/form-data"
        className="form banner-form"
      >
        <div className="columns">
          <div className="column is-one-half">
            <TextInput
              label="URL (Where the banner links to)"
              name="url"
              onChange={this.handleChange}
              value={this.state.banner.url}
              error={
                this.state.errors && this.state.errors.url
                  ? this.state.errors.url
                  : undefined
              }
            />
          </div>
          <div className="column is-one-half">
            <TextInput
              label="Image Alt Text"
              name="alt"
              onChange={this.handleChange}
              value={this.state.banner.alt}
              error={
                this.state.errors && this.state.errors.alt
                  ? this.state.errors.alt
                  : undefined
              }
            />
          </div>
        </div>
        <ImageFileInputWithPreview
          preview_url={this.state.desktop_preview_url}
          error={this.hasDesktopError()}
          error_message={this.desktopErrorMessage()}
          name="desktop_image"
          label="Choose a desktop banner image…"
          onChange={this.handleDesktopFileSelection}
          hint="Required file format: jpg, jpeg or png. Required dimensions: 1456 x 180px."
        />

        <ImageFileInputWithPreview
          preview_url={this.state.mobile_preview_url}
          error={this.hasMobileError()}
          error_message={this.mobileErrorMessage()}
          name="mobile_image"
          label="Choose a mobile banner image…"
          onChange={this.handleMobileFileSelection}
          hint="Required file format: jpg, jpeg or png. Required dimensions: 640 x 200px."
        />
        <SubmitWithCancel onClick={this.handleCancelClick} />
      </form>
    );
  }
}

export default withRouter(BannerForm);
