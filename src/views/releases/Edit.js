import React, { Component } from "react";
import he from "he";
import { Redirect } from "react-router";
import Helmet from "react-helmet";
import ReleaseBreadcrumbs from "../../components/releases/ReleaseBreadcrumbs";
import Breadcrumb from "../../components/common/Breadcrumb";
import ReleaseForm from "../../components/releases/ReleaseForm";
import { findBySlug, update, showPath, editPath } from "../../models/releases";
import { scrollToTop } from "../../utilities/scroll";
import authUser from "../../components/auth/authUser";

class Edit extends Component {
  constructor(props) {
    super(props);

    this._isMounted = false;

    this.state = {
      redirectToRelease: false,
      release: undefined,
      errors: {
        image: undefined,
        title: undefined,
        description: undefined
      }
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    const release = await findBySlug(this.props.match.params.slug);

    if (this._isMounted) {
      this.setState({ ...this.state, release });
    }
  }

  async componentWillUnmount() {
    this._isMounted = false;
  }

  handleSubmit = async e => {
    e.preventDefault();

    const result = await update(this.state.release.id, e.target);

    if (result.errors.length) {
      const resultErrors = {};

      result.errors.map(error => {
        resultErrors[error.field] = error.message;
        return error;
      });

      this.setState({
        ...this.state,
        errors: {
          ...this.state.errors,
          ...resultErrors
        }
      });

      scrollToTop();
    } else {
      this.setState({
        ...this.state,
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
            updated: true
          }}
        />
      )
    );
  }

  breadcrumbs() {
    return (
      <ReleaseBreadcrumbs>
        <Breadcrumb to={showPath(this.state.release.slug)}>
          {he.decode(this.state.release.title)}
        </Breadcrumb>
        <Breadcrumb to={editPath()} active>
          Edit {he.decode(this.state.release.title)}
        </Breadcrumb>
      </ReleaseBreadcrumbs>
    );
  }

  render() {
    const release = this.state.release;

    return release ? (
      <div>
        <Helmet>
          <title>{`Edit “${he.decode(release.title)}”`}</title>
        </Helmet>
        {this.redirect()}
        {this.breadcrumbs()}
        <ReleaseForm
          release={release}
          onSubmit={this.handleSubmit}
          errors={this.state.errors}
        />
      </div>
    ) : (
      ""
    );
  }
}

export default authUser(Edit);
