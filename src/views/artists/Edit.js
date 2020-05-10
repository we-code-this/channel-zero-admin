import React, { Component } from "reactn";
import he from "he";
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
import authUser from "../../components/auth/authUser";
import isAuthor from "../../components/auth/isAuthor";
import { canEditOrDelete } from "../../utilities/user";

class Edit extends Component {
  constructor(props) {
    super(props);

    this._canEditOrDelete = false;
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

    if (this._isMounted) {
      const artist = await findBySlug(this.props.match.params.slug);
      this._canEditOrDelete = canEditOrDelete(this.global.token, this.global.groups, artist.user_id);
      this.setState({ ...this.state, artist });
    }
  }

  async componentWillUnmount() {
    this._isMounted = false;
    this._canEditOrDelete = false;
  }

  handleSubmit = async e => {
    e.preventDefault();

    if (this._canEditOrDelete) {
      
      this.setGlobal({
        ...this.global,
        uploading: true
      });

      const newName = e.target.name.value;
      const newDescription = e.target.description.value;
  
      const result = await updateBySlug(this.state.artist.slug, {
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
          {he.decode(this.state.artist.name)}
        </Breadcrumb>
        <Breadcrumb to={editPath(this.state.artist.slug)} active>
          Edit “{he.decode(this.state.artist.name)}”
        </Breadcrumb>
      </ArtistBreadcrumbs>
    );
  }

  renderForm() {
    const artist = this.state.artist;
    
    return (
      <div>
        <Helmet>
          <title>{`Edit “${he.decode(artist.name)}”`}</title>
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

  render() {
    const artist = this.state.artist;

    if (artist) {
      return this._canEditOrDelete ? this.renderForm() : <Redirect to="/artists" />;
    } else {
      return "";
    }
    
  }
}

export default authUser(isAuthor(Edit));
