import React from "react";
import ShowColumns from "../common/ShowColumns";
import Metadata from "../common/Metadata";
import PromoImageGallery from "./PromoImageGallery";

const PromoShowColumns = props => (
  <ShowColumns description="">
    <PromoImageGallery promo={props.promo} />
    <Metadata
      data={[
        { key: "Published", value: props.promo.published ? "Yes" : "No" },
        { key: "Location", value: props.promo.location },
        { key: "URL", value: props.promo.url }
      ]}
    />
  </ShowColumns>
);

export default PromoShowColumns;
