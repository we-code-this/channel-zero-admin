import React from "react";
import Breadcrumbs from "../common/Breadcrumbs";
import Breadcrumb from "../common/Breadcrumb";
import { indexPath } from "../../models/artists";

const ArtistBreadcrumbs = ({ children, active }) => (
  <Breadcrumbs>
    <Breadcrumb to={indexPath()} active={active}>
      Artists
    </Breadcrumb>
    {children}
  </Breadcrumbs>
);

export default ArtistBreadcrumbs;
