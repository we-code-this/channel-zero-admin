import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import Dashboard from "./views/Dashboard";
import Artists from "./views/artists/Index";
import Artist from "./views/artists/Show";
import Labels from "./views/labels/Index";
import Releases from "./views/releases/Index";
import Vendors from "./views/vendors/Index";
import "./sass/app.scss";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/artists" component={Artists} />
          <Route path="/artists/:page" component={Artists} />
          <Route path="/artist/:slug" component={Artist} />
          <Route path="/labels" component={Labels} />
          <Route path="/releases" component={Releases} />
          <Route path="/vendors" component={Vendors} />
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
