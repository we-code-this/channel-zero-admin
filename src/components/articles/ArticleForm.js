import _ from "lodash";
import React, { Component } from "react";
import { withRouter } from "react-router";
import MarkdownEditor from "../common/forms/MarkdownEditor";
import TextInput from "../common/forms/TextInput";
import ImageFileInputWithPreview from "../common/forms/ImageFileInputWithPreview";
import SubmitWithCancel from "../common/forms/SubmitWithCancel";
import { validTypes } from "../../config/images";
import { imageUrl } from "../../models/articles";

class ArticleForm extends Component {
  constructor(props) {
    super(props);

    const article = props.article
      ? props.article
      : {
          title: "",
          summary: "",
          description: ""
        };

    this.state = {
      article,
      image: undefined,
      preview_url: article.filename ? imageUrl(article.url) : undefined,
      wrong_format: false,
      errors: props.errors
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (!_.isEqual(props.errors, state.errors)) {
      return { ...state, errors: props.errors };
    }

    return null;
  }

  handleCancelClick = e => {
    e.preventDefault();
    this.props.history.goBack();
  };

  handleFileSelection = e => {
    if (this.valid(e.target.files[0].type)) {
      this.setState({
        ...this.state,
        image: e.target.files[0],
        preview_url: URL.createObjectURL(e.target.files[0]),
        wrong_format: false
      });
    } else {
      e.target.value = null;
      this.setState({
        ...this.state,
        preview_url: undefined,
        wrong_format: true
      });
    }
  };

  handleTitleChange = e => {
    const article = { ...this.state.article, title: e.target.value };
    this.setState({ ...this.state, article });
  };

  handleSummaryChange = value => {
    const article = { ...this.state.article, summary: value };
    this.setState({ ...this.state, article });
  };

  handleDescriptionChange = value => {
    const article = { ...this.state.article, description: value };
    this.setState({ ...this.state, article });
  };

  valid = type => {
    let valid = false;

    validTypes.map(validType => {
      if (validType === type) {
        valid = true;
      }

      return validType;
    });

    return valid;
  };

  render() {
    return (
      <form
        onSubmit={this.props.onSubmit}
        encType="multipart/form-data"
        className="form article-form"
      >
        <div className="columns">
          <div className="column">
            <TextInput
              label="Title"
              value={this.state.article.title}
              onChange={this.handleTitleChange}
              error={
                this.state.errors && this.state.errors.title
                  ? this.state.errors.title
                  : undefined
              }
            />
          </div>
        </div>
        <MarkdownEditor
          label="Summary"
          editorHeight="6rem"
          onChange={this.handleSummaryChange}
          value={this.state.article.summary}
          error={
            this.state.errors && this.state.errors.summary
              ? this.state.errors.summary
              : undefined
          }
        />
        <MarkdownEditor
          label="Description"
          onChange={this.handleDescriptionChange}
          value={this.state.article.description}
          error={
            this.state.errors && this.state.errors.description
              ? this.state.errors.description
              : undefined
          }
        />
        <ImageFileInputWithPreview
          preview_url={this.state.preview_url}
          error={this.state.wrong_format}
          error_message="Only jpg, jpeg and png images are valid"
          name="image"
          onChange={this.handleFileSelection}
        />
        {this.state.errors && this.state.errors.image && (
          <p className="help is-danger image-error">
            {this.state.errors.image}
          </p>
        )}
        <SubmitWithCancel onClick={this.handleCancelClick} />
      </form>
    );
  }
}

export default withRouter(ArticleForm);
