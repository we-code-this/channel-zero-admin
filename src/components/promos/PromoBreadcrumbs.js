import React from "react";
import Breadcrumbs from "../common/Breadcrumbs";
import Breadcrumb from "../common/Breadcrumb";
import { indexPath } from "../../models/promos";

const PromosBreadcrumbs = ({ children, active }) => (
  <Breadcrumbs>
    <Breadcrumb to={indexPath()} active={active}>
      Promos
    </Breadcrumb>
    {children}
  </Breadcrumbs>
);

export default PromosBreadcrumbs;
