import React from "react";
import { Columns } from "react-bulma-components";
import moment from "moment";
import ShowColumns from "../common/ShowColumns";
import Metadata from "../common/Metadata";
import ReleaseImageGallery from "./ReleaseImageGallery";

const ReleaseShowColumns = props => {
  const releaseDate = moment(props.release.release_date).format('MMMM Do, YYYY');

  return (
    <Columns className="show-columns">
      <ShowColumns description={props.release.description}>
        <ReleaseImageGallery release={props.release} />
        <Metadata
          data={[
            { key: "Label", value: props.release.label.name },
            { key: "Published", value: props.release.published ? "Yes" : "No" },
            { key: "Catalog Number", value: props.release.catalog_number },
            { key: "Release Date", value: releaseDate },
          ]}
        />
      </ShowColumns>
    </Columns>
  );
};

export default ReleaseShowColumns;
