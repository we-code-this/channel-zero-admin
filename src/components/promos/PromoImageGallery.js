import React from "react";
import { Columns } from "react-bulma-components";
import { imageUrl } from "../../models/promos";

const PromoImageGallery = props => (
  <Columns gapless className="image-gallery">
    <Columns.Column size={12} className="image-container">
      <img
        src={imageUrl(props.promo.filename)}
        alt={`${props.promo.name}`}
      />
    </Columns.Column>
  </Columns>
);

export default PromoImageGallery;
