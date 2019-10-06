import React, { Component } from "reactn";
import { Link } from "react-router-dom";
import TableActionButtons from "../common/TableActionButtons";
import { human } from "../../utilities/date";
import { showPath, editPath, deletePromo } from "../../models/promos";
import { canEditOrDelete } from "../../utilities/user";

class PromoRow extends Component {
  handleDelete = async e => {
    e.preventDefault();
    await deletePromo(this.props.promo.id);
    this.props.onUpdate();
    this.forceUpdate();
  };

  render() {
    const promo = this.props.promo;

    return (
      <tr>
        <td>{promo.id}</td>
        <td>
          <Link to={showPath(promo.id)}>{promo.name}</Link>
        </td>
        <td>{promo.published ? "Yes" : "No"}</td>
        <td>{human(promo.created_at)}</td>
        <td>
          {canEditOrDelete(this.global.token, this.global.groups, promo.user_id) && (
            <TableActionButtons
              editPath={editPath(promo.id)}
              onSubmit={this.handleDelete}
            />
          )}
        </td>
      </tr>
    );
  }
}

export default PromoRow;
