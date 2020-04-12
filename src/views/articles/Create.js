import React, { Component } from "reactn";
import { Redirect } from "react-router";
import ArticleBreadcrumbs from "../../components/articles/ArticleBreadcrumbs";
import Breadcrumb from "../../components/common/Breadcrumb";
import ArticleForm from "../../components/articles/ArticleForm";
import { create, createPath } from "../../models/articles";
import { scrollToTop } from "../../utilities/scroll";
import authUser from "../../components/auth/authUser";
import isAuthor from "../../components/auth/isAuthor";

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToArticle: false,
      article: undefined,
      errors: {
        image: undefined,
        title: undefined,
        summary: undefined,
        description: undefined
      }
    };
  }

  handleSubmit = async e => {
    e.preventDefault();

    this.setGlobal({
      ...this.global,
      uploading: true
    });

    scrollToTop();

    const newTitle = e.target.title.value;
    const newSummary = e.target.summary.value;
    const newDescription = e.target.description.value;

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
          article: {
          ...this.state.article,
          name: newTitle,
          summary: newSummary,
          description: newDescription
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
        article: {
        ...this.state.article,
        slug: result.slug
        },
        redirectToArticle: true
    });
    }
  };

  redirect() {
    return (
      this.state.redirectToArticle && (
        <Redirect
          to={{
            pathname: `/article/${this.state.article.slug}`,
            created: true
          }}
        />
      )
    );
  }

  breadcrumbs() {
    return (
      <ArticleBreadcrumbs>
        <Breadcrumb to={createPath()} active>
          Create Article
        </Breadcrumb>
      </ArticleBreadcrumbs>
    );
  }

  render() {
    const article = this.state.article;

    return (
      <div>
        {this.redirect()}
        {this.breadcrumbs()}
        <ArticleForm
          article={article}
          onSubmit={this.handleSubmit}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

export default authUser(isAuthor(Create));
