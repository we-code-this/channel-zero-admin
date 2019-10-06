import React from "react";
import Pagination from "../common/Pagination";
import PromoRow from "./PromoRow";

const PromoTable = props => {
  return (
    <React.Fragment>
      <div className="table-container">
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Published</th>
              <th>Created</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {props.promos.map(promo => (
              <PromoRow
                promo={promo}
                key={`promo-${promo.id}`}
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

export default PromoTable;
