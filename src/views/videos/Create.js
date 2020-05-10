import React, { Component } from "reactn";
import { Redirect } from "react-router";
import VideoBreadcrumbs from "../../components/videos/VideoBreadcrumbs";
import Breadcrumb from "../../components/common/Breadcrumb";
import VideoForm from "../../components/videos/VideoForm";
import { create, createPath } from "../../models/videos";
import authUser from "../../components/auth/authUser";
import isAuthor from "../../components/auth/isAuthor";

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToVideos: false,
      video: {
        title: "",
        src: ""
      },
      errors: {
        title: undefined,
        src: undefined
      }
    };
  }

  handleSubmit = async e => {
    e.preventDefault();

    this.setGlobal({
      ...this.global,
      uploading: true
    });

    const newTitle = e.target.title.value;
    const newSrc = e.target.src.value;

    const result = await create({
      title: newTitle,
      src: newSrc
    });

    this.setGlobal({
      ...this.global,
      uploading: false
    });

    if (result.errors && result.errors.length) {
      const resultErrors = {};

      result.errors.map(error => {
        resultErrors[error.field] = error.message;
        return error;
      });

      this.setState({
        ...this.state,
        video: {
          ...this.state.video,
          title: newTitle,
          src: newSrc
        },
        errors: {
          ...this.state.errors,
          ...resultErrors
        }
      });
    } else {
      this.setState({
        ...this.state,
        video: {
          ...this.state.video
        },
        redirectToVideos: true
      });
    }
  };

  redirect() {
    return (
      this.state.redirectToVideos && (
        <Redirect
          to={{
            pathname: `/videos`,
            created: true
          }}
        />
      )
    );
  }

  breadcrumbs() {
    return (
      <VideoBreadcrumbs>
        <Breadcrumb to={createPath()} active>
          Create Video
        </Breadcrumb>
      </VideoBreadcrumbs>
    );
  }

  render() {
    const video = this.state.video;

    return (
      <div>
        {this.redirect()}
        {this.breadcrumbs()}
        <VideoForm
          video={video}
          onSubmit={this.handleSubmit}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

export default authUser(isAuthor(Create));
