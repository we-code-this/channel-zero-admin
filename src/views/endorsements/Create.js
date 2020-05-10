import React, { Component } from "reactn";
import { Redirect } from "react-router";
import ReleaseBreadcrumbs from "../../components/releases/ReleaseBreadcrumbs";
import Breadcrumb from "../../components/common/Breadcrumb";
import EndorsementForm from "../../components/endorsements/EndorsementForm";
import { scrollToTop } from "../../utilities/scroll";
import { create, createPath } from "../../models/endorsements";
import { showPath as showArtistPath } from "../../models/artists";
import {
  findBySlug,
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
      release: undefined,
      endorsement: undefined,
      errors: {
        review: undefined,
        reviewer: undefined,
        url: undefined,
      }
    };
  }

  async componentDidMount() {
    let release;
    this._isMounted = true;
    
    if (!this.props.release) {
      release = await findBySlug(this.props.match.params.slug);

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
          Create Release Endorsement
        </Breadcrumb>
      </ReleaseBreadcrumbs>
    );
  }

  redirect() {
    return (
      this.state.redirectToRelease && (
        <Redirect
          to={{
            pathname: `/release/${this.state.release.slug}`,
            endorsementCreated: true
          }}
        />
      )
    );
  }

  handleSubmit = async e => {
    e.preventDefault();

    this.setGlobal({
      ...this.global,
      uploading: true
    });

    const newReview = e.target.review.value;
    const newReviewer = e.target.reviewer.value;
    const newUrl = e.target.url.value;

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
        credit: {
          ...this.state.credit,
          review: newReview,
          reviewer: newReviewer,
          url: newUrl,
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
        credit: {
          ...this.state.credit,
          review: newReview,
          reviewer: newReviewer,
          url: newUrl,
        },
        redirectToRelease: true
      });
    }
  };

  render() {
    const { release, errors } = this.state;

    return (
      <div className="create-release-endorsement">
        {this.redirect()}
        {this.breadcrumbs()}
        {release && <EndorsementForm
          release={release}
          onSubmit={this.handleSubmit}
          errors={errors}
        />}
      </div>
    );
  }
}

export default authUser(isAuthor(Create));
