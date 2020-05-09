import React, { Component } from "reactn";
import { Redirect } from "react-router-dom";
import Helmet from "react-helmet";
import he from "he";
import ActionMenu from "../../components/common/ActionMenu";
import Breadcrumb from "../../components/common/Breadcrumb";
import IconButton from "../../components/common/IconButton";
import DeleteModalButton from "../../components/common/DeleteModalButton";
import PublishButton from "../../components/common/PublishButton";
import Notification from "../../components/common/Notification";
import BannerBreadcrumbs from "../../components/banners/BannerBreadcrumbs";
import BannerShowColumns from "../../components/banners/BannerShowColumns";
import {
  findById,
  indexPath,
  editPath,
  showPath,
  togglePublish,
  deleteBanner,
} from "../../models/banners";
import authUser from "../../components/auth/authUser";
import isEditor from "../../components/auth/isEditor";
import { scrollToTop } from "../../utilities/scroll";

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
      banner: this.props.banner ? this.props.banner : undefined
    };
  }

  async componentDidMount() {
    let banner;
    this._isMounted = true;
    
    if (!this.props.banner) {
      banner = await findById(this.props.match.params.id);

      if (this._isMounted) {
        this.setState({ ...this.state, banner });
      }
    }
  }

  actionMenu = () => {
    return (
      <ActionMenu>
        <IconButton
          to={editPath(this.state.banner.id)}
          className="is-primary"
          icon="edit"
          label="Edit"
        />
        <DeleteModalButton
          onSubmit={this.handleDelete}
        />
        <PublishButton
          published={this.state.banner.published}
          onSubmit={this.handlePublish}
        />
      </ActionMenu>
    );
  };

  breadcrumbs = () => {
    return (
      <BannerBreadcrumbs>
        <Breadcrumb to={showPath(this.state.banner.id)} active>
          {he.decode(this.state.banner.alt)}
        </Breadcrumb>
      </BannerBreadcrumbs>
    );
  };

  showNotification = () => {
    return this.state.updated || this.state.created;
  };

  notificationMessage = () => {
    if (this.state.created) {
      return <span>Banner successfully created!</span>;
    }

    if (this.state.updated) {
      return <span>Banner successfully updated!</span>;
    }

    return "";
  };

  handleDelete = async e => {
    e.preventDefault();

    await deleteBanner(this.state.banner.id);
    
    this.setState({ ...this.state, deleted: true });
    this.forceUpdate();
  };

  handlePublish = async e => {
    e.preventDefault();
    
    const banner = await togglePublish(
      this.state.banner.id,
      this.state.banner.published
    );

    this.setState({ ...this.state, banner, updated: true });
    this.forceUpdate();
  };

  handleDismiss = () => {
    this.setState({
      ...this.state,
      updated: false,
      created: false
    });
  };

  render() {
    const banner = this.state.banner;
    
    if (this.state.deleted) {
      return <Redirect to={indexPath()} />;
    } else {
      if (banner) {
        const title = `Banner “${he.decode(banner.alt)}”`;

        return (
          <div>
            <Helmet>
              <title>{title}</title>
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
            <h2 className="title is-2">{title}</h2>
            <BannerShowColumns 
              banner={banner} 
            />
          </div>
        );
      } else {
        return <div>Loading…</div>;
      }
    }
  }
}

export default authUser(isEditor(Show));
