import React, { Component } from "reactn";
import { Redirect } from "react-router";
import Helmet from "react-helmet";
import ReleaseBreadcrumbs from "../../components/releases/ReleaseBreadcrumbs";
import Breadcrumb from "../../components/common/Breadcrumb";
import ReleaseVendorForm from "../../components/releasevendors/ReleaseVendorForm";
import { scrollToTop } from "../../utilities/scroll";
import { create, createPath } from "../../models/release_vendors";
import { showPath as showArtistPath } from "../../models/artists";
import {
  findBySlug,
  showPath as showReleasePath
} from "../../models/releases";
import authUser from "../../components/auth/authUser";
import isEditor from "../../components/auth/isEditor";

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToRelease: false,
      release: undefined,
      releasevendor: undefined,
      errors: {
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
          Add Vendor Location
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
            vendorCreated: true
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

    const newVendor = e.target.vendor_id.value;
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
        releasevendor: {
          ...this.state.releasevendor,
          vendor_id: newVendor,
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
        releasevendor: {
          ...this.state.releasevendor,
          vendor_id: newVendor,
          url: newUrl,
        },
        redirectToRelease: true
      });
    }
  };

  render() {
    const { release, errors } = this.state;

    return (
      <div className="create-release-vendor">
        <Helmet>
          <title>{`Add Vendor Location`}</title>
        </Helmet>
        {this.redirect()}
        {this.breadcrumbs()}
        {release && <ReleaseVendorForm
          release={release}
          onSubmit={this.handleSubmit}
          errors={errors}
        />}
      </div>
    );
  }
}

export default authUser(isEditor(Create));
