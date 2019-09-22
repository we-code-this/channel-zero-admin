import React from "react";
import Pagination from "../common/Pagination";
import VideoRow from "./VideoRow";

const VideoTable = props => {
  return (
    <React.Fragment>
      <div className="table-container">
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Created</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {props.videos.map(video => (
              <VideoRow
                video={video}
                key={video.id}
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

export default VideoTable;
