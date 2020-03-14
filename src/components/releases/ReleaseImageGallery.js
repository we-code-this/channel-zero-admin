import React from "react";
import { Columns } from "react-bulma-components";
import { imageUrl } from "../../models/releases";

const ReleaseImageGallery = props => {
  return (
    <Columns gapless className="image-gallery">
      <Columns.Column size={12} className="image-container">
        <img
          src={imageUrl(props.release.url.large)}
          alt={`Cover of ${props.release.title}`}
        />
      </Columns.Column>
    </Columns>
  );
};

export default ReleaseImageGallery;
