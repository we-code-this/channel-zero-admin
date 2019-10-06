import React, { Component } from "reactn";
import Helmet from "react-helmet";
import ActionMenu from "../../components/common/ActionMenu";
import IconButton from "../../components/common/IconButton";
import PromoBreadcrumbs from "../../components/promos/PromoBreadcrumbs";
import PromoTable from "../../components/promos/PromoTable";
import { get, count, indexPath, createPath } from "../../models/promos";
import authUser from "../../components/auth/authUser";
import { canCreate } from "../../utilities/user";

class Index extends Component {
  constructor(props) {
    super(props);

    this._isMounted = false;

    this.state = {
      promos: [],
      page: 1,
      pageCount: 0,
      perPage: 10,
      path: indexPath()
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    await this.getPromos();
  }

  async componentDidUpdate() {
    if (
      this.props.match.params.page &&
      this.state.page !== parseInt(this.props.match.params.page)
    ) {
      await this.getPromos();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async getPromos() {
    const currentPage = this.props.match.params.page
      ? parseInt(this.props.match.params.page)
      : 1;

    const promos = await get({
      start: (currentPage - 1) * this.state.perPage,
      limit: this.state.perPage
    });
    const pageCount = Math.ceil((await count()) / this.state.perPage);

    if (this._isMounted) {
      this.setState({ ...this.state, promos, pageCount, page: currentPage });
    }
  }

  handleUpdate = async e => {
    await this.getPromos();
  };

  render() {    
    return (
      <div>
        <Helmet>
          <title>Promos</title>
        </Helmet>
        {canCreate(this.global.groups) && (
          <ActionMenu>
            <IconButton
              to={createPath()}
              className="is-primary"
              icon="plus"
              label="Promo"
            />
          </ActionMenu>
        )}
        <PromoBreadcrumbs active={true} />
        <PromoTable {...this.state} onUpdate={this.handleUpdate} />
      </div>
    );
  }
}

export default authUser(Index);
