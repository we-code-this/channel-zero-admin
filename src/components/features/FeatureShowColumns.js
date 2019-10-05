import React from "react";
import he from "he";
import { Columns } from "react-bulma-components";
import Markdown from "markdown-to-jsx";
import Metadata from "../common/Metadata";

const FeatureShowColumns = props => (
  <Columns>
      <Columns.Column>
        <Metadata
          data={[
            { key: "Published", value: props.feature.published ? "Yes" : "No" }
          ]}
        />
        <div className="has-margin-bottom"><Markdown>{he.decode(props.feature.article.summary)}</Markdown></div>
        <div className="video-container">
          <iframe
            src={props.feature.video.src}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={props.feature.video.title}
          />
        </div>
      </Columns.Column>
  </Columns>
    
);

export default FeatureShowColumns;
