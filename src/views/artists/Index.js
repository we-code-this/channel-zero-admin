import React, { Component } from "react";
import Helmet from "react-helmet";
import ArtistTable from "../../components/artists/ArtistTable";
import { get, count } from "../../models/artists";

class Index extends Component {
  constructor(props) {
    super(props);

    this._isMounted = false;

    this.state = {
      artists: [],
      pageCount: 0,
      perPage: 10,
      path: props.match.path
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    await this.getArtists();
  }

  async componentDidUpdate() {
    await this.getArtists();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async getArtists() {
    const currentPage = this.props.match.params.page
      ? this.props.match.params.page
      : 1;
    const artists = await get({
      start: (currentPage - 1) * this.state.perPage,
      limit: this.state.perPage
    });
    const pageCount = Math.ceil((await count()) / this.state.perPage);

    if (this._isMounted) {
      this.setState({ ...this.state, artists, pageCount });
    }
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Artists</title>
        </Helmet>
        <ArtistTable {...this.state} />
      </div>
    );
  }
}

export default Index;
