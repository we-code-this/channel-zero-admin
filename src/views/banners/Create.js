import React, { Component } from "reactn";
import { Redirect } from "react-router";
import BannerBreadcrumbs from "../../components/banners/BannerBreadcrumbs";
import Breadcrumb from "../../components/common/Breadcrumb";
import BannerForm from "../../components/banners/BannerForm";
import { create, createPath } from "../../models/banners";
import { scrollToTop } from "../../utilities/scroll";
import authUser from "../../components/auth/authUser";
import isEditor from "../../components/auth/isEditor";

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToBanner: false,
      banner: undefined,
      errors: {
        desktop_image: undefined,
        mobile_image: undefined,
        url: undefined,
        alt: undefined,
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

    const newUrl = e.target.url.value;
    const newAlt = e.target.alt.value;

    if (e.target.desktop_image.value && e.target.mobile_image.value) {
      this.setState({
        ...this.state,
        errors: {
          ...this.state.errors,
          url: undefined,
          alt: undefined,
        }
      });
      
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
            url: newUrl,
            alt: newAlt
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
            id: result.id
          },
          redirectToBanner: true
        });
      }
    } else {
      this.setGlobal({
        ...this.global,
        uploading: false
      });

      let desktop_image = undefined;
      let mobile_image = undefined;

      if (!e.target.desktop_image.value) {
        desktop_image = "Desktop image required";
      }

      if (!e.target.mobile_image.value) {
        mobile_image = "Mobile image required";
      }

      this.setState({
        ...this.state,
        errors: {
          ...this.state.errors,
          desktop_image,
          mobile_image,
        }
      });
    }
  };

  redirect() {
    return (
      this.state.redirectToBanner && (
        <Redirect
          to={{
            pathname: `/banner/${this.state.release.id}`,
            created: true
          }}
        />
      )
    );
  }

  breadcrumbs() {
    return (
      <BannerBreadcrumbs>
        <Breadcrumb to={createPath()} active>
          Create Banner
        </Breadcrumb>
      </BannerBreadcrumbs>
    );
  }

  render() {
    const banner = this.state.banner;

    return (
      <div>
        {this.redirect()}
        {this.breadcrumbs()}
        <BannerForm
          banner={banner}
          onSubmit={this.handleSubmit}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

export default authUser(isEditor(Create));
