import React from "react";
import { Columns } from "react-bulma-components";
import ShowColumns from "../common/ShowColumns";
import Metadata from "../common/Metadata";
import ReleaseImageGallery from "./ReleaseImageGallery";

const ReleaseShowColumns = props => (
  <Columns className="show-columns">
    <ShowColumns description={props.release.description}>
      <ReleaseImageGallery release={props.release} />
      <Metadata
        data={[
          { key: "Label", value: props.release.label.name },
          { key: "Published", value: props.release.published ? "Yes" : "No" },
          { key: "Catalog Number", value: props.release.catalog_number }
        ]}
      />
    </ShowColumns>
  </Columns>
);

export default ReleaseShowColumns;
