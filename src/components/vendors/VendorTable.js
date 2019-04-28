import React from "react";
import Pagination from "../common/Pagination";
import VendorRow from "./VendorRow";

const VendorTable = props => {
  return (
    <React.Fragment>
      <div className="table-container">
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Icon Class</th>
              <th>Created</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {props.vendors.map(vendor => (
              <VendorRow
                vendor={vendor}
                key={`vendor-${vendor.id}`}
                onUpdate={props.onUpdate}
              />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={props.page}
        pageCount={props.pageCount}
        perPage={props.perPage}
        path={props.path}
      />
    </React.Fragment>
  );
};

export default VendorTable;
