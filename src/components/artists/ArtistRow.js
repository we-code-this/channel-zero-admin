import React from "react";
import { Link } from "react-router-dom";
import TableActionButtons from "../common/TableActionButtons";
import { showPath, editPath, deletePath } from "../../models/artists";

const ArtistRow = ({ artist }) => (
  <tr>
    <td>{artist.id}</td>
    <td>
      <Link to={showPath(artist.slug)}>{artist.name}</Link>
    </td>
    <td>{artist.created_at}</td>
    <td>
      <TableActionButtons
        editPath={editPath(artist.slug)}
        deletePath={deletePath()}
      />
    </td>
  </tr>
);

export default ArtistRow;
