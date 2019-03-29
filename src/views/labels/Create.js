import React, { Component } from "react";
import { Redirect } from "react-router";
import LabelBreadcrumbs from "../../components/labels/LabelBreadcrumbs";
import Breadcrumb from "../../components/common/Breadcrumb";
import LabelForm from "../../components/labels/LabelForm";
import { create, createPath } from "../../models/labels";

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToLabels: false,
      label: {
        name: ""
      },
      errors: {
        name: undefined
      }
    };
  }

  handleSubmit = async e => {
    e.preventDefault();

    const newName = e.target.name.value;
    const result = await create({
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
        label: {
          name: newName
        },
        redirectToLabels: true
      });
    }
  };

  redirect() {
    return (
      this.state.redirectToLabels && (
        <Redirect
          to={{
            pathname: "/labels",
            created: true
          }}
        />
      )
    );
  }

  breadcrumbs() {
    return (
      <LabelBreadcrumbs>
        <Breadcrumb to={createPath()} active>
          Create Label
        </Breadcrumb>
      </LabelBreadcrumbs>
    );
  }

  render() {
    const label = this.state.label;

    return (
      <div>
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
}

export default Create;
