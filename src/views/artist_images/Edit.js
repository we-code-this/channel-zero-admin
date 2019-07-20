import React, { Component } from "reactn";
import { Redirect } from "react-router";
import Helmet from "react-helmet";
import ArtistBreadcrumbs from "../../components/artists/ArtistBreadcrumbs";
import Breadcrumb from "../../components/common/Breadcrumb";
import ArtistImageForm from "../../components/artists/ArtistImageForm";
import { showPath, findBySlug } from "../../models/artists";
import authUser from "../../components/auth/authUser";
import { edit, createPath } from "../../models/artist_images";
import isAdmin from "../../components/auth/isAdmin";

class Edit extends Component {
  constructor(props) {
    super(props);

    this._isMounted = false;

    this.state = {
      redirectToArtist: false,
      artist: undefined,
      image: undefined,
      errors: {
        image: undefined
      }
    };
  }

  async componentDidMount() {
    this._isMounted = true;

    const artist = await findBySlug(this.props.match.params.slug);

    if (this._isMounted) {
      let currentImage;

      artist.images.map(image => {
        if (image.id === parseInt(this.props.match.params.id)) {
          currentImage = image;
        }
        return image;
      });

      this.setState({ ...this.state, image: currentImage, artist });
    }
  }

  async componentWillUnmount() {
    this._isMounted = false;
  }

  handleSubmit = async e => {
    e.preventDefault();

    if (e.target.image.value) {
      const result = await edit(e.target);

      if (result.errors.length) {
        const resultErrors = {};

        result.errors.map(error => {
          resultErrors[error.field] = error.message;
          return error;
        });

        this.setState({
          ...this.state,
          errors: {
            ...this.state.errors,
            ...resultErrors
          }
        });
      } else {
        this.setState({
          ...this.state,
          redirectToArtist: true
        });
      }
    }
  };

  redirect() {
    return (
      this.state.redirectToArtist && (
        <Redirect
          to={{
            pathname: showPath(this.state.artist.slug),
            image_updated: true
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
        <Breadcrumb to={createPath()} active>
          Edit Artist Image
        </Breadcrumb>
      </ArtistBreadcrumbs>
    );
  }

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Edit Artist Image</title>
        </Helmet>
        {this.redirect()}
        {this.state.artist && (
          <div>
            {this.breadcrumbs()}
            <ArtistImageForm
              edit={true}
              image={this.state.image}
              artist_id={this.state.artist.id}
              onSubmit={this.handleSubmit}
              errors={this.state.errors}
            />            
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default authUser(isAdmin(Edit));
