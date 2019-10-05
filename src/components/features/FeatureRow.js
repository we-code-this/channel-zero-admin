import React, { Component } from "reactn";
import { Link } from "react-router-dom";
import TableActionButtons from "../common/TableActionButtons";
import { human } from "../../utilities/date";
import { showPath, editPath, deleteFeature } from "../../models/features";
import { canEditOrDelete } from "../../utilities/user";

class FeatureRow extends Component {
  handleDelete = async e => {
    e.preventDefault();
    await deleteFeature(this.props.feature.id);
    this.props.onUpdate();
    this.forceUpdate();
  };

  render() {
    const feature = this.props.feature;

    return (
      <tr>
        <td>{feature.id}</td>
        <td>
          <Link to={showPath(feature.id)}>{`${feature.article.title}`}</Link>
        </td>
        <td>{feature.published ? "Yes" : "No"}</td>
        <td>{human(feature.created_at)}</td>
        <td>
          {canEditOrDelete(this.global.token, this.global.groups, feature.user_id) && (
            <TableActionButtons
              editPath={editPath(feature.id)}
              onSubmit={this.handleDelete}
            />
          )}
        </td>
      </tr>
    );
  }
}

export default FeatureRow;
