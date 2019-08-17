import React, { Component } from "reactn";
import Helmet from "react-helmet";
import ArticleTable from "../../components/articles/ArticleTable";
import ActionMenu from "../../components/common/ActionMenu";
import ArticleBreadcrumbs from "../../components/articles/ArticleBreadcrumbs";
import IconButton from "../../components/common/IconButton";
import authUser from "../../components/auth/authUser";
import { get, count, createPath } from "../../models/articles";
import { canCreate } from "../../utilities/user";

class Index extends Component {
  constructor(props) {
    super(props);

    this._isMounted = false;

    this.state = {
      articles: [],
      page: 1,
      pageCount: 0,
      perPage: 10,
      path: "/articles"
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    await this.getArticles();
  }

  async componentDidUpdate() {
    if (
      this.props.match.params.page &&
      this.state.page !== parseInt(this.props.match.params.page)
    ) {
      await this.getArticles();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async getArticles() {
    const currentPage = this.props.match.params.page
      ? parseInt(this.props.match.params.page)
      : 1;

    const articles = await get({
      start: (currentPage - 1) * this.state.perPage,
      limit: this.state.perPage
    });
    const pageCount = Math.ceil((await count()) / this.state.perPage);

    if (this._isMounted) {
      this.setState({ ...this.state, articles, pageCount, page: currentPage });
    }
  }

  handleUpdate = async e => {
    await this.getArticles();
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>Articles</title>
        </Helmet>
        {canCreate(this.global.groups) && (
          <ActionMenu>
          <IconButton
            to={createPath()}
            className="is-primary"
            icon="plus"
            label="Article"
          />
        </ActionMenu>
        )}
        <ArticleBreadcrumbs active={true} />
        <ArticleTable {...this.state} onUpdate={this.handleUpdate} />
      </div>
    );
  }
}

export default authUser(Index);
