import React from "react";
import Helmet from "react-helmet";

const NoAccess = () => (
    <div className="no-access">
        <Helmet>
          <title>No Access</title>
        </Helmet>
        <p>Sorry, you don’t have access.</p>
    </div>
);
  
  export default NoAccess;
