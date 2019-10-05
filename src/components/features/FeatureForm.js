import React, { Component } from "react";
import { withRouter } from "react-router";
import SubmitWithCancel from "../common/forms/SubmitWithCancel";
import ArticleSelect from "../articles/ArticleSelect";
import VideoSelect from "../videos/VideoSelect";

class FeatureForm extends Component {
  constructor(props) {
    super(props);

    const feature = props.feature
      ? props.feature
      : {
          article_id: undefined,
          video_id: undefined
        };

    this.state = {
      feature
    };
  }

  handleCancelClick = e => {
    e.preventDefault();
    this.props.history.goBack();
  };

  handleArticleChange = e => {
    const feature = { ...this.state.feature, article_id: e.target.value };
    this.setState({ ...this.state, feature });
  };

  handleVideoChange = e => {
    const feature = { ...this.state.feature, video_id: e.target.value };
    this.setState({ ...this.state, feature });
  };

  render() {
    return (
      <form
        onSubmit={this.props.onSubmit}
        className="form"
      >
        <div className="columns">
          <div className="column is-one-half">
            <ArticleSelect
              onChange={this.handleArticleChange}
              value={this.state.feature.article_id}
            />
          </div>
          <div className="column is-one-half">
            <VideoSelect
              onChange={this.handleVideoChange}
              value={this.state.feature.video_id}
            />
          </div>
        </div>
        <SubmitWithCancel onClick={this.handleCancelClick} />
      </form>
    );
  }
}

export default withRouter(FeatureForm);
