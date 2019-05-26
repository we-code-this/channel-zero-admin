import React from "react";
import he from "he";

const Metadata = props => (
  <ul className="metadata">
    {props.data.map(item => (
      <li key={`meta-${item.key}`}>
        <strong>{item.key}:</strong> {he.decode(item.value)}
      </li>
    ))}
  </ul>
);

export default Metadata;
