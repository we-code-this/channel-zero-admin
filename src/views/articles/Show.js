import React, { Component } from "reactn";
import he from "he";
import { Redirect } from "react-router-dom";
import Helmet from "react-helmet";
import ArticleBreadcrumbs from "../../components/articles/ArticleBreadcrumbs";
import ArticleShowColumns from "../../components/articles/ArticleShowColumns";
import Breadcrumb from "../../components/common/Breadcrumb";
import IconButton from "../../components/common/IconButton";
import DeleteModalButton from "../../components/common/DeleteModalButton";
import ActionMenu from "../../components/common/ActionMenu";
import PublishButton from "../../components/common/PublishButton";
import Notification from "../../components/common/Notification";
import authUser from "../../components/auth/authUser";
import {
  findBySlug,
  indexPath,
  editPath,
  showPath,
  deleteArticle,
  togglePublish
} from "../../models/articles";
import { canEditOrDelete } from "../../utilities/user";

class Show extends Component {
  constructor(props) {
    super(props);

    this._canEditOrDelete = false;
    this._isMounted = false;

    const updated = props.location.updated ? props.location.updated : false;
    const created = props.location.created ? props.location.created : false;

    this.state = {
      deleted: false,
      updated,
      created,
      article: undefined
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
    this._isMounted = false;
    this._canEditOrDelete = false;
  }

  handlePublish = async e => {
    e.preventDefault();
    if (this._canEditOrDelete) {
      const article = await togglePublish(
        this.state.article.id,
        this.state.article.published
      );
      this.setState({ ...this.state, article, updated: true });
      this.forceUpdate();
    }
  };

  handleDismiss = () => {
    this.setState({
      ...this.state,
      updated: false,
      created: false,
    });
  };

  handleDelete = async e => {
    e.preventDefault();

    await deleteArticle(this.state.article.id);
    this.setState({ ...this.state, deleted: true });
    this.forceUpdate();
  };

  actionMenu = () => {
    return this._canEditOrDelete ? (
      <ActionMenu>
        <IconButton
          to={editPath(this.state.article.slug)}
          className="is-primary"
          icon="edit"
          label="Edit"
        />
        <DeleteModalButton
          onSubmit={this.handleDelete}
        />
        <PublishButton
          published={this.state.article.published}
          onSubmit={this.handlePublish}
        />
      </ActionMenu>
    ) : null;
  };

  breadcrumbs = () => {
    return (
      <ArticleBreadcrumbs>
        <Breadcrumb to={showPath(this.state.article.slug)} active>
          {he.decode(this.state.article.title)}
        </Breadcrumb>
      </ArticleBreadcrumbs>
    );
  };

  notificationMessage = () => {
    if (this.state.created) {
      return (
        <span>
          <strong>{this.state.article.title}</strong> successfully created!
        </span>
      );
    }

    if (this.state.updated) {
      return (
        <span>
          <strong>{this.state.article.title}</strong> successfully updated!
        </span>
      );
    }

    return "";
  };

  showNotification = () => {
    return (
      this.state.updated ||
      this.state.created
    );
  };

  render() {
    const article = this.state.article;

    if (this.state.deleted) {
      return <Redirect to={indexPath()} />;
    } else {
      if (article) {
        return (
          <div>
            <Helmet>
              <title>{article.title}</title>
            </Helmet>
            {this.actionMenu()}
            {this.breadcrumbs()}
            <Notification
              show={this.showNotification()}
              color="success"
              onDismiss={this.handleDismiss}
            >
              {this.notificationMessage()}
            </Notification>
            <h2 className="title is-2">{he.decode(article.title)}</h2>
            <ArticleShowColumns
              article={article}
            />
          </div>
        );
      } else {
        return <div />;
      }
    }
  }
}

export default authUser(Show);
