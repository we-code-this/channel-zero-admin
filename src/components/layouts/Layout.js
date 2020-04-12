import React, { useGlobal, useState, setGlobal } from "reactn";
import { Redirect } from "react-router";
import { withRouter } from "react-router-dom";
import Helmet from "react-helmet";
import Icons from "../common/Icons";
import Header from "../common/Header";
import Nav from "../common/Nav";
import logoutUser from "../../utilities/logout";
import Uploading from "../common/Uploading";

const Layout = (props) => {
  const pageName = "Channel Zero Admin";
  const [global] = useGlobal();
  const [page] = useState(props.page ? props.page : pageName);
  const [title] = useState(props.title ? props.title : pageName);
  const [nav, setNav] = useState(false);

  const logout = async (e) => {
    e.preventDefault();
    await logoutUser(global, setGlobal);
    return <Redirect to="/" />;
  };

  const toggleNav = () => {
    setNav(!nav);
  };

  const renderAdmin = () => {
    return (
      <React.Fragment>
        <div className={global.uploading ? 'admin uploading-active' : 'admin'}>
          <Header title={page} onOpenMenu={toggleNav} onLogout={logout} />
          <section className="admin-main">
            <div className="page-content" id="pageContentContainer">
              <div className="admin-content-panel">{props.children}</div>
            </div>
          </section>
        </div>
        {nav && <Nav onCloseMenu={toggleNav} />}
      </React.Fragment>
    );
  };

  const renderLogin = () => {
    return (
      <div className="login">
        {props.children}
      </div>
    );
  };

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
      {global.token ? renderAdmin() : renderLogin() }
      <Icons />
      {global.uploading && <Uploading />}
    </React.Fragment>
  );
};

export default withRouter(Layout);
