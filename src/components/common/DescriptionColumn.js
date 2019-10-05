import React from "react";
import he from "he";
import Markdown from "markdown-to-jsx";
import { Columns } from "react-bulma-components";

const DescriptionColumn = props => (
  <Columns.Column className="description">
    {props.children && props.children}
    <Markdown>{he.decode(props.description)}</Markdown>
  </Columns.Column>
);

export default DescriptionColumn;
