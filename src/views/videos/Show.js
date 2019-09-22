import React, { Component } from "reactn";
import he from "he";
import { Redirect } from "react-router-dom";
import Helmet from "react-helmet";
import { Columns } from "react-bulma-components";
import VideoBreadcrumbs from "../../components/videos/VideoBreadcrumbs";
import Breadcrumb from "../../components/common/Breadcrumb";
import IconButton from "../../components/common/IconButton";
import IconDeleteButton from "../../components/common/IconDeleteButton";
import ActionMenu from "../../components/common/ActionMenu";
import Notification from "../../components/common/Notification";
import authUser from "../../components/auth/authUser";
import {
  indexPath,
  editPath,
  showPath,
  deleteVideo,
  findById
} from "../../models/videos";
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
      video: undefined
    };
  }

  async componentDidMount() {
    this._isMounted = true;

    if (this._isMounted) {
      const video = await findById(this.props.match.params.id);
      this._canEditOrDelete = canEditOrDelete(this.global.token, this.global.groups, video.user_id);
      this.setState({ ...this.state, video });
    }
  }

  async componentWillUnmount() {
    this._isMounted = false;
    this._canEditOrDelete = false;
  }

  handleDismiss = () => {
    this.setState({
      ...this.state,
      updated: false,
      created: false,
    });
  };

  handleDelete = async e => {
    e.preventDefault();

    await deleteVideo(this.state.video.id);
    this.setState({ ...this.state, deleted: true });
    this.forceUpdate();
  };

  actionMenu = () => {
    return this._canEditOrDelete ? (
      <ActionMenu>
        <IconButton
          to={editPath(this.state.video.id)}
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
      </ActionMenu>
    ) : null;
  };

  breadcrumbs = () => {
    return (
      <VideoBreadcrumbs>
        <Breadcrumb to={showPath(this.state.video.id)} active>
          {he.decode(this.state.video.title)}
        </Breadcrumb>
      </VideoBreadcrumbs>
    );
  };

  notificationMessage = () => {
    if (this.state.created) {
      return (
        <span>
          <strong>{this.state.video.title}</strong> successfully created!
        </span>
      );
    }

    if (this.state.updated) {
      return (
        <span>
          <strong>{this.state.video.title}</strong> successfully updated!
        </span>
      );
    }

    return "";
  };

  showNotification = () => {
    return (
      this.state.updated ||
      this.state.created
    );
  };

  render() {
    const video = this.state.video;

    if (this.state.deleted) {
      return <Redirect to={indexPath()} />;
    } else {
      if (video) {
        return (
          <div>
            <Helmet>
              <title>{video.title}</title>
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
            <h2 className="title is-2">{he.decode(video.title)}</h2>
            <Columns className="show-columns">
              <Columns.Column>
                <div className="video-container">
                  <iframe
                    src={video.src}
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen
                    title={video.title}
                  ></iframe>
                </div>
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

export default authUser(Show);
