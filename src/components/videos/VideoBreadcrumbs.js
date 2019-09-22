import React from "react";
import Breadcrumbs from "../common/Breadcrumbs";
import Breadcrumb from "../common/Breadcrumb";
import { indexPath } from "../../models/videos";

const VideoBreadcrumbs = ({ children, active }) => (
  <Breadcrumbs>
    <Breadcrumb to={indexPath()} active={active}>
      Videos
    </Breadcrumb>
    {children}
  </Breadcrumbs>
);

export default VideoBreadcrumbs;
