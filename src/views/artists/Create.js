import React, { Component } from "reactn";
import { Redirect } from "react-router";
import Helmet from "react-helmet";
import ArtistBreadcrumbs from "../../components/artists/ArtistBreadcrumbs";
import Breadcrumb from "../../components/common/Breadcrumb";
import ArtistForm from "../../components/artists/ArtistForm";
import authUser from "../../components/auth/authUser";
import { create, createPath } from "../../models/artists";
import isAuthor from "../../components/auth/isAuthor";

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToArtist: false,
      artist: {
        name: "",
        description: "",
        slug: ""
      },
      errors: {
        name: undefined,
        description: undefined
      }
    };
  }

  handleSubmit = async e => {
    e.preventDefault();

    this.setGlobal({
      ...this.global,
      uploading: true
    });

    const newName = e.target.name.value;
    const newDescription = e.target.description.value;

    const result = await create({
      name: newName,
      description: newDescription
    });

    this.setGlobal({
      ...this.global,
      uploading: false
    });

    if (result.errors.length) {
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
      this.setState({
        ...this.state,
        artist: {
          ...this.state.artist,
          slug: result.slug
        },
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
            created: true
          }}
        />
      )
    );
  }

  breadcrumbs() {
    return (
      <ArtistBreadcrumbs>
        <Breadcrumb to={createPath()} active>
          Create Artist
        </Breadcrumb>
      </ArtistBreadcrumbs>
    );
  }

  render() {
    const artist = this.state.artist;

    return (
      <div>
        <Helmet>
          <title>Create Artist</title>
        </Helmet>
        {this.redirect()}
        {this.breadcrumbs()}
        <ArtistForm
          artist={artist}
          onSubmit={this.handleSubmit}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

export default authUser(isAuthor(Create));
