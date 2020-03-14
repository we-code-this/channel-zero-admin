import React, { Component } from "reactn";
import he from "he";
import { Redirect } from "react-router";
import Helmet from "react-helmet";
import ReleaseBreadcrumbs from "../../components/releases/ReleaseBreadcrumbs";
import Breadcrumb from "../../components/common/Breadcrumb";
import CreditForm from "../../components/credits/CreditForm";
import authUser from "../../components/auth/authUser";
import isAuthor from "../../components/auth/isAuthor";
import { canEditOrDelete } from "../../utilities/user";
import { scrollToTop } from "../../utilities/scroll";
import { showPath as showArtistPath } from "../../models/artists";
import {
  findBySlug,
  showPath as showReleasePath
} from "../../models/releases";
import { findById, editPath, update } from '../../models/credits';

class Edit extends Component {
  constructor(props) {
    super(props);

    this._canEditOrDelete = false;
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
    this._isMounted = true;
    
    if (this._isMounted) {
      const release = await findBySlug(this.props.match.params.slug);
      
      this._canEditOrDelete = canEditOrDelete(this.global.token, this.global.groups, release.user_id);

      const credit = await findById(this.props.match.params.id);

      this.setState({ ...this.state, release, credit });
    }
  }

  handleSubmit = async e => {
    e.preventDefault();

    if (this._canEditOrDelete) {
      const result = await update(this.state.credit.id, e.target);

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
        <Breadcrumb to={editPath(this.state.credit.id, this.state.release.slug)} active>
          Edit {this.state.credit.label}: {this.state.credit.value}
        </Breadcrumb>
      </ReleaseBreadcrumbs>
    );
  }

  renderForm() {
    const { release, credit, errors } = this.state;

    return (
      <div>
        <Helmet>
          <title>{`Edit ${he.decode(credit.label)}: ${he.decode(credit.value)}`}</title>
        </Helmet>
        {this.redirect()}
        {this.breadcrumbs()}

        {(release && credit) && <CreditForm
          release={release}
          credit={credit}
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
            creditUpdated: true
          }}
        />
      )
    );
  }

  render() {
    const credit = this.state.credit;

    console.log('test');

    if (credit) {
      return this._canEditOrDelete ? this.renderForm() : <Redirect to="/releases" />;
    } else {
      return "";
    }
  }
}

export default authUser(isAuthor(Edit));
