import React from "react";
import Helmet from "react-helmet";
import Breadcrumbs from "../components/common/Breadcrumbs";
import Breadcrumb from "../components/common/Breadcrumb";

const Dashboard = () => (
  <div>
    <Helmet>
      <title>Dashboard</title>
    </Helmet>
    <Breadcrumbs>
      <Breadcrumb to="/" active>
        Dashboard
      </Breadcrumb>
    </Breadcrumbs>
    <p>
      Nullam quis risus eget urna mollis ornare vel eu leo. Donec sed odio dui.
      Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Lorem
      ipsum dolor sit amet, consectetur adipiscing elit. Maecenas faucibus
      mollis interdum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec id elit non mi porta gravida at eget metus.
    </p>
  </div>
);

export default Dashboard;
