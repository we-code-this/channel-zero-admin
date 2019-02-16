import React from "react";
import { Link } from "react-router-dom";
import Pagination from "../common/Pagination";

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
          {props.artists.map(artist => {
            return (
              <tr key={artist.id}>
                <td>{artist.id}</td>
                <td>
                  <Link to={`/artist/${artist.slug}`}>{artist.name}</Link>
                </td>
                <td>{artist.created_at}</td>
                <td>Actions</td>
              </tr>
            );
          })}
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
