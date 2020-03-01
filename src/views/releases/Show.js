import React, { Component } from "reactn";
import { Redirect } from "react-router-dom";
import Helmet from "react-helmet";
import ActionMenu from "../../components/common/ActionMenu";
import Breadcrumb from "../../components/common/Breadcrumb";
import IconButton from "../../components/common/IconButton";
import DeleteModalButton from "../../components/common/DeleteModalButton";
import PublishButton from "../../components/common/PublishButton";
import Notification from "../../components/common/Notification";
import ReleaseBreadcrumbs from "../../components/releases/ReleaseBreadcrumbs";
import ReleaseShowColumns from "../../components/releases/ReleaseShowColumns";
import {
  findBySlug,
  indexPath,
  editPath,
  showPath,
  togglePublish,
  deleteRelease
} from "../../models/releases";
import { createPath as createDiscPath, deleteDisc } from "../../models/discs";
import { deleteTrack } from "../../models/tracks";
import { showPath as showArtistPath } from "../../models/artists";
import authUser from "../../components/auth/authUser";
import { canEditOrDelete } from "../../utilities/user";

class Show extends Component {
  constructor(props) {
    super(props);

    this._isMounted = false;

    const updated = props.location.updated ? props.location.updated : false;
    const created = props.location.created ? props.location.created : false;
    const discCreated = props.location.discCreated ? props.location.discCreated : false;
    const discUpdated = props.location.discUpdated ? props.location.discUpdated : false;
    const trackCreated = props.location.trackCreated ? props.location.trackCreated : false;
    const trackUpdated = props.location.trackUpdated ? props.location.trackUpdated : false;

    this.state = {
      deleted: false,
      updated,
      created,
      discCreated,
      discUpdated,
      discDeleted: false,
      trackCreated,
      trackUpdated,
      trackDeleted: false,
      release: this.props.release ? this.props.release : undefined
    };
  }

  async componentDidMount() {
    let release;
    this._isMounted = true;
    
    if (!this.props.release) {
      release = await findBySlug(this.props.match.params.slug);

      if (this._isMounted) {
        this.setState({ ...this.state, release });
      }
    }
  }

  actionMenu = () => {
    return (
      <ActionMenu>
        <IconButton
          to={editPath(this.state.release.slug)}
          className="is-primary"
          icon="edit"
          label="Edit"
        />
        <DeleteModalButton
          onSubmit={this.handleDelete}
        />
        <PublishButton
          published={this.state.release.published}
          onSubmit={this.handlePublish}
        />
        <IconButton
          to={createDiscPath(this.state.release.slug)}
          className="is-success"
          icon="plus"
          label="Disc"
        />
      </ActionMenu>
    );
  };

  breadcrumbs = () => {
    return (
      <ReleaseBreadcrumbs>
        <Breadcrumb to={showArtistPath(this.state.release.artist.slug)}>
          {this.state.release.artist.name}
        </Breadcrumb>
        <Breadcrumb to={showPath(this.state.release.slug)} active>
          {this.state.release.title}
        </Breadcrumb>
      </ReleaseBreadcrumbs>
    );
  };

  showNotification = () => {
    return this.state.updated || 
      this.state.created || 
      this.state.discCreated ||
      this.state.discUpdated ||
      this.state.discDeleted ||
      this.state.trackCreated ||
      this.state.trackUpdated ||
      this.state.trackDeleted;
  };

  notificationMessage = () => {
    if (this.state.created) {
      return (
        <span>
          <strong>{this.state.release.title}</strong> successfully created!
        </span>
      );
    }

    if (this.state.updated) {
      return (
        <span>
          <strong>{this.state.release.title}</strong> successfully updated!
        </span>
      );
    }

    if (this.state.discCreated) {
      return (
        <span>
          Disc successfully created!
        </span>
      );
    }

    if (this.state.discUpdated) {
      return (
        <span>
          Disc successfully updated!
        </span>
      );
    }

    if (this.state.discDeleted) {
      return (
        <span>
          Disc successfully deleted.
        </span>
      );
    }

    if (this.state.trackCreated) {
      return (
        <span>
          Track successfully created!
        </span>
      );
    }

    if (this.state.trackUpdated) {
      return (
        <span>
          Track successfully updated!
        </span>
      );
    }

    if (this.state.trackDeleted) {
      return (
        <span>
          Track successfully deleted.
        </span>
      );
    }

    return "";
  };

  handleDelete = async e => {
    e.preventDefault();
    if (canEditOrDelete(this.global.token, this.global.groups, this.state.release.user_id)) {
      await deleteRelease(this.state.release.id);
      this.setState({ ...this.state, deleted: true });
      this.forceUpdate();
    }
  };

  handlePublish = async e => {
    e.preventDefault();
    if (canEditOrDelete(this.global.token, this.global.groups, this.state.release.user_id)) {
      const release = await togglePublish(
        this.state.release.id,
        this.state.release.published
      );
      this.setState({ ...this.state, release, updated: true });
      this.forceUpdate();
    }
  };

  handleDismiss = () => {
    this.setState({
      ...this.state,
      updated: false,
      created: false,
      discCreated: false,
      discUpdated: false,
      discDeleted: false,
      trackCreated: false,
      trackUpdated: false,
      trackDeleted: false,
    });
  };

  handleDiscDelete = async e => {
    e.preventDefault();
    await deleteDisc(e.target.id.value);

    const release = await findBySlug(this.props.match.params.slug);

    this.setState({ ...this.state, release, discDeleted: true })
    this.forceUpdate();
  };

  handleTrackDelete = async e => {
    e.preventDefault();

    await deleteTrack(e.target.id.value);

    const release = await findBySlug(this.props.match.params.slug);

    this.setState({ ...this.state, release, trackDeleted: true })
    this.forceUpdate();
  };

  render() {
    const release = this.state.release;

    if (this.state.deleted) {
      return <Redirect to={indexPath()} />;
    } else {
      if (release) {
        return (
          <div>
            <Helmet>
              <title>{`${release.artist.name} - ${release.title}`}</title>
            </Helmet>
            {canEditOrDelete(this.global.token, this.global.groups, release.user_id) && this.actionMenu()}
            {this.breadcrumbs()}
            <Notification
              show={this.showNotification()}
              color="success"
              onDismiss={this.handleDismiss}
            >
              {this.notificationMessage()}
            </Notification>
            <h2 className="title is-2">{release.title}</h2>
            <ReleaseShowColumns 
              release={release} 
              onDiscDelete={this.handleDiscDelete} 
              onTrackDelete={this.handleTrackDelete}
            />
          </div>
        );
      } else {
        return <div>Loading…</div>;
      }
    }
  }
}

export default authUser(Show);
