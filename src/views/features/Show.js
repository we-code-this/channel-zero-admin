import React, { Component } from "reactn";
import { Redirect } from "react-router-dom";
import Helmet from "react-helmet";
import ActionMenu from "../../components/common/ActionMenu";
import Breadcrumb from "../../components/common/Breadcrumb";
import IconButton from "../../components/common/IconButton";
import DeleteModalButton from "../../components/common/DeleteModalButton";
import PublishButton from "../../components/common/PublishButton";
import Notification from "../../components/common/Notification";
import FeatureBreadcrumbs from "../../components/features/FeatureBreadcrumbs";
import FeatureShowColumns from "../../components/features/FeatureShowColumns";
import {
  findById,
  indexPath,
  editPath,
  showPath,
  togglePublish,
  deleteFeature
} from "../../models/features";
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
      feature: this.props.feature ? this.props.feature : undefined
    };
  }

  async componentDidMount() {
    let feature;
    this._isMounted = true;

    if (!this.props.feature) {
      feature = await findById(this.props.match.params.id);
      this._canEditOrDelete = canEditOrDelete(this.global.token, this.global.groups, feature.user_id);

      if (this._isMounted) {
        this.setState({ ...this.state, feature });
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
          to={editPath(this.state.feature.id)}
          className="is-primary"
          icon="edit"
          label="Edit"
        />
        <DeleteModalButton
          onSubmit={this.handleDelete}
        />
        <PublishButton
          published={this.state.feature.published}
          onSubmit={this.handlePublish}
        />
      </ActionMenu>
    );
  };

  breadcrumbs = () => {
    return (
      <FeatureBreadcrumbs>
        <Breadcrumb to={showPath(this.state.feature.id)} active>
          {this.state.feature.article.title} Feature
        </Breadcrumb>
      </FeatureBreadcrumbs>
    );
  };

  showNotification = () => {
    return this.state.updated || this.state.created;
  };

  notificationMessage = () => {
    if (this.state.created) {
      return (
        <span>
          <strong>{this.state.feature.article.title}</strong> successfully created!
        </span>
      );
    }

    if (this.state.updated) {
      return (
        <span>
          <strong>{this.state.feature.article.title}</strong> successfully updated!
        </span>
      );
    }

    return "";
  };

  handleDelete = async e => {
    e.preventDefault();
    if (this._canEditOrDelete) {
      await deleteFeature(this.state.feature.id);
      this.setState({ ...this.state, deleted: true });
      this.forceUpdate();
    }
  };

  handlePublish = async e => {
    e.preventDefault();
    if (this._canEditOrDelete) {
      const feature = await togglePublish(
        this.state.feature.id,
        this.state.feature.published
      );
      this.setState({ ...this.state, feature, updated: true });
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
    const feature = this.state.feature;

    if (this.state.deleted) {
      return <Redirect to={indexPath()} />;
    } else {
      if (feature) {
        return (
          <div>
            <Helmet>
              <title>{`${feature.article.title} Feature`}</title>
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
            <h2 className="title is-2">{feature.article.title} Feature</h2>
            <FeatureShowColumns feature={feature} />
          </div>
        );
      } else {
        return <div>Loading…</div>;
      }
    }
  }
}

export default authUser(Show);
