import React, { Component } from "reactn";
import Helmet from "react-helmet";
import ActionMenu from "../../components/common/ActionMenu";
import IconButton from "../../components/common/IconButton";
import UserBreadcrumbs from "../../components/users/UserBreadcrumbs";
import UserTable from "../../components/users/UserTable";
import { get, count, indexPath, createPath } from "../../models/users";
import authUser from "../../components/auth/authUser";
import isAdmin from "../../components/auth/isAdmin";

class Index extends Component {
  constructor(props) {
    super(props);

    this._isMounted = false;

    this.state = {
      users: [],
      page: 1,
      pageCount: 0,
      perPage: 10,
      path: indexPath()
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    await this.getUsers();
  }

  async componentDidUpdate() {
    if (
      this.props.match.params.page &&
      this.state.page !== parseInt(this.props.match.params.page)
    ) {
      await this.getUsers();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async getUsers() {
    const currentPage = this.props.match.params.page
      ? parseInt(this.props.match.params.page)
      : 1;

    const users = await get({
      start: (currentPage - 1) * this.state.perPage,
      limit: this.state.perPage
    });

    const pageCount = Math.ceil((await count()) / this.state.perPage);

    if (this._isMounted) {
      this.setState({ ...this.state, users, pageCount, page: currentPage });
    }
  }

  handleUpdate = async e => {
    await this.getUsers();
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
            label="User"
          />
        </ActionMenu>
        <UserBreadcrumbs active={true} />
        <UserTable {...this.state} onUpdate={this.handleUpdate} />
      </div>
    );
  }
}

export default authUser(isAdmin(Index));
