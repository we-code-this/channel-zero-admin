import React, { Component } from "reactn";
import { Redirect } from "react-router-dom";
import Helmet from "react-helmet";
import ActionMenu from "../../components/common/ActionMenu";
import Breadcrumb from "../../components/common/Breadcrumb";
import IconButton from "../../components/common/IconButton";
import DeleteModalButton from "../../components/common/DeleteModalButton";
import PublishButton from "../../components/common/PublishButton";
import Notification from "../../components/common/Notification";
import PromoBreadcrumbs from "../../components/promos/PromoBreadcrumbs";
import PromoShowColumns from "../../components/promos/PromoShowColumns";
import {
  findById,
  indexPath,
  editPath,
  showPath,
  togglePublish,
  deletePromo
} from "../../models/promos";
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
      promo: this.props.promo ? this.props.promo : undefined
    };
  }

  async componentDidMount() {
    let promo;
    this._isMounted = true;
    
    if (!this.props.promo) {
      promo = await findById(this.props.match.params.id);
      this._canEditOrDelete = canEditOrDelete(this.global.token, this.global.groups, promo.user_id);

      if (this._isMounted) {
        this.setState({ ...this.state, promo });
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
          to={editPath(this.state.promo.id)}
          className="is-primary"
          icon="edit"
          label="Edit"
        />
        <DeleteModalButton
          onSubmit={this.handleDelete}
        />
        <PublishButton
          published={this.state.promo.published}
          onSubmit={this.handlePublish}
        />
      </ActionMenu>
    );
  };

  breadcrumbs = () => {
    return (
      <PromoBreadcrumbs>
        <Breadcrumb to={showPath(this.state.promo.id)} active>
          {this.state.promo.name}
        </Breadcrumb>
      </PromoBreadcrumbs>
    );
  };

  showNotification = () => {
    return this.state.updated || this.state.created;
  };

  notificationMessage = () => {
    if (this.state.created) {
      return (
        <span>
          <strong>{this.state.promo.name}</strong> successfully created!
        </span>
      );
    }

    if (this.state.updated) {
      return (
        <span>
          <strong>{this.state.promo.name}</strong> successfully updated!
        </span>
      );
    }

    return "";
  };

  handleDelete = async e => {
    e.preventDefault();
    if (this._canEditOrDelete) {
      await deletePromo(this.state.promo.id);
      this.setState({ ...this.state, deleted: true });
      this.forceUpdate();
    }
  };

  handlePublish = async e => {
    e.preventDefault();
    if (this._canEditOrDelete) {
      const promo = await togglePublish(
        this.state.promo.id,
        this.state.promo.published
      );
      this.setState({ ...this.state, promo, updated: true });
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
    const promo = this.state.promo;

    if (this.state.deleted) {
      return <Redirect to={indexPath()} />;
    } else {
      if (promo) {
        return (
          <div>
            <Helmet>
              <title>{`${promo.name}`}</title>
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
            <h2 className="title is-2">{promo.name}</h2>
            <PromoShowColumns promo={promo} />
          </div>
        );
      } else {
        return <div>Loading…</div>;
      }
    }
  }
}

export default authUser(Show);
