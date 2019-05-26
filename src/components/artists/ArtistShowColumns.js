import React from "react";
import ShowColumns from "../common/ShowColumns";
import ArtistImageGallery from "./ArtistImageGallery";

const ArtistShowColumns = props => (
  <ShowColumns
    showLeft={props.artist.images.length > 0}
    description={props.artist.description}
  >
    <ArtistImageGallery
      artist={props.artist}
      onImageDelete={props.onImageDelete}
    />
  </ShowColumns>
);

export default ArtistShowColumns;
