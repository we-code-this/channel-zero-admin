import React from "react";
import Helmet from "react-helmet";

const NoAccess = () => (
    <React.Fragment>
        <Helmet>
          <title>No Access</title>
        </Helmet>
        <p>Sorry, you don’t have access.</p>
    </React.Fragment>
);
  
  export default NoAccess;