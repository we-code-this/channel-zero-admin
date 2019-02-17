import React from "react";

const Breadcrumbs = ({ children }) => (
  <nav className="breadcrumb" aria-label="breadcrumbs">
    <ul>{children}</ul>
  </nav>
);

export default Breadcrumbs;
