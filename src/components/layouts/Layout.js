import React from "react";
import Helmet from "react-helmet";
import Icons from "../common/Icons";
import Header from "../common/Header";
import Nav from "../common/Nav";

const Layout = ({ children, page = "Admin", title = "Channel Zero Admin" }) => {
  return (
    <React.Fragment>
      <Helmet titleTemplate={`%s - ${title}`}>
        <meta charSet="utf-8" />
        <title>Default</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </Helmet>
      <div className="admin">
        <Header title={page} />
        <section className="admin-main">
          <Nav />
          <div className="page-content" id="pageContentContainer">
            <div className="admin-content-panel">{children}</div>
          </div>
        </section>
      </div>
      <Icons />
    </React.Fragment>
  );
};

export default Layout;
