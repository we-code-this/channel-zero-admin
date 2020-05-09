import React from "react";
import Pagination from "../common/Pagination";
import BannerRow from "./BannerRow";

const BannerTable = props => {
  return (
    <React.Fragment>
      <div className="table-container">
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>ID</th>
              <th>URL</th>
              <th>Alt</th>
              <th>Created</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {props.banners.map(banner => (
              <BannerRow
                banner={banner}
                key={`banner-${banner.id}`}
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

export default BannerTable;
