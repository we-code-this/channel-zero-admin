import React, { Component } from "react";
import TableActionButtons from "../common/TableActionButtons";
import { human } from "../../utilities/date";
import { editPath, deleteVendor } from "../../models/vendors";

class VendorRow extends Component {
  handleDelete = async e => {
    e.preventDefault();
    await deleteVendor(this.props.vendor.id);
    this.props.onUpdate();
    this.forceUpdate();
  };

  render() {
    const vendor = this.props.vendor;

    return (
      <tr>
        <td>{vendor.id}</td>
        <td>{vendor.name}</td>
        <td>{vendor.icon_class}</td>
        <td>{human(vendor.created_at)}</td>
        <td>
          {this.props.showActions && (
            <TableActionButtons
              editPath={editPath(vendor.id)}
              onSubmit={this.handleDelete}
            />  
          )}
        </td>
      </tr>
    );
  }
}

export default VendorRow;
