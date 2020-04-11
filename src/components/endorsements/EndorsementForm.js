import _ from "lodash";
import React, { Component } from "react";
import he from "he";
import { withRouter } from "react-router";
import MarkdownEditor from "../common/forms/MarkdownEditor";
import TextInput from "../common/forms/TextInput";
import SubmitWithCancel from "../common/forms/SubmitWithCancel";

class EndorsementForm extends Component {
  constructor(props) {
    super(props);

    const endorsement = props.endorsement
      ? {
        related_id: props.endorsement.related_id,
        review: he.decode(props.endorsement.review),
        reviewer: he.decode(props.endorsement.reviewer),
        url: props.endorsement.url,
      }
      : {
        related_id: props.release.id,
        review: '',
        reviewer: '',
        url: '',
      };

    this.state = {
      endorsement: endorsement,
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

  handleReviewChange = value => {
    const endorsement = { ...this.state.endorsement, review: value };
    this.setState({ ...this.state, endorsement });
  };

  handleReviewerChange = e => {
    const endorsement = { ...this.state.endorsement, reviewer: e.target.value };

    this.setState({ ...this.state, endorsement });
  };

  handleUrlChange = e => {
    const endorsement = { ...this.state.endorsement, url: e.target.value };

    this.setState({ ...this.state, endorsement });
  };

  render() {
    return (
      <form
        onSubmit={this.props.onSubmit}
        className="form credit-form"
      >
        <input type="hidden" name="related_id" value={this.state.endorsement.related_id} />

        <div className="columns">
          <div className="column is-quarter">
            <TextInput
              label="Reviewer"
              onChange={this.handleReviewerChange}
              value={this.state.endorsement.reviewer}
              error={
                this.state.errors && this.state.errors.reviewer
                  ? this.state.errors.reviewer
                  : undefined
              }
            />
          </div>
          <div className="column is-three-quarters">
            <TextInput
              label="URL"
              onChange={this.handleUrlChange}
              value={this.state.endorsement.url}
              error={
                this.state.errors && this.state.errors.url
                  ? this.state.errors.url
                  : undefined
              }
            />
          </div>
        </div>
        <MarkdownEditor
          label="Review"
          onChange={this.handleReviewChange}
          value={this.state.endorsement.review}
          error={
            this.state.errors && this.state.errors.review
              ? this.state.errors.review
              : undefined
          }
        />
        
        <SubmitWithCancel onClick={this.handleCancelClick} />
      </form>
    );
  }
}

export default withRouter(EndorsementForm);
