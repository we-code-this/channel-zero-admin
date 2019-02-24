import React, { Component } from "react";
import Helmet from "react-helmet";
import Markdown from "markdown-to-jsx";
import ArtistBreadcrumbs from "../../components/artists/ArtistBreadcrumbs";
import Breadcrumb from "../../components/common/Breadcrumb";
import IconButton from "../../components/common/IconButton";
import ActionMenu from "../../components/common/ActionMenu";
import Notification from "../../components/common/Notification";
import {
  findBySlug,
  editPath,
  showPath,
  deletePath
} from "../../models/artists";

class Show extends Component {
  constructor(props) {
    super(props);

    this._isMounted = false;

    const updated = props.location.updated ? props.location.updated : false;

    this.state = {
      updated,
      artist: undefined
    };

    this.handleDismiss = this.handleDismiss.bind(this);
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

  handleDismiss() {
    this.setState({ ...this.state, updated: false });
  }

  actionMenu() {
    return (
      <ActionMenu>
        <IconButton
          to={editPath(this.state.artist.slug)}
          className="is-primary"
          icon="edit"
          label="Edit"
        />
        <IconButton
          to={deletePath()}
          className="is-danger"
          icon="minus-circle"
          label="Delete"
        />
      </ActionMenu>
    );
  }

  breadcrumbs() {
    return (
      <ArtistBreadcrumbs>
        <Breadcrumb to={showPath(this.state.artist.slug)} active>
          {this.state.artist.name}
        </Breadcrumb>
      </ArtistBreadcrumbs>
    );
  }

  render() {
    const artist = this.state.artist;

    if (artist) {
      return (
        <div>
          <Helmet>
            <title>{artist.name}</title>
          </Helmet>
          {this.actionMenu()}
          {this.breadcrumbs()}
          <Notification
            show={this.state.updated}
            color="success"
            onDismiss={this.handleDismiss}
          >
            <strong>{artist.name}</strong> successfully updated!
          </Notification>
          <h2 className="title is-2">{artist.name}</h2>
          <Markdown>{artist.description}</Markdown>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default Show;
