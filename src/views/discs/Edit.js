import React, { Component } from "reactn";
import he from "he";
import { Redirect } from "react-router";
import Helmet from "react-helmet";
import ReleaseBreadcrumbs from "../../components/releases/ReleaseBreadcrumbs";
import Breadcrumb from "../../components/common/Breadcrumb";
import DiscForm from "../../components/discs/DiscForm";
import authUser from "../../components/auth/authUser";
import isAuthor from "../../components/auth/isAuthor";
import { canEditOrDelete } from "../../utilities/user";
import { scrollToTop } from "../../utilities/scroll";
import {
  findBySlug,
  showPath as showReleasePath
} from "../../models/releases";
import { findById, editPath, update } from '../../models/discs';
import { showPath as showArtistPath } from "../../models/artists";

class Edit extends Component {
  constructor(props) {
    super(props);

    this._canEditOrDelete = false;
    this._isMounted = false;

    this.state = {
      redirectToRelease: false,
      release: undefined,
      disc: undefined,
      errors: {
        name: undefined,
      }
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    
    if (this._isMounted) {
      const release = await findBySlug(this.props.match.params.slug);
      
      this._canEditOrDelete = canEditOrDelete(this.global.token, this.global.groups, release.user_id);

      const disc = await findById(this.props.match.params.id);

      this.setState({ ...this.state, release, disc });
    }
  }

  handleSubmit = async e => {
    e.preventDefault();

    if (this._canEditOrDelete) {
      this.setGlobal({
        ...this.global,
        uploading: true
      });
      
      const result = await update(this.state.disc.id, e.target);

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
        this.setState({
          ...this.state,
          redirectToRelease: true
        });
      }
    }
  };

  breadcrumbs() {
    return (
      <ReleaseBreadcrumbs>
        <Breadcrumb to={showArtistPath(this.state.release.artist.slug)}>
          {this.state.release.artist.name}
        </Breadcrumb>
        <Breadcrumb to={showReleasePath(this.state.release.slug)}>
          {this.state.release.title}
        </Breadcrumb>
        <Breadcrumb to={editPath(this.state.disc.id, this.state.release.slug)} active>
          Edit {this.state.disc.name}
        </Breadcrumb>
      </ReleaseBreadcrumbs>
    );
  }

  renderForm() {
    const { release, disc, errors } = this.state;

    return (
      <div>
        <Helmet>
          <title>{`Edit “${he.decode(disc.name)}”`}</title>
        </Helmet>
        {this.redirect()}
        {this.breadcrumbs()}

        {(release && disc) && <DiscForm
          release={release}
          disc={disc}
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
            discUpdated: true
          }}
        />
      )
    );
  }

  render() {
    const disc = this.state.disc;

    if (disc) {
      return this._canEditOrDelete ? this.renderForm() : <Redirect to="/releases" />;
    } else {
      return "";
    }
  }
}

export default authUser(isAuthor(Edit));
