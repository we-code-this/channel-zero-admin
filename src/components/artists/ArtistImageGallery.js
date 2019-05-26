import React from "react";
import { Columns } from "react-bulma-components";
import ArtistImage from "./ArtistImage";

const ArtistImageGallery = props => (
  <Columns gapless className="image-gallery">
    <Columns.Column size={12} className="image-container">
      <ArtistImage
        image={props.artist.images[0]}
        alt={props.artist.name}
        artistSlug={props.artist.slug}
        onDelete={props.onImageDelete}
      />
    </Columns.Column>
    {props.artist.images.slice(1).map(image => (
      <Columns.Column
        key={`artist-image-${image.id}`}
        size={3}
        className="image-container"
      >
        <ArtistImage
          image={image}
          alt={props.artist.name}
          artistSlug={props.artist.slug}
          onDelete={props.onImageDelete}
        />
      </Columns.Column>
    ))}
  </Columns>
);

export default ArtistImageGallery;
