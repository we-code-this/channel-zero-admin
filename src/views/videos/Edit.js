import React, { Component } from "reactn";
import he from "he";
import { Redirect } from "react-router";
import Helmet from "react-helmet";
import VideoBreadcrumbs from "../../components/videos/VideoBreadcrumbs";
import Breadcrumb from "../../components/common/Breadcrumb";
import VideoForm from "../../components/videos/VideoForm";
import { findById, update, editPath } from "../../models/videos";
import authUser from "../../components/auth/authUser";
import isEditor from "../../components/auth/isEditor";

class Edit extends Component {
  constructor(props) {
    super(props);

    this._isMounted = false;

    const video = props.video ? props.video : undefined;

    this.state = {
      redirectToVideos: false,
      video,
      errors: {
        title: undefined,
        src: undefined
      }
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    const video = await findById(this.props.match.params.id);

    if (this._isMounted) {
      this.setState({ ...this.state, video });
    }
  }

  async componentWillUnmount() {
    this._isMounted = false;
  }

  handleSubmit = async e => {
    e.preventDefault();

    this.setGlobal({
      ...this.global,
      uploading: true
    });

    const newTitle = e.target.title.value;
    const newSrc = e.target.src.value;

    const result = await update(this.state.video.id, {
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
        redirectToVideos: true
      });
    }
  };

  redirect() {
    return (
      this.state.redirectToVideos && (
        <Redirect
          to={{
            pathname: '/videos',
            updated: true
          }}
        />
      )
    );
  }

  breadcrumbs() {
    return (
      <VideoBreadcrumbs>
        <Breadcrumb
          to={editPath(this.state.video.id)}
          active
        >
          Edit “{he.decode(this.state.video.title)}”
        </Breadcrumb>
      </VideoBreadcrumbs>
    );
  }

  render() {
    const video = this.state.video;
    return video ? (
      <div>
        <Helmet>
          <title>{`Edit “${he.decode(video.title)}”`}</title>
        </Helmet>
        {this.redirect()}
        {this.breadcrumbs()}
        <VideoForm
          video={video}
          onSubmit={this.handleSubmit}
          errors={this.state.errors}
        />
      </div>
    ) : (
      ""
    );
  }
}

export default authUser(isEditor(Edit));
