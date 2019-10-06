import React, { Component } from "reactn";
import he from "he";
import { Redirect } from "react-router";
import Helmet from "react-helmet";
import PromoBreadcrumbs from "../../components/promos/PromoBreadcrumbs";
import Breadcrumb from "../../components/common/Breadcrumb";
import PromoForm from "../../components/promos/PromoForm";
import { findById, update, showPath, editPath } from "../../models/promos";
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
      redirectToPromo: false,
      promo: undefined,
      errors: {
        image: undefined,
        name: undefined,
        url: undefined
      }
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    
    if (this._isMounted) {
      const promo = await findById(this.props.match.params.id);
      this._canEditOrDelete = canEditOrDelete(this.global.token, this.global.groups, promo.user_id);

      this.setState({ ...this.state, promo });
    }
  }

  async componentWillUnmount() {
    this._canEditOrDelete = false;
    this._isMounted = false;
  }

  handleSubmit = async e => {
    e.preventDefault();

    if (this._canEditOrDelete) {
      const result = await update(this.state.promo.id, e.target);

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
          redirectToPromo: true
        });
      }
    }
  };

  redirect() {
    return (
      this.state.redirectToPromo && (
        <Redirect
          to={{
            pathname: `/promo/${this.state.promo.id}`,
            updated: true
          }}
        />
      )
    );
  }

  breadcrumbs() {
    return (
      <PromoBreadcrumbs>
        <Breadcrumb to={showPath(this.state.promo.id)}>
          {he.decode(this.state.promo.name)}
        </Breadcrumb>
        <Breadcrumb to={editPath()} active>
          Edit {he.decode(this.state.promo.name)}
        </Breadcrumb>
      </PromoBreadcrumbs>
    );
  }

  renderForm() {
    const promo = this.state.promo;

    return (
      <div>
        <Helmet>
          <title>{`Edit “${he.decode(promo.name)}”`}</title>
        </Helmet>
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

  render() {
    const promo = this.state.promo;

    if (promo) {
      return this._canEditOrDelete ? this.renderForm() : <Redirect to="/promos" />;
    } else {
      return "";
    }
  }
}

export default authUser(isAuthor(Edit));
