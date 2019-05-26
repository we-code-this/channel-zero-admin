import React from "react";
import he from "he";
import Markdown from "markdown-to-jsx";
import { Columns } from "react-bulma-components";

const DescriptionColumn = props => (
  <Columns.Column className="description">
    <Markdown>{he.decode(props.description)}</Markdown>
  </Columns.Column>
);

export default DescriptionColumn;
