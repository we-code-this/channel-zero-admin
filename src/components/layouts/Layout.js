import React, { Component } from "reactn";
import { withRouter } from "react-router-dom";
import Helmet from "react-helmet";
import Icons from "../common/Icons";
import Header from "../common/Header";
import Nav from "../common/Nav";
import logout from "../../utilities/logout";

class Layout extends Component {
  constructor(props) {
    super(props);

    const pageName = "Channel Zero Admin";

    this.state = {
      page: props.page ? props.page : pageName,
      title: props.title ? props.title : pageName,
      nav: false
    };
  }

  logout = async (e) => {
    e.preventDefault();
    await logout(this);
  };

  toggleNav = () => {
    this.setState({ ...this.state, nav: !this.state.nav });
  };

  renderAdmin = () => {
    return (
      <React.Fragment>
        <div className="admin">
          <Header title={this.state.page} onOpenMenu={this.toggleNav} onLogout={this.logout} />
          <section className="admin-main">
            <div className="page-content" id="pageContentContainer">
              <div className="admin-content-panel">{this.props.children}</div>
            </div>
          </section>
        </div>
        {this.state.nav && <Nav onCloseMenu={this.toggleNav} />}
      </React.Fragment>
    );
  };

  renderLogin = () => {
    return (
      <div className="login">
        {this.props.children}
      </div>
    );
  };

  render() {
    return (
      <React.Fragment>
        <Helmet titleTemplate={`%s - ${this.state.title}`}>
          <meta charSet="utf-8" />
          <title>Default</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, viewport-fit=cover"
          />
        </Helmet>
        {this.global.token ? this.renderAdmin() : this.renderLogin() }
        <Icons />
      </React.Fragment>
    );
  }
}

export default withRouter(Layout);
