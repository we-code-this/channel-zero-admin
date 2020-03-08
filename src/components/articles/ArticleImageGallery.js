import React from "react";
import { Columns } from "react-bulma-components";
import { imageUrl } from "../../models/articles";

const ArticleImageGallery = props => (
  <Columns gapless className="image-gallery">
    <Columns.Column size={12} className="image-container">
      <img
        src={imageUrl(props.article.url.large)}
        alt={`Cover of ${props.article.title}`}
      />
    </Columns.Column>
  </Columns>
);

export default ArticleImageGallery;
