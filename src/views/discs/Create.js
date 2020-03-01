import React, { Component } from "react";
import { Redirect } from "react-router";
import ReleaseBreadcrumbs from "../../components/releases/ReleaseBreadcrumbs";
import Breadcrumb from "../../components/common/Breadcrumb";
import DiscForm from "../../components/discs/DiscForm";
import { scrollToTop } from "../../utilities/scroll";
import { create, createPath } from "../../models/discs";
import { showPath as showArtistPath } from "../../models/artists";
import {
  findBySlug,
  discCount as releaseDiscCount,
  showPath as showReleasePath
} from "../../models/releases";
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
      errors: {
        name: undefined,
      }
    };
  }

  async componentDidMount() {
    let release;
    this._isMounted = true;
    
    if (!this.props.release) {
      release = await findBySlug(this.props.match.params.slug);
      const discCount = await releaseDiscCount(release.id);

      release.discCount = discCount;

      if (this._isMounted) {
        this.setState({ ...this.state, release });
      }
    }
  }

  breadcrumbs() {
    return this.state.release && (
      <ReleaseBreadcrumbs>
        <Breadcrumb to={showArtistPath(this.state.release.artist.slug)}>
          {this.state.release.artist.name}
        </Breadcrumb>
        <Breadcrumb to={showReleasePath(this.state.release.slug)}>
          {this.state.release.title}
        </Breadcrumb>
        <Breadcrumb to={createPath(this.state.release.slug)} active>
          Create Release Disc
        </Breadcrumb>
      </ReleaseBreadcrumbs>
    );
  }

  handleSubmit = async e => {
    e.preventDefault();
    const newName = e.target.name.value;

    const result = await create(e.target);

    if (result.errors && result.errors.length) {
      const resultErrors = {};

      result.errors.map(error => {
        resultErrors[error.field] = error.message;
        return error;
      });

      this.setState({
        ...this.state,
        disc: {
          ...this.state.disc,
          name: newName,
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
        disc: {
          ...this.state.disc,
          name: newName,
        },
        redirectToRelease: true
      });
    }
  };

  handleAddTrackSubmit = async disc => {
    console.log('add track submit event:', disc);
  };

  redirect() {
    return (
      this.state.redirectToRelease && (
        <Redirect
          to={{
            pathname: `/release/${this.state.release.slug}`,
            createdDisc: true
          }}
        />
      )
    );
  }

  render() {
    const { release } = this.state;

    return (
      <div className="create-release-disc">
        {this.redirect()}
        {this.breadcrumbs()}
        {release && <DiscForm
          release={release}
          onSubmit={this.handleSubmit}
          onAddTrackSubmitClick={this.handleAddTrackSubmit}
          errors={this.state.errors}
        />}
        
      </div>
    );
  }
}

export default authUser(isAuthor(Create));
