import React, { Component } from "reactn";
import { Redirect } from "react-router";
import ReleaseBreadcrumbs from "../../components/releases/ReleaseBreadcrumbs";
import Breadcrumb from "../../components/common/Breadcrumb";
import ReleaseForm from "../../components/releases/ReleaseForm";
import { create, createPath } from "../../models/releases";
import { scrollToTop } from "../../utilities/scroll";
import authUser from "../../components/auth/authUser";
import isAuthor from "../../components/auth/isAuthor";

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToRelease: false,
      release: undefined,
      errors: {
        image: undefined,
        title: undefined,
        description: undefined,
        catalog_number: undefined,
        release_date: undefined,
      }
    };
  }

  handleSubmit = async e => {
    e.preventDefault();
    
    this.setGlobal({
      ...this.global,
      uploading: true
    });

    scrollToTop();

    const newTitle = e.target.title.value;
    const newDescription = e.target.description.value;

    if (e.target.image.value) {
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
          release: {
            ...this.state.release,
            name: newTitle,
            description: newDescription
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
          release: {
            ...this.state.release,
            slug: result.slug
          },
          redirectToRelease: true
        });
      }
    } else {
      this.setGlobal({
        ...this.global,
        uploading: false
      });

      this.setState({
        ...this.state,
        errors: {
          ...this.state.errors,
          image: "Image required"
        }
      });
    }
  };

  redirect() {
    return (
      this.state.redirectToRelease && (
        <Redirect
          to={{
            pathname: `/release/${this.state.release.slug}`,
            created: true
          }}
        />
      )
    );
  }

  breadcrumbs() {
    return (
      <ReleaseBreadcrumbs>
        <Breadcrumb to={createPath()} active>
          Create Release
        </Breadcrumb>
      </ReleaseBreadcrumbs>
    );
  }

  render() {
    const release = this.state.release;

    return (
      <div>
        {this.redirect()}
        {this.breadcrumbs()}
        <ReleaseForm
          release={release}
          onSubmit={this.handleSubmit}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

export default authUser(isAuthor(Create));
