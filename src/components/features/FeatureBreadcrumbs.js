import React from "react";
import Breadcrumbs from "../common/Breadcrumbs";
import Breadcrumb from "../common/Breadcrumb";
import { indexPath } from "../../models/features";

const FeatureBreadcrumbs = ({ children, active }) => (
  <Breadcrumbs>
    <Breadcrumb to={indexPath()} active={active}>
      Features
    </Breadcrumb>
    {children}
  </Breadcrumbs>
);

export default FeatureBreadcrumbs;
