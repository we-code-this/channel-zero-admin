import React, { Component } from "reactn";
import he from "he";
import { Redirect } from "react-router";
import Helmet from "react-helmet";
import FeatureBreadcrumbs from "../../components/features/FeatureBreadcrumbs";
import Breadcrumb from "../../components/common/Breadcrumb";
import FeatureForm from "../../components/features/FeatureForm";
import { findById, update, showPath, editPath } from "../../models/features";
import { scrollToTop } from "../../utilities/scroll";
import authUser from "../../components/auth/authUser";
import isAuthor from "../../components/auth/isAuthor";
import { canEditOrDelete } from "../../utilities/user";

class Edit extends Component {
  constructor(props) {
    super(props);

    this._canEditOrDelete = false;
    this._isMounted = false;

    this.state = {
      redirectToFeature: false,
      feature: undefined
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    
    if (this._isMounted) {
      const feature = await findById(this.props.match.params.id);
      this._canEditOrDelete = canEditOrDelete(this.global.token, this.global.groups, feature.user_id);

      this.setState({ ...this.state, feature });
    }
  }

  async componentWillUnmount() {
    this._canEditOrDelete = false;
    this._isMounted = false;
  }

  handleSubmit = async e => {
    e.preventDefault();

    if (this._canEditOrDelete) {
      const result = await update(this.state.feature.id, e.target);

      if (result.errors.length) {  
        scrollToTop();
      } else {
        this.setState({
          ...this.state,
          redirectToFeature: true
        });
      }
    }
  };

  redirect() {
    return (
      this.state.redirectToFeature && (
        <Redirect
          to={{
            pathname: `/feature/${this.state.feature.id}`,
            updated: true
          }}
        />
      )
    );
  }

  breadcrumbs() {
    return (
      <FeatureBreadcrumbs>
        <Breadcrumb to={showPath(this.state.feature.id)}>
          {he.decode(this.state.feature.article.title)} Feature
        </Breadcrumb>
        <Breadcrumb to={editPath()} active>
          Edit {he.decode(this.state.feature.article.title)} Feature
        </Breadcrumb>
      </FeatureBreadcrumbs>
    );
  }

  renderForm() {
    const feature = this.state.feature;

    return (
      <div>
        <Helmet>
          <title>{`Edit “${he.decode(feature.article.title)}” Feature`}</title>
        </Helmet>
        {this.redirect()}
        {this.breadcrumbs()}

        <FeatureForm
          feature={feature}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }

  render() {
    const feature = this.state.feature;

    if (feature) {
      return this._canEditOrDelete ? this.renderForm() : <Redirect to="/features" />;
    } else {
      return "";
    }
  }
}

export default authUser(isAuthor(Edit));
