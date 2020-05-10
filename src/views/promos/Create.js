import React, { Component } from "reactn";
import { Redirect } from "react-router";
import PromoBreadcrumbs from "../../components/promos/PromoBreadcrumbs";
import Breadcrumb from "../../components/common/Breadcrumb";
import PromoForm from "../../components/promos/PromoForm";
import { create, createPath } from "../../models/promos";
import { scrollToTop } from "../../utilities/scroll";
import authUser from "../../components/auth/authUser";
import isAuthor from "../../components/auth/isAuthor";

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToPromo: false,
      promo: undefined,
      errors: {
        image: undefined,
        name: undefined,
        url: undefined
      }
    };
  }

  handleSubmit = async e => {
    e.preventDefault();

    const newName = e.target.name.value;
    const newUrl = e.target.url.value;
    const newLocation = e.target.location.value;

    if (e.target.image.value) {
      this.setGlobal({
        ...this.global,
        uploading: true
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
          promo: {
            ...this.state.promo,
            name: newName,
            url: newUrl,
            location: newLocation
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
          promo: {
            ...this.state.promo,
            id: result.id
          },
          redirectToPromo: true
        });
      }
    } else {
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
      this.state.redirectToPromo && (
        <Redirect
          to={{
            pathname: `/promo/${this.state.promo.id}`,
            created: true
          }}
        />
      )
    );
  }

  breadcrumbs() {
    return (
      <PromoBreadcrumbs>
        <Breadcrumb to={createPath()} active>
          Create Promo
        </Breadcrumb>
      </PromoBreadcrumbs>
    );
  }

  render() {
    const promo = this.state.promo;

    return (
      <div>
        {this.redirect()}
        {this.breadcrumbs()}
        <PromoForm
          promo={promo}
          onSubmit={this.handleSubmit}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

export default authUser(isAuthor(Create));
