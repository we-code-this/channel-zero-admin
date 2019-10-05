import React, { Component } from "reactn";
import Helmet from "react-helmet";
import ActionMenu from "../../components/common/ActionMenu";
import IconButton from "../../components/common/IconButton";
import FeatureBreadcrumbs from "../../components/features/FeatureBreadcrumbs";
import FeatureTable from "../../components/features/FeatureTable";
import { get, count, indexPath, createPath } from "../../models/features";
import authUser from "../../components/auth/authUser";
import { canCreate } from "../../utilities/user";

class Index extends Component {
  constructor(props) {
    super(props);

    this._isMounted = false;

    this.state = {
      features: [],
      page: 1,
      pageCount: 0,
      perPage: 10,
      path: indexPath()
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    await this.getFeatures();
  }

  async componentDidUpdate() {
    if (
      this.props.match.params.page &&
      this.state.page !== parseInt(this.props.match.params.page)
    ) {
      await this.getFeatures();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async getFeatures() {
    const currentPage = this.props.match.params.page
      ? parseInt(this.props.match.params.page)
      : 1;

    const features = await get({
      start: (currentPage - 1) * this.state.perPage,
      limit: this.state.perPage
    });
    const pageCount = Math.ceil((await count()) / this.state.perPage);

    if (this._isMounted) {
      this.setState({ ...this.state, features, pageCount, page: currentPage });
    }
  }

  handleUpdate = async e => {
    await this.getFeatures();
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>Features</title>
        </Helmet>
        {canCreate(this.global.groups) && (
          <ActionMenu>
            <IconButton
              to={createPath()}
              className="is-primary"
              icon="plus"
              label="Feature"
            />
          </ActionMenu>
        )}
        <FeatureBreadcrumbs active={true} />
        <FeatureTable {...this.state} onUpdate={this.handleUpdate} />
      </div>
    );
  }
}

export default authUser(Index);
