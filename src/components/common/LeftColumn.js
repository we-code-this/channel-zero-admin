import React from "react";
import { Columns } from "react-bulma-components";

const LeftColumn = props => (
  <Columns.Column
    tablet={{ size: "half" }}
    desktop={{ size: "one-third" }}
    className="left-column"
  >
    {props.children}
  </Columns.Column>
);

export default LeftColumn;
