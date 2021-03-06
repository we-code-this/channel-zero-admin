import React, { Fragment, Component } from "reactn";
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

    this.setGlobal({
      ...this.global,
      uploading: true
    });

    const newName = e.target.name.value;

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

    this.setGlobal({
      ...this.global,
      uploading: true
    });

    const result = await create({
      name: {
        value: disc.name,
      },
      release_id: {
        value: disc.release_id
      }
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
        disc: {
          ...this.state.disc,
          name: disc.name,
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
          id: result.id,
          name: disc.name,
        },
        redirectToAddTrack: true
      });
    }
  };

  redirect() {
    return (
      <Fragment>
        {this.state.redirectToRelease && (
          <Redirect
            to={{
              pathname: `/release/${this.state.release.slug}`,
              discCreated: true
            }}
          />
        )}
        {this.state.redirectToAddTrack && (
          <Redirect
            to={{
              pathname: `/release/${this.state.release.slug}/disc/${this.state.disc.id}/track/create`,
            }}
          />
        )}
      </Fragment>
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
