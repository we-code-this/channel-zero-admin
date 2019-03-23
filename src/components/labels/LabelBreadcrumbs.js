import React from "react";
import Breadcrumbs from "../common/Breadcrumbs";
import Breadcrumb from "../common/Breadcrumb";
import { indexPath } from "../../models/labels";

const LabelBreadcrumbs = ({ children, active }) => (
  <Breadcrumbs>
    <Breadcrumb to={indexPath()} active={active}>
      Labels
    </Breadcrumb>
    {children}
  </Breadcrumbs>
);

export default LabelBreadcrumbs;
