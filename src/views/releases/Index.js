import React, { Component } from "react";
import Helmet from "react-helmet";
import ActionMenu from "../../components/common/ActionMenu";
import IconButton from "../../components/common/IconButton";
import ReleaseBreadcrumbs from "../../components/releases/ReleaseBreadcrumbs";
import ReleaseTable from "../../components/releases/ReleaseTable";
import { get, count, indexPath, createPath } from "../../models/releases";

class Index extends Component {
  constructor(props) {
    super(props);

    this._isMounted = false;

    this.state = {
      releases: [],
      page: 1,
      pageCount: 0,
      perPage: 10,
      path: indexPath()
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    await this.getReleases();
  }

  async componentDidUpdate() {
    if (
      this.props.match.params.page &&
      this.state.page !== parseInt(this.props.match.params.page)
    ) {
      await this.getReleases();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async getReleases() {
    const currentPage = this.props.match.params.page
      ? parseInt(this.props.match.params.page)
      : 1;

    const releases = await get({
      start: (currentPage - 1) * this.state.perPage,
      limit: this.state.perPage
    });
    const pageCount = Math.ceil((await count()) / this.state.perPage);

    if (this._isMounted) {
      this.setState({ ...this.state, releases, pageCount, page: currentPage });
    }
  }

  handleUpdate = async e => {
    await this.getReleases();
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>Releases</title>
        </Helmet>
        <ActionMenu>
          <IconButton
            to={createPath()}
            className="is-primary"
            icon="plus"
            label="Release"
          />
        </ActionMenu>
        <ReleaseBreadcrumbs active={true} />
        <ReleaseTable {...this.state} onUpdate={this.handleUpdate} />
      </div>
    );
  }
}

export default Index;
