import React from "react";
import Breadcrumbs from "../common/Breadcrumbs";
import Breadcrumb from "../common/Breadcrumb";
import { indexPath } from "../../models/vendors";

const VendorBreadcrumbs = ({ children, active }) => (
  <Breadcrumbs>
    <Breadcrumb to={indexPath()} active={active}>
      Releases
    </Breadcrumb>
    {children}
  </Breadcrumbs>
);

export default VendorBreadcrumbs;
