import React, { Component } from "react";
import he from "he";
import { Redirect } from "react-router-dom";
import Helmet from "react-helmet";
import { Columns } from "react-bulma-components";
import Markdown from "markdown-to-jsx";
import ActionMenu from "../../components/common/ActionMenu";
import Breadcrumb from "../../components/common/Breadcrumb";
import IconButton from "../../components/common/IconButton";
import IconDeleteButton from "../../components/common/IconDeleteButton";
import Notification from "../../components/common/Notification";
import ReleaseBreadcrumbs from "../../components/releases/ReleaseBreadcrumbs";
import {
  findBySlug,
  indexPath,
  editPath,
  showPath,
  publishPath,
  imageUrl
} from "../../models/releases";
import { showPath as showArtistPath } from "../../models/artists";

class Show extends Component {
  constructor(props) {
    super(props);

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

      if (this._isMounted) {
        this.setState({ ...this.state, release });
      }
    }
  }

  actionMenu = () => {
    const publishButton = this.state.release.published ? (
      <IconButton
        to={publishPath(this.state.release.slug, "false")}
        className="is-warning"
        icon="file-minus"
        label="Unpublish"
      />
    ) : (
      <IconButton
        to={publishPath(this.state.release.slug, "true")}
        className="is-info"
        icon="file-plus"
        label="Publish"
      />
    );

    return (
      <ActionMenu>
        <IconButton
          to={editPath(this.state.release.slug)}
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
        {publishButton}
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
            {this.actionMenu()}
            {this.breadcrumbs()}
            <Notification
              show={this.showNotification()}
              color="success"
              onDismiss={this.handleDismiss}
            >
              {this.notificationMessage()}
            </Notification>
            <h2 className="title is-2">{release.title}</h2>
            <Columns>
              <Columns.Column
                tablet={{ size: "half" }}
                desktop={{ size: "one-third" }}
              >
                <Columns gapless className="image-gallery">
                  <Columns.Column size={12} className="image-container">
                    <img
                      src={imageUrl(release.filename)}
                      alt={`Cover of ${release.title}`}
                    />
                  </Columns.Column>
                </Columns>
                <ul className="metadata">
                  <li>
                    <strong>Label:</strong> {he.decode(release.label.name)}
                  </li>
                  <li>
                    <strong>Published:</strong>{" "}
                    {release.published ? "Yes" : "No"}
                  </li>
                </ul>
              </Columns.Column>
              <Columns.Column className="description">
                <Markdown>{he.decode(release.description)}</Markdown>
              </Columns.Column>
            </Columns>
          </div>
        );
      } else {
        return <div>Loading…</div>;
      }
    }
  }
}

export default Show;
