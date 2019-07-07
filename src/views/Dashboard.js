import React from "reactn";
import Helmet from "react-helmet";
import authUser from "../components/auth/authUser";

const Dashboard = () => {
  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <p>
        Nullam quis risus eget urna mollis ornare vel eu leo. Donec sed odio dui.
        Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Lorem
        ipsum dolor sit amet, consectetur adipiscing elit. Maecenas faucibus
        mollis interdum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Donec id elit non mi porta gravida at eget metus.
      </p>
    </div>
  );
};

export default authUser(Dashboard);
