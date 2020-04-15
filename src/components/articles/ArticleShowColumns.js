import React from "react";
import moment from "moment";
import ShowColumns from "../common/ShowColumns";
import Metadata from "../common/Metadata";
import ArticleImageGallery from "./ArticleImageGallery";

const ArticleShowColumns = props => {
  const publishDate = moment(props.article.publish_date).format('MMMM Do, YYYY');

  return (
    <ShowColumns description={props.article.description}>
        {props.article.filename && <ArticleImageGallery article={props.article} />}
        <Metadata
            data={[
              { key: "Published", value: props.article.published ? "Yes" : "No" },
              { key: "Publish Date", value: publishDate }
            ]}
        />
    </ShowColumns>
  );
};

export default ArticleShowColumns;
