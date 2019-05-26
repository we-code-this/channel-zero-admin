import React, { Component } from "react";
import Helmet from "react-helmet";
import Icons from "../common/Icons";
import Header from "../common/Header";
import Nav from "../common/Nav";

class Layout extends Component {
  constructor(props) {
    super(props);

    const pageName = "Channel Zero Admin";

    this.state = {
      children: props.children,
      page: props.page ? props.page : pageName,
      title: props.title ? props.title : pageName,
      nav: false
    };
  }

  toggleNav = () => {
    this.setState({ ...this.state, nav: !this.state.nav });
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
        <div className="admin">
          <Header title={this.state.page} onOpenMenu={this.toggleNav} />
          <section className="admin-main">
            <div className="page-content" id="pageContentContainer">
              <div className="admin-content-panel">{this.state.children}</div>
            </div>
          </section>
        </div>
        {this.state.nav && <Nav onCloseMenu={this.toggleNav} />}
        <Icons />
      </React.Fragment>
    );
  }
}

export default Layout;
