import React, { Component } from "reactn";
import { Redirect } from "react-router";
import ReleaseBreadcrumbs from "../../components/releases/ReleaseBreadcrumbs";
import Breadcrumb from "../../components/common/Breadcrumb";
import TrackForm from "../../components/tracks/TrackForm";
import { scrollToTop } from "../../utilities/scroll";
import { findById, discTrackCount } from "../../models/discs";
import { findBySlug, showPath as showReleasePath } from "../../models/releases";
import { create, createPath } from "../../models/tracks";
import authUser from "../../components/auth/authUser";
import isAuthor from "../../components/auth/isAuthor";

class Create extends Component {
  constructor(props) {
    super(props);

    this._isMounted = false;

    this.state = {
      redirectToRelease: false,
      redirectToAddTrack: false,
      release: undefined,
      disc: undefined,
      track: undefined,
      errors: {
        number: undefined,
        title: undefined,
      }
    };
  }

  async componentDidMount() {
    let disc, release;
    this._isMounted = true;
    
    if (!this.props.disc) {
      disc = await findById(this.props.match.params.id);
      release = await findBySlug(this.props.match.params.slug);
      const trackCount = await discTrackCount(disc.id);

      disc.trackCount = trackCount;

      if (this._isMounted) {
        this.setState({
          ...this.state,
          track: {
            disc_id: disc.id,
            number: (parseInt(disc.trackCount)+1),
            title: "",
          },
          disc,
          release
        });
      }
    }
  }

  breadcrumbs() {
    return this.state.disc && (
      <ReleaseBreadcrumbs>
        <Breadcrumb to={showReleasePath(this.state.release.slug)}>
          {this.state.release.title}
        </Breadcrumb>
        <Breadcrumb to={showReleasePath(this.state.release.slug)}>
          {this.state.disc.name}
        </Breadcrumb>
        <Breadcrumb to={createPath(this.state.disc.id, this.state.release.slug)} active>
          Create Release Track
        </Breadcrumb>
      </ReleaseBreadcrumbs>
    );
  }

  handleSubmit = async e => {
    e.preventDefault();

    this.setGlobal({
      ...this.global,
      uploading: true
    });

    const newNumber = e.target.number.value;
    const newTitle = e.target.title.value;

    const result = await create(e.target);

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
        track: {
          ...this.state.track,
          number: newNumber,
          title: newTitle,
        },
        errors: {
          ...this.state.errors,
          ...resultErrors
        }
      });

      scrollToTop();
    } else {
      this.setState({
        ...this.state,
        track: {
          ...this.state.track,
          number: newNumber,
          title: newTitle,
        },
        redirectToRelease: true
      });
    }
  };

  redirect() {
    return (
      this.state.redirectToRelease && (
        <Redirect
          to={{
            pathname: `/release/${this.state.release.slug}`,
            trackCreated: true
          }}
        />
      )
    );
  }

  render() {
    return (
      <div className="create-release-track">
        {this.redirect()}
        {this.breadcrumbs()}
        {this.state.track && <TrackForm
          track={this.state.track}
          onSubmit={this.handleSubmit}
          errors={this.state.errors}
        />}
      </div>
    );
  }
}

export default authUser(isAuthor(Create));
