import React, { Component } from "react";
import { Link } from "react-router-dom";
import TableActionButtons from "../common/TableActionButtons";
import { human } from "../../utilities/date";
import { editPath, deleteBanner, showPath } from "../../models/banners";

class BannerRow extends Component {
  handleDelete = async e => {
    e.preventDefault();
    await deleteBanner(this.props.banner.id);
    this.props.onUpdate();
    this.forceUpdate();
  };

  render() {
    const banner = this.props.banner;

    return (
      <tr>
        <td>{banner.id}</td>
        <td>{banner.url}</td>
        <td><Link to={showPath(banner.id)}>{banner.alt}</Link></td>
        <td>{human(banner.created_at)}</td>
        <td>
          {this.props.showActions && (
            <TableActionButtons
              editPath={editPath(banner.id)}
              onSubmit={this.handleDelete}
            />  
          )}
        </td>
      </tr>
    );
  }
}

export default BannerRow;
