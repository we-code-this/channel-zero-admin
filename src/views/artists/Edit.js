import React, { Component } from "react";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import Breadcrumb from "../../components/common/Breadcrumb";
import ArtistForm from "../../components/artists/ArtistForm";
import { findBySlug } from "../../models/artists";

class Edit extends Component {
  constructor(props) {
    super(props);

    this._isMounted = false;

    this.state = {
      artist: undefined,
      errors: undefined
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    const artist = await findBySlug(this.props.match.params.slug);

    if (this._isMounted) {
      this.setState({ ...this.state, artist });
    }
  }

  async componentWillUnmount() {
    this._isMounted = false;
  }

  handleSubmit = e => {
    e.preventDefault();

    // validate data

    // if valid, make POST API request
    // catch error and add view level error
    // else set error state
  };

  render() {
    const artist = this.state.artist;

    return artist ? (
      <div>
        <Breadcrumbs>
          <Breadcrumb to="/">Dashboard</Breadcrumb>
          <Breadcrumb to="/artists">Artists</Breadcrumb>
          <Breadcrumb to={`/artist/${artist.slug}`}>{artist.name}</Breadcrumb>
          <Breadcrumb to={`/artist/${artist.slug}/edit`} active>
            Edit “{artist.name}”
          </Breadcrumb>
        </Breadcrumbs>
        <ArtistForm
          artist={artist}
          onSubmit={this.handleSubmit}
          errors={this.state.errors}
        />
      </div>
    ) : (
      ""
    );
  }
}

export default Edit;
