import React from "react";
import Breadcrumbs from "../common/Breadcrumbs";
import Breadcrumb from "../common/Breadcrumb";
import { indexPath } from "../../models/banners";

const BannerBreadcrumbs = ({ children, active }) => (
  <Breadcrumbs>
    <Breadcrumb to={indexPath()} active={active}>
      Banners
    </Breadcrumb>
    {children}
  </Breadcrumbs>
);

export default BannerBreadcrumbs;
