import React from "react";
import { Columns } from "react-bulma-components";
import ShowColumns from "../common/ShowColumns";
import Metadata from "../common/Metadata";
import ArticleImageGallery from "./ArticleImageGallery";

const ArticleShowColumns = props => (
  <Columns className="show-columns">
    <ShowColumns description={props.article.description}>
        {props.article.filename && <ArticleImageGallery article={props.article} />}
        <Metadata
            data={[
            { key: "Published", value: props.article.published ? "Yes" : "No" }
            ]}
        />
    </ShowColumns>
  </Columns>
);

export default ArticleShowColumns;