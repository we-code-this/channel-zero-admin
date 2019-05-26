import React from "react";
import he from "he";
import Markdown from "markdown-to-jsx";
import { Columns } from "react-bulma-components";
import ArtistImage from "../../components/artists/ArtistImage";

const ArtistShowColumns = props => (
  <Columns>
    {props.artist.images.length > 0 && (
      <Columns.Column tablet={{ size: "half" }} desktop={{ size: "one-third" }}>
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
      </Columns.Column>
    )}
    <Columns.Column>
      <Markdown>{he.decode(props.artist.description)}</Markdown>
    </Columns.Column>
  </Columns>
);

export default ArtistShowColumns;
