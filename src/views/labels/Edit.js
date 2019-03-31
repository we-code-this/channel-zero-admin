import React, { Component } from "react";
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

class Edit extends Component {
  constructor(props) {
    super(props);

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
    const label = await findBySlug(this.props.match.params.slug);

    if (this._isMounted) {
      this.setState({ ...this.state, label });
    }
  }

  async componentWillUnmount() {
    this._isMounted = false;
  }

  handleSubmit = async e => {
    e.preventDefault();

    const newName = e.target.name.value;

    const result = await updateBySlug(this.state.label.slug, {
      name: newName
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
      // redirect
      // this.props.history.goBack();
      this.setState({
        ...this.state,
        redirectToLabels: true
      });
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

  render() {
    const label = this.state.label;

    return label ? (
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
    ) : (
      ""
    );
  }
}

export default Edit;
