import React, { Component } from "react";
import Helmet from "react-helmet";
import ArtistTable from "../../components/artists/ArtistTable";
import { get, count } from "../../models/artists";

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      artists: [],
      pageCount: 0,
      perPage: 10,
      path: "/artists"
    };
  }

  async componentDidMount() {
    await this.getArtists();
  }

  async componentDidUpdate() {
    await this.getArtists();
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

    this.setState({ ...this.state, artists, pageCount });
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
