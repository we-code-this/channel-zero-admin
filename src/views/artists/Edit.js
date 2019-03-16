import React, { Component } from "react";
import { Redirect } from "react-router";
import Helmet from "react-helmet";
import ArtistBreadcrumbs from "../../components/artists/ArtistBreadcrumbs";
import Breadcrumb from "../../components/common/Breadcrumb";
import ArtistForm from "../../components/artists/ArtistForm";
import {
  findBySlug,
  updateBySlug,
  showPath,
  editPath
} from "../../models/artists";

class Edit extends Component {
  constructor(props) {
    super(props);

    this._isMounted = false;

    this.state = {
      redirectToArtist: false,
      artist: undefined,
      errors: {
        name: undefined,
        description: undefined
      }
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

  handleSubmit = async e => {
    e.preventDefault();

    const newName = e.target.name.value;
    const newDescription = e.target.description.value;

    const result = await updateBySlug(this.state.artist.slug, {
      name: newName,
      description: newDescription
    });

    if (result.errors) {
      const resultErrors = {};

      result.errors.map(error => {
        resultErrors[error.field] = error.message;
        return error;
      });

      this.setState({
        ...this.state,
        artist: {
          ...this.state.artist,
          name: newName,
          description: newDescription
        },
        errors: {
          ...this.state.errors,
          ...resultErrors
        }
      });
    } else {
      // redirect
      // this.props.history.goBack();
      this.setState({
        ...this.state,
        redirectToArtist: true
      });
    }
  };

  redirect() {
    return (
      this.state.redirectToArtist && (
        <Redirect
          to={{
            pathname: `/artist/${this.state.artist.slug}`,
            updated: true
          }}
        />
      )
    );
  }

  breadcrumbs() {
    return (
      <ArtistBreadcrumbs>
        <Breadcrumb to={showPath(this.state.artist.slug)}>
          {this.state.artist.name}
        </Breadcrumb>
        <Breadcrumb to={editPath(this.state.artist.slug)} active>
          Edit “{this.state.artist.name}”
        </Breadcrumb>
      </ArtistBreadcrumbs>
    );
  }

  render() {
    const artist = this.state.artist;

    return artist ? (
      <div>
        <Helmet>
          <title>{`Edit “${artist.name}”`}</title>
        </Helmet>
        {this.redirect()}
        {this.breadcrumbs()}
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