import React from "react";
import Pagination from "../common/Pagination";
import UserRow from "./UserRow";

const UserTable = props => {
  return (
    <React.Fragment>
      <div className="table-container">
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Username</th>
              <th>Created</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {props.users.map(user => (
              <UserRow
                user={user}
                key={`user-${user.id}`}
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

export default UserTable;
