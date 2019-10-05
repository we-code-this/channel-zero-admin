import React from "react";
import Pagination from "../common/Pagination";
import FeatureRow from "./FeatureRow";

const FeatureTable = props => {
  return (
    <React.Fragment>
      <div className="table-container">
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>ID</th>
              <th>Feature</th>
              <th>Published</th>
              <th>Created</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {props.features.map(feature => (
              <FeatureRow
                feature={feature}
                key={`feature-${feature.id}`}
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

export default FeatureTable;
