import React, { Component } from "reactn";
import Helmet from "react-helmet";
import ActionMenu from "../../components/common/ActionMenu";
import IconButton from "../../components/common/IconButton";
import BannerBreadcrumbs from "../../components/banners/BannerBreadcrumbs";
import BannerTable from "../../components/banners/BannerTable";
import { get, count, indexPath, createPath } from "../../models/banners";
import authUser from "../../components/auth/authUser";
import isEditor from "../../components/auth/isEditor";

class Index extends Component {
  constructor(props) {
    super(props);

    this._isMounted = false;

    this.state = {
      banners: [],
      page: 1,
      pageCount: 0,
      perPage: 10,
      path: indexPath()
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    await this.getBanners();
  }

  async componentDidUpdate() {
    if (
      this.props.match.params.page &&
      this.state.page !== parseInt(this.props.match.params.page)
    ) {
      await this.getBanners();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async getBanners() {
    const currentPage = this.props.match.params.page
      ? parseInt(this.props.match.params.page)
      : 1;

    const banners = await get({
      start: (currentPage - 1) * this.state.perPage,
      limit: this.state.perPage
    });

    const pageCount = Math.ceil((await count()) / this.state.perPage);

    if (this._isMounted) {
      this.setState({ ...this.state, banners, pageCount, page: currentPage });
    }
  }

  handleUpdate = async e => {
    await this.getBanners();
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>Users</title>
        </Helmet>
        <ActionMenu>
          <IconButton
            to={createPath()}
            className="is-primary"
            icon="plus"
            label="Banner"
          />
        </ActionMenu>
        <BannerBreadcrumbs active={true} />
        <BannerTable {...this.state} onUpdate={this.handleUpdate} showActions />
      </div>
    );
  }
}

export default authUser(isEditor(Index));
