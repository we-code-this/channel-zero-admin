import React, { Component } from "reactn";
import { Redirect } from "react-router";
import Helmet from "react-helmet";
import ReleaseBreadcrumbs from "../../components/releases/ReleaseBreadcrumbs";
import Breadcrumb from "../../components/common/Breadcrumb";
import ReleaseVendorForm from "../../components/releasevendors/ReleaseVendorForm";
import authUser from "../../components/auth/authUser";
import isAuthor from "../../components/auth/isAuthor";
import { canEditOrDelete } from "../../utilities/user";
import { scrollToTop } from "../../utilities/scroll";
import { showPath as showArtistPath } from "../../models/artists";
import {
  findBySlug,
  showPath as showReleasePath
} from "../../models/releases";
import { findById, editPath, update } from '../../models/release_vendors';

class Edit extends Component {
  constructor(props) {
    super(props);

    this._canEditOrDelete = false;
    this._isMounted = false;

    this.state = {
      redirectToRelease: false,
      release: undefined,
      vendor: undefined,
      errors: {
        url: undefined,
      }
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    
    if (this._isMounted) {
      const release = await findBySlug(this.props.match.params.slug);
      
      this._canEditOrDelete = canEditOrDelete(this.global.token, this.global.groups, release.user_id);

      const vendor = await findById(this.props.match.params.id);

      this.setState({ ...this.state, release, vendor });
    }
  }

  handleSubmit = async e => {
    e.preventDefault();

    if (this._canEditOrDelete) {
      const result = await update(this.state.vendor.id, e.target);

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
    }
  };

  breadcrumbs() {
    return this.state.release && (
      <ReleaseBreadcrumbs>
        <Breadcrumb to={showArtistPath(this.state.release.artist.slug)}>
          {this.state.release.artist.name}
        </Breadcrumb>
        <Breadcrumb to={showReleasePath(this.state.release.slug)}>
          {this.state.release.title}
        </Breadcrumb>
        <Breadcrumb to={editPath(this.state.vendor.id, this.state.release.slug)} active>
          Edit Vendor Location
        </Breadcrumb>
      </ReleaseBreadcrumbs>
    );
  }

  renderForm() {
    const { release, vendor, errors } = this.state;

    return (
      <div>
        <Helmet>
          <title>{`Edit Vendor Location`}</title>
        </Helmet>
        {this.redirect()}
        {this.breadcrumbs()}

        {(release && vendor) && <ReleaseVendorForm
          release={release}
          vendor={vendor}
          onSubmit={this.handleSubmit}
          errors={errors}
        />}
      </div>
    );
  }

  redirect() {
    return (
      this.state.redirectToRelease && (
        <Redirect
          to={{
            pathname: `/release/${this.state.release.slug}`,
            vendorUpdated: true
          }}
        />
      )
    );
  }

  render() {
    const vendor = this.state.vendor;

    if (vendor) {
      return this._canEditOrDelete ? this.renderForm() : <Redirect to="/releases" />;
    } else {
      return "";
    }
  }
}

export default authUser(isAuthor(Edit));
