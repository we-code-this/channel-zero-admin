import React, { Component } from "reactn";
import Helmet from "react-helmet";
import VideoTable from "../../components/videos/VideoTable";
import ActionMenu from "../../components/common/ActionMenu";
import VideoBreadcrumbs from "../../components/videos/VideoBreadcrumbs";
import IconButton from "../../components/common/IconButton";
import authUser from "../../components/auth/authUser";
import { get, count, createPath } from "../../models/videos";
import { canCreate } from "../../utilities/user";

class Index extends Component {
  constructor(props) {
    super(props);

    this._isMounted = false;

    this.state = {
        videos: [],
        page: 1,
        pageCount: 0,
        perPage: 10,
        path: "/videos"
    };
  }

    async componentDidMount() {
      this._isMounted = true;
      await this.getVideos();
    }

    async componentDidUpdate() {
      if (
        this.props.match.params.page &&
        this.state.page !== parseInt(this.props.match.params.page)
      ) {
        await this.getVideos();
      }
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    async getVideos() {
      const currentPage = this.props.match.params.page
        ? parseInt(this.props.match.params.page)
        : 1;
      
      const videos = await get({
        start: (currentPage - 1) * this.state.perPage,
        limit: this.state.perPage
      });
      const pageCount = Math.ceil((await count()) / this.state.perPage);

      if (this._isMounted) {
        this.setState({ ...this.state, videos, pageCount, page: currentPage });
      }
    }

    handleUpdate = async e => {
      await this.getVideos();
    };

    render() {
      return (
        <div>
          <Helmet>
            <title>Videos</title>
          </Helmet>
          {canCreate(this.global.groups) && (
            <ActionMenu>
              <IconButton
                to={createPath()}
                className="is-primary"
                icon="plus"
                label="Video"
              />
            </ActionMenu>
          )}
          <VideoBreadcrumbs active={true} />
          <VideoTable {...this.state} onUpdate={this.handleUpdate} />
        </div>
      );
    }
}

export default authUser(Index);
