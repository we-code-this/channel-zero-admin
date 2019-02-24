import React from "react";
import Pagination from "../common/Pagination";
import ArtistRow from "./ArtistRow";

const ArtistTable = props => {
  return (
    <React.Fragment>
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
            <ArtistRow artist={artist} key={artist.id} />
          ))}
        </tbody>
      </table>
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
