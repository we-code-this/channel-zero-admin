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
import { showPath as showArtistPath } from "../../models/artists";
import authUser from "../../components/auth/authUser";
import { canEditOrDelete } from "../../utilities/user";

class Show extends Component {
  constructor(props) {
    super(props);

    this._canEditOrDelete = false;
    this._isMounted = false;

    const updated = props.location.updated ? props.location.updated : false;
    const created = props.location.created ? props.location.created : false;

    this.state = {
      deleted: false,
      updated,
      created,
      release: this.props.release ? this.props.release : undefined
    };
  }

  async componentDidMount() {
    let release;
    this._isMounted = true;
    
    if (!this.props.release) {
      release = await findBySlug(this.props.match.params.slug);
      this._canEditOrDelete = canEditOrDelete(this.global.token, this.global.groups, release.user_id);

      if (this._isMounted) {
        this.setState({ ...this.state, release });
      }
    }
  }

  componentWillUnmount() {
    this._canEditOrDelete = false;
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
    return this.state.updated || this.state.created;
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

    return "";
  };

  handleDelete = async e => {
    e.preventDefault();
    if (this._canEditOrDelete) {
      await deleteRelease(this.state.release.id);
      this.setState({ ...this.state, deleted: true });
      this.forceUpdate();
    }
  };

  handlePublish = async e => {
    e.preventDefault();
    if (this._canEditOrDelete) {
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
      created: false
    });
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
            {this._canEditOrDelete && this.actionMenu()}
            {this.breadcrumbs()}
            <Notification
              show={this.showNotification()}
              color="success"
              onDismiss={this.handleDismiss}
            >
              {this.notificationMessage()}
            </Notification>
            <h2 className="title is-2">{release.title}</h2>
            <ReleaseShowColumns release={release} />
          </div>
        );
      } else {
        return <div>Loading…</div>;
      }
    }
  }
}

export default authUser(Show);
