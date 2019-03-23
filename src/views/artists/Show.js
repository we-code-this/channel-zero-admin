import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Helmet from "react-helmet";
import Markdown from "markdown-to-jsx";
import { Columns } from "react-bulma-components";
import ArtistBreadcrumbs from "../../components/artists/ArtistBreadcrumbs";
import Breadcrumb from "../../components/common/Breadcrumb";
import IconButton from "../../components/common/IconButton";
import IconDeleteButton from "../../components/common/IconDeleteButton";
import ArtistImage from "../../components/artists/ArtistImage";
import ActionMenu from "../../components/common/ActionMenu";
import Notification from "../../components/common/Notification";
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
      image_updated: false
    });
  };

  handleDelete = async e => {
    e.preventDefault();
    await deleteArtist(this.state.artist.id);
    this.setState({ ...this.state, deleted: true });
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
    return (
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
    );
  };

  breadcrumbs = () => {
    return (
      <ArtistBreadcrumbs>
        <Breadcrumb to={showPath(this.state.artist.slug)} active>
          {this.state.artist.name}
        </Breadcrumb>
      </ArtistBreadcrumbs>
    );
  };

  notificationMessage = () => {
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
              color="success"
              onDismiss={this.handleDismiss}
            >
              {this.notificationMessage()}
            </Notification>
            <h2 className="title is-2">{artist.name}</h2>
            <Columns>
              {artist.images.length > 0 && (
                <Columns.Column
                  tablet={{ size: "half" }}
                  desktop={{ size: "one-third" }}
                >
                  <Columns gapless className="image-gallery">
                    <Columns.Column size={12} className="image-container">
                      <ArtistImage
                        image={artist.images[0]}
                        alt={artist.name}
                        artistSlug={artist.slug}
                        onDelete={this.handleImageDelete}
                      />
                    </Columns.Column>
                    {artist.images.slice(1).map(image => (
                      <Columns.Column
                        key={`artist-image-${image.id}`}
                        size={3}
                        className="image-container"
                      >
                        <ArtistImage
                          image={image}
                          alt={artist.name}
                          artistSlug={artist.slug}
                          onDelete={this.handleImageDelete}
                        />
                      </Columns.Column>
                    ))}
                  </Columns>
                </Columns.Column>
              )}
              <Columns.Column>
                <Markdown>{artist.description}</Markdown>
              </Columns.Column>
            </Columns>
          </div>
        );
      } else {
        return <div />;
      }
    }
  }
}

export default Show;
