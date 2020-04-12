import React, { Component } from "reactn";
import he from "he";
import { Redirect } from "react-router";
import Helmet from "react-helmet";
import ArticleBreadcrumbs from "../../components/articles/ArticleBreadcrumbs";
import Breadcrumb from "../../components/common/Breadcrumb";
import ArticleForm from "../../components/articles/ArticleForm";
import { findBySlug, update, showPath, editPath } from "../../models/articles";
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

  async componentDidMount() {
    this._isMounted = true;
    
    if (this._isMounted) {
      const article = await findBySlug(this.props.match.params.slug);
      this._canEditOrDelete = canEditOrDelete(this.global.token, this.global.groups, article.user_id);

      this.setState({ ...this.state, article });
    }
  }

  async componentWillUnmount() {
    this._canEditOrDelete = false;
    this._isMounted = false;
  }

  handleSubmit = async e => {
    e.preventDefault();

    this.setGlobal({
      ...this.global,
      uploading: true
    });

    scrollToTop();

    if (this._canEditOrDelete) {
      const result = await update(this.state.article.id, e.target);

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
          errors: {
            ...this.state.errors,
            ...resultErrors
          }
        });
  
        scrollToTop();
      } else {
        this.setState({
          ...this.state,
          redirectToArticle: true
        });
      }
    }
  };

  redirect() {
    return (
      this.state.redirectToArticle && (
        <Redirect
          to={{
            pathname: `/article/${this.state.article.slug}`,
            updated: true
          }}
        />
      )
    );
  }

  breadcrumbs() {
    return (
      <ArticleBreadcrumbs>
        <Breadcrumb to={showPath(this.state.article.slug)}>
          {he.decode(this.state.article.title)}
        </Breadcrumb>
        <Breadcrumb to={editPath()} active>
          Edit {he.decode(this.state.article.title)}
        </Breadcrumb>
      </ArticleBreadcrumbs>
    );
  }

  renderForm() {
    const article = this.state.article;

    return (
      <div>
        <Helmet>
          <title>{`Edit “${he.decode(article.title)}”`}</title>
        </Helmet>
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

  render() {
    const article = this.state.article;

    if (article) {
      return this._canEditOrDelete ? this.renderForm() : <Redirect to="/articles" />;
    } else {
      return "";
    }
  }
}

export default authUser(isAuthor(Edit));
