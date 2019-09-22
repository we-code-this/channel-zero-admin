import React, { Component } from "reactn";
import { Link } from "react-router-dom";
import TableActionButtons from "../common/TableActionButtons";
import { human } from "../../utilities/date";
import { editPath, deleteVideo } from "../../models/videos";
import { canEditOrDelete } from "../../utilities/user";
import { showPath } from "../../models/videos";

class VideoRow extends Component {
  handleDelete = async e => {
    e.preventDefault();
    await deleteVideo(this.props.video.id);
    this.props.onUpdate();
    this.forceUpdate();
  };

  render() {
    const video = this.props.video;

    return (
      <tr>
        <td>{video.id}</td>
        <td><Link to={showPath(video.id)}>{video.title}</Link></td>
        <td>{human(video.created_at)}</td>
        <td>
          {canEditOrDelete(this.global.token, this.global.groups, video.user_id) && (
            <TableActionButtons
              editPath={editPath(video.id)}
              onSubmit={this.handleDelete}
            />  
          )}
        </td>
      </tr>
    );
  }
}

export default VideoRow;
