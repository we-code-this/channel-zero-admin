import React, { Component } from "react";
import Helmet from "react-helmet";
import ActionMenu from "../../components/common/ActionMenu";
import IconButton from "../../components/common/IconButton";
import VendorBreadcrumbs from "../../components/vendors/VendorBreadcrumbs";
import VendorTable from "../../components/vendors/VendorTable";
import { get, count, indexPath, createPath } from "../../models/vendors";
import authUser from "../../components/auth/authUser";

class Index extends Component {
  constructor(props) {
    super(props);

    this._isMounted = false;

    this.state = {
      vendors: [],
      page: 1,
      pageCount: 0,
      perPage: 10,
      path: indexPath()
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    await this.getVendors();
  }

  async componentDidUpdate() {
    if (
      this.props.match.params.page &&
      this.state.page !== parseInt(this.props.match.params.page)
    ) {
      await this.getVendors();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async getVendors() {
    const currentPage = this.props.match.params.page
      ? parseInt(this.props.match.params.page)
      : 1;

    const vendors = await get({
      start: (currentPage - 1) * this.state.perPage,
      limit: this.state.perPage
    });

    const pageCount = Math.ceil((await count()) / this.state.perPage);

    if (this._isMounted) {
      this.setState({ ...this.state, vendors, pageCount, page: currentPage });
    }
  }

  handleUpdate = async e => {
    await this.getVendors();
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>Vendors</title>
        </Helmet>
        <ActionMenu>
          <IconButton
            to={createPath()}
            className="is-primary"
            icon="plus"
            label="Vendor"
          />
        </ActionMenu>
        <VendorBreadcrumbs active={true} />
        <VendorTable {...this.state} onUpdate={this.handleUpdate} />
      </div>
    );
  }
}

export default authUser(Index);
