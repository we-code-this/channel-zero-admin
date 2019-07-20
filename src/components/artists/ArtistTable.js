import React from "react";
import Pagination from "../common/Pagination";
import ArtistRow from "./ArtistRow";

const ArtistTable = props => {
  return (
    <React.Fragment>
      <div className="table-container">
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Created</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {props.artists.map(artist => (
              <ArtistRow
                artist={artist}
                key={artist.id}
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

export default ArtistTable;
