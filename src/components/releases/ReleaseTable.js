import React from "react";
import Pagination from "../common/Pagination";
import ReleaseRow from "./ReleaseRow";

const ReleaseTable = props => {
  return (
    <React.Fragment>
      <div className="table-container">
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Published</th>
              <th>Created</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {props.releases.map(release => (
              <ReleaseRow
                release={release}
                key={`release-${release.id}`}
                showActions={props.showActions}
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

export default ReleaseTable;
