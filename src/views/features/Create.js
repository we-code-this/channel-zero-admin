import React, { Component } from "reactn";
import { Redirect } from "react-router";
import FeatureBreadcrumbs from "../../components/features/FeatureBreadcrumbs";
import Breadcrumb from "../../components/common/Breadcrumb";
import FeatureForm from "../../components/features/FeatureForm";
import { create, createPath } from "../../models/features";
import { scrollToTop } from "../../utilities/scroll";
import authUser from "../../components/auth/authUser";
import isAuthor from "../../components/auth/isAuthor";

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToFeature: false,
      feature: undefined
    };
  }

  handleSubmit = async e => {
    e.preventDefault();

    this.setGlobal({
      ...this.global,
      uploading: true
    });

    const result = await create(e.target);

    this.setGlobal({
      ...this.global,
      uploading: false
    });

    if (result.errors.length) {  
      scrollToTop();
    } else {
      this.setState({
        ...this.state,
        feature: result,
        redirectToFeature: true
      });
    }
  };

  redirect() {
    return (
      this.state.redirectToFeature && (
        <Redirect
          to={{
            pathname: `/feature/${this.state.feature.id}`,
            created: true
          }}
        />
      )
    );
  }

  breadcrumbs() {
    return (
      <FeatureBreadcrumbs>
        <Breadcrumb to={createPath()} active>
          Create Feature
        </Breadcrumb>
      </FeatureBreadcrumbs>
    );
  }

  render() {
    const feature = this.state.feature;

    return (
      <div>
        {this.redirect()}
        {this.breadcrumbs()}
        <FeatureForm
          feature={feature}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default authUser(isAuthor(Create));
