import React from "react";
import Breadcrumbs from "../common/Breadcrumbs";
import Breadcrumb from "../common/Breadcrumb";
import { indexPath } from "../../models/articles";

const ArticleBreadcrumbs = ({ children, active }) => (
  <Breadcrumbs>
    <Breadcrumb to={indexPath()} active={active}>
      Articles
    </Breadcrumb>
    {children}
  </Breadcrumbs>
);

export default ArticleBreadcrumbs;
