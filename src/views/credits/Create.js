import React, { Component } from "react";
import { Redirect } from "react-router";
import ReleaseBreadcrumbs from "../../components/releases/ReleaseBreadcrumbs";
import Breadcrumb from "../../components/common/Breadcrumb";
import CreditForm from "../../components/credits/CreditForm";
import { scrollToTop } from "../../utilities/scroll";
import { create, createPath } from "../../models/credits";
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
      credit: undefined,
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
          Create Release Credit
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
            creditCreated: true
          }}
        />
      )
    );
  }

  handleSubmit = async e => {
    e.preventDefault();
    const newLabel = e.target.label.value;
    const newValue = e.target.value.value;
    const newUrl = e.target.url.value;

    const result = await create(e.target);

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
          label: newLabel,
          value: newValue,
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
          label: newLabel,
          value: newValue,
          url: newUrl,
        },
        redirectToRelease: true
      });
    }
  };

  render() {
    const { release, errors } = this.state;

    return (
      <div className="create-release-credit">
        {this.redirect()}
        {this.breadcrumbs()}
        {release && <CreditForm
          release={release}
          onSubmit={this.handleSubmit}
          errors={errors}
        />}
      </div>
    );
  }
}

export default authUser(isAuthor(Create));
