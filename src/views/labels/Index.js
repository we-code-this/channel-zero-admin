import React, { Component } from "reactn";
import Helmet from "react-helmet";
import ActionMenu from "../../components/common/ActionMenu";
import IconButton from "../../components/common/IconButton";
import LabelTable from "../../components/labels/LabelTable";
import LabelBreadcrumbs from "../../components/labels/LabelBreadcrumbs";
import { get, count, createPath } from "../../models/labels";
import authUser from "../../components/auth/authUser";
import { canCreate } from "../../utilities/user";

class Index extends Component {
  constructor(props) {
    super(props);

    this._isMounted = false;

    this.state = {
      labels: [],
      page: 1,
      pageCount: 0,
      perPage: 10,
      path: "/labels"
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    await this.getLabels();
  }

  async componentDidUpdate() {
    if (
      this.props.match.params.page &&
      this.state.page !== parseInt(this.props.match.params.page)
    ) {
      await this.getLabels();
    }
  }

  async getLabels() {
    const currentPage = this.props.match.params.page
      ? parseInt(this.props.match.params.page)
      : 1;

    const labels = await get({
      start: (currentPage - 1) * this.state.perPage,
      limit: this.state.perPage
    });
    const pageCount = Math.ceil((await count()) / this.state.perPage);

    if (this._isMounted) {
      this.setState({ ...this.state, labels, pageCount, page: currentPage });
    }
  }

  handleUpdate = async e => {
    await this.getLabels();
  };

  render() {

    return (
      <div>
        <Helmet>
          <title>Labels</title>
        </Helmet>
        {canCreate(this.global.groups) && (
          <ActionMenu>
            <IconButton
              to={createPath()}
              className="is-primary"
              icon="plus"
              label="Label"
            />
          </ActionMenu>
        )}
        <LabelBreadcrumbs active={true} />
        <LabelTable {...this.state} onUpdate={this.handleUpdate} />
      </div>
    );
  }
}

export default authUser(Index);
