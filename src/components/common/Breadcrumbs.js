import React from "react";
import Breadcrumb from "./Breadcrumb";

const Breadcrumbs = ({ children, active }) => (
  <nav className="breadcrumb" aria-label="breadcrumbs">
    <ul>
      <Breadcrumb to="/" active={active}>
        Dashboard
      </Breadcrumb>
      {children}
    </ul>
  </nav>
);

export default Breadcrumbs;
