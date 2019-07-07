import React, { Component } from "reactn";
import Helmet from "react-helmet";
import ArtistTable from "../../components/artists/ArtistTable";
import ActionMenu from "../../components/common/ActionMenu";
import ArtistBreadcrumbs from "../../components/artists/ArtistBreadcrumbs";
import IconButton from "../../components/common/IconButton";
import authUser from "../../components/auth/authUser";
import { get, count, createPath } from "../../models/artists";

class Index extends Component {
  constructor(props) {
    super(props);

    this._isMounted = false;

    this.state = {
      artists: [],
      page: 1,
      pageCount: 0,
      perPage: 10,
      path: "/artists"
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    await this.getArtists();
  }

  async componentDidUpdate() {
    if (
      this.props.match.params.page &&
      this.state.page !== parseInt(this.props.match.params.page)
    ) {
      await this.getArtists();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async getArtists() {
    const currentPage = this.props.match.params.page
      ? parseInt(this.props.match.params.page)
      : 1;

    const artists = await get({
      start: (currentPage - 1) * this.state.perPage,
      limit: this.state.perPage
    });
    const pageCount = Math.ceil((await count()) / this.state.perPage);

    if (this._isMounted) {
      this.setState({ ...this.state, artists, pageCount, page: currentPage });
    }
  }

  handleUpdate = async e => {
    await this.getArtists();
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>Artists</title>
        </Helmet>
        <ActionMenu>
          <IconButton
            to={createPath()}
            className="is-primary"
            icon="plus"
            label="Artist"
          />
        </ActionMenu>
        <ArtistBreadcrumbs active={true} />
        <ArtistTable {...this.state} onUpdate={this.handleUpdate} />
      </div>
    );
  }
}

export default authUser(Index);
