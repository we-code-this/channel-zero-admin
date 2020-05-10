import React, { Component } from "reactn";
import { Redirect } from "react-router";
import Helmet from "react-helmet";
import LabelBreadcrumbs from "../../components/labels/LabelBreadcrumbs";
import Breadcrumb from "../../components/common/Breadcrumb";
import LabelForm from "../../components/labels/LabelForm";
import {
  findBySlug,
  updateBySlug,
  indexPath,
  editPath
} from "../../models/labels";
import authUser from "../../components/auth/authUser";
import isAuthor from "../../components/auth/isAuthor";
import { canEditOrDelete } from "../../utilities/user";

class Edit extends Component {
  constructor(props) {
    super(props);

    this._canEditOrDelete = false;
    this._isMounted = false;

    this.state = {
      redirectToLabels: false,
      label: undefined,
      errors: {
        name: undefined
      }
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    
    if (this._isMounted) {
      const label = await findBySlug(this.props.match.params.slug);
      this._canEditOrDelete = canEditOrDelete(this.global.token, this.global.groups, label.user_id);

      this.setState({ ...this.state, label });
    }
  }

  async componentWillUnmount() {
    this._isMounted = false;
    this._canEditOrDelete = false;
  }

  handleSubmit = async e => {
    e.preventDefault();

    if (this._canEditOrDelete) {
      this.setGlobal({
        ...this.global,
        uploading: true
      });

      const newName = e.target.name.value;

      const result = await updateBySlug(this.state.label.slug, {
        name: newName
      });

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
          label: {
            ...this.state.label,
            name: newName
          },
          errors: {
            ...this.state.errors,
            ...resultErrors
          }
        });
      } else {
        this.setState({
          ...this.state,
          redirectToLabels: true
        });
      }
    }
  };

  redirect() {
    return (
      this.state.redirectToLabels && (
        <Redirect
          to={{
            pathname: indexPath(),
            updated: true
          }}
        />
      )
    );
  }

  breadcrumbs() {
    return (
      <LabelBreadcrumbs>
        <Breadcrumb to={editPath(this.state.label.slug)} active>
          Edit “{this.state.label.name}”
        </Breadcrumb>
      </LabelBreadcrumbs>
    );
  }

  renderForm() {
    const label = this.state.label;

    return (
      <div>
        <Helmet>
          <title>{`Edit “${label.name}”`}</title>
        </Helmet>
        {this.redirect()}
        {this.breadcrumbs()}
        <LabelForm
          label={label}
          onSubmit={this.handleSubmit}
          errors={this.state.errors}
        />
      </div>
    );
  }

  render() {
    const label = this.state.label;

    if (label) {
      return this._canEditOrDelete ? this.renderForm() : <Redirect to="/labels" />;
    } else {
      return "";
    }

  }
}

export default authUser(isAuthor(Edit));
