import React, { Component } from "reactn";
import he from "he";
import { Redirect } from "react-router";
import Helmet from "react-helmet";
import ReleaseBreadcrumbs from "../../components/releases/ReleaseBreadcrumbs";
import Breadcrumb from "../../components/common/Breadcrumb";
import TrackForm from "../../components/tracks/TrackForm";
import authUser from "../../components/auth/authUser";
import isAuthor from "../../components/auth/isAuthor";
import { canEditOrDelete } from "../../utilities/user";
import { scrollToTop } from "../../utilities/scroll";
import {
  findBySlug,
  showPath as showReleasePath
} from "../../models/releases";
import { findById } from '../../models/discs';
import { editPath, update, findByDiscIdAndSlug } from "../../models/tracks";

class Edit extends Component {
  constructor(props) {
    super(props);

    this._canEditOrDelete = false;
    this._isMounted = false;

    this.state = {
      redirectToRelease: false,
      release: undefined,
      disc: undefined,
      track: undefined,
      errors: {
        number: undefined,
        title: undefined,
      }
    };
  }

  async componentDidMount() {
    let track, disc, release;
    this._isMounted = true;
    
    if (this._isMounted) {
      track = await findByDiscIdAndSlug(this.props.match.params.disc_id, this.props.match.params.slug);
      release = await findBySlug(this.props.match.params.release_slug);
      
      this._canEditOrDelete = canEditOrDelete(this.global.token, this.global.groups, release.user_id);

      disc = await findById(this.props.match.params.disc_id);

      this.setState({ ...this.state, release, track, disc });
    }
  }

  handleSubmit = async e => {
    e.preventDefault();

    if (this._canEditOrDelete) {

      this.setGlobal({
        ...this.global,
        uploading: true
      });

      const result = await update(this.state.track.id, e.target);

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
        <Breadcrumb to={showReleasePath(this.state.release.slug)}>
          {this.state.release.title}
        </Breadcrumb>
        <Breadcrumb to={showReleasePath(this.state.release.slug)}>
          {this.state.disc.name}
        </Breadcrumb>
        <Breadcrumb to={editPath(this.state.track.slug, this.state.disc.id, this.state.release.slug)} active>
          Edit {this.state.track.title}
        </Breadcrumb>
      </ReleaseBreadcrumbs>
    );
  }

  renderForm() {
    return (
      <div>
        <Helmet>
          <title>{`Edit “${he.decode(this.state.track.title)}”`}</title>
        </Helmet>
        {this.redirect()}
        {this.breadcrumbs()}
        {this.state.track && <TrackForm
          track={this.state.track}
          onSubmit={this.handleSubmit}
          errors={this.state.errors}
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
            trackUpdated: true
          }}
        />
      )
    );
  }

  render() {
    const track = this.state.track;

    if (track) {
      return this._canEditOrDelete ? this.renderForm() : <Redirect to="/releases" />;
    } else {
      return "";
    }
  }
}

export default authUser(isAuthor(Edit));
