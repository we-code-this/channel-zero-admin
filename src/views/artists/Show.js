import React, { Component } from "reactn";
import he from "he";
import { Redirect } from "react-router-dom";
import Helmet from "react-helmet";
import ArtistBreadcrumbs from "../../components/artists/ArtistBreadcrumbs";
import ArtistShowColumns from "../../components/artists/ArtistShowColumns";
import Breadcrumb from "../../components/common/Breadcrumb";
import IconButton from "../../components/common/IconButton";
import IconDeleteButton from "../../components/common/IconDeleteButton";
import ActionMenu from "../../components/common/ActionMenu";
import Notification from "../../components/common/Notification";
import authUser from "../../components/auth/authUser";
import {
  findBySlug,
  indexPath,
  editPath,
  showPath,
  deleteArtist
} from "../../models/artists";
import {
  createPath as imageCreatePath,
  deleteImage
} from "../../models/artist_images";
import { canEditOrDelete } from "../../utilities/user";

class Show extends Component {
  constructor(props) {
    super(props);

    this._isMounted = false;

    const updated = props.location.updated ? props.location.updated : false;
    const created = props.location.created ? props.location.created : false;
    const image_added = props.location.image_added
      ? props.location.image_added
      : false;
    const image_updated = props.location.image_updated
      ? props.location.image_updated
      : false;

    this.state = {
      deleted: false,
      has_releases_error: false,
      has_releases_error_message: undefined,
      updated,
      created,
      image_added,
      image_updated,
      artist: undefined
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

  handleDismiss = () => {
    this.setState({
      ...this.state,
      updated: false,
      created: false,
      image_added: false,
      image_updated: false,
      has_releases_error: false,
      has_releases_error_message: undefined
    });
  };

  handleDelete = async e => {
    e.preventDefault();

    const deleteResponse = await deleteArtist(this.state.artist.id);

    if (deleteResponse.error) {
      this.setState({
        ...this.state,
        has_releases_error: true,
        has_releases_error_message: deleteResponse.error
      });
    } else {
      this.setState({ ...this.state, deleted: true });
    }

    this.forceUpdate();
  };

  handleImageDelete = async e => {
    e.preventDefault();

    await deleteImage(e.target.id.value);

    const artist = await findBySlug(this.props.match.params.slug);
    this.setState({ ...this.state, artist });
    this.forceUpdate();
  };

  actionMenu = () => {
    const admin = canEditOrDelete(this.global.token, this.global.groups, this.state.artist.user_id);

    return admin ? (
      <ActionMenu>
        <IconButton
          to={editPath(this.state.artist.slug)}
          className="is-primary"
          icon="edit"
          label="Edit"
        />
        <IconDeleteButton
          className="is-danger"
          icon="minus-circle"
          label="Delete"
          onSubmit={this.handleDelete}
        />
        <IconButton
          to={imageCreatePath(this.state.artist.slug)}
          className="is-success"
          icon="plus"
          label="Image"
        />
      </ActionMenu>
    ) : null;
  };

  breadcrumbs = () => {
    return (
      <ArtistBreadcrumbs>
        <Breadcrumb to={showPath(this.state.artist.slug)} active>
          {he.decode(this.state.artist.name)}
        </Breadcrumb>
      </ArtistBreadcrumbs>
    );
  };

  notificationMessage = () => {
    if (this.state.has_releases_error) {
      return <span>{this.state.has_releases_error_message}</span>;
    }

    if (this.state.created) {
      return (
        <span>
          <strong>{this.state.artist.name}</strong> successfully created!
        </span>
      );
    }

    if (this.state.updated) {
      return (
        <span>
          <strong>{this.state.artist.name}</strong> successfully updated!
        </span>
      );
    }

    if (this.state.image_added) {
      return <span>Image successfully added!</span>;
    }

    if (this.state.image_updated) {
      return <span>Image successfully updated!</span>;
    }

    return "";
  };

  showNotification = () => {
    return (
      this.state.has_releases_error ||
      this.state.updated ||
      this.state.created ||
      this.state.image_added ||
      this.state.image_updated
    );
  };

  render() {
    const artist = this.state.artist;

    if (this.state.deleted) {
      return <Redirect to={indexPath()} />;
    } else {
      if (artist) {
        return (
          <div>
            <Helmet>
              <title>{artist.name}</title>
            </Helmet>
            {this.actionMenu()}
            {this.breadcrumbs()}
            <Notification
              show={this.showNotification()}
              color={this.state.has_releases_error ? "warning" : "success"}
              onDismiss={this.handleDismiss}
            >
              {this.notificationMessage()}
            </Notification>
            <h2 className="title is-2">{he.decode(artist.name)}</h2>
            <ArtistShowColumns
              artist={artist}
              onImageDelete={this.handleImageDelete}
            />
          </div>
        );
      } else {
        return <div />;
      }
    }
  }
}

export default authUser(Show);
