import React, { Component } from "reactn";
import he from "he";
import { Redirect } from "react-router";
import Helmet from "react-helmet";
import BannerBreadcrumbs from "../../components/banners/BannerBreadcrumbs";
import Breadcrumb from "../../components/common/Breadcrumb";
import BannerForm from "../../components/banners/BannerForm";
import { findById, update, showPath, editPath } from "../../models/banners";
import { scrollToTop } from "../../utilities/scroll";
import authUser from "../../components/auth/authUser";
import isEditor from "../../components/auth/isEditor";

class Edit extends Component {
  constructor(props) {
    super(props);

    this._isMounted = false;

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

  async componentDidMount() {
    this._isMounted = true;
    
    if (this._isMounted) {
      const banner = await findById(this.props.match.params.id);

      this.setState({ ...this.state, banner });
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

    scrollToTop();

    const result = await update(this.state.banner.id, e.target);

    this.setGlobal({
      ...this.global,
      uploading: false
    });

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
      this.setGlobal({
        ...this.global,
        uploading: false
      });
      
      this.setState({
        ...this.state,
        redirectToBanner: true
      });
    }
  };

  redirect() {
    return (
      this.state.redirectToBanner && (
        <Redirect
          to={{
            pathname: `/banner/${this.state.banner.id}`,
            updated: true
          }}
        />
      )
    );
  }

  breadcrumbs() {
    return (
      <BannerBreadcrumbs>
        <Breadcrumb to={showPath(this.state.banner.id)}>
          {he.decode(this.state.banner.alt)}
        </Breadcrumb>
        <Breadcrumb to={editPath()} active>
          Edit Banner
        </Breadcrumb>
      </BannerBreadcrumbs>
    );
  }

  renderForm() {
    const banner = this.state.banner;

    return (
      <div>
        <Helmet>
          <title>Edit Banner</title>
        </Helmet>
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

  render() {
    if (this.state.banner) {
      return this.renderForm();
    } else {
      return "";
    }
  }
}

export default authUser(isEditor(Edit));
