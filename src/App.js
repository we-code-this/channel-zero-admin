import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";
import Artist from "./views/artists/Show";
import Artists from "./views/artists/Index";
import CreateArtist from "./views/artists/Create";
import CreateArtistImage from "./views/artist_images/Create";
import CreateLabel from "./views/labels/Create";
import CreateRelease from "./views/releases/Create";
import CreateVendor from "./views/vendors/Create";
import Dashboard from "./views/Dashboard";
import EditArtist from "./views/artists/Edit";
import EditArtistImage from "./views/artist_images/Edit";
import EditLabel from "./views/labels/Edit";
import EditRelease from "./views/releases/Edit";
import EditVendor from "./views/vendors/Edit";
import Labels from "./views/labels/Index";
import Layout from "./components/layouts/Layout";
import Login from "./views/auth/Login";
import Release from "./views/releases/Show";
import Releases from "./views/releases/Index";
import Vendors from "./views/vendors/Index";
import "./sass/app.scss";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <AnimatedSwitch
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
            className="switch-wrapper"
          >
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/artists" component={Artists} />
            <Route path="/artists/:page" component={Artists} />
            <Route path="/artist/create" component={CreateArtist} />
            <Route exact path="/artist/:slug" component={Artist} />
            <Route
              path="/artist/:slug/image/create"
              component={CreateArtistImage}
            />
            <Route
              path="/artist/:slug/image/:id/edit"
              component={EditArtistImage}
            />
            <Route path="/artist/:slug/edit" component={EditArtist} />
            <Route path="/labels" component={Labels} />
            <Route path="/label/create" component={CreateLabel} />
            <Route path="/label/:slug/edit" component={EditLabel} />
            <Route exact path="/releases" component={Releases} />
            <Route path="/releases/:page" component={Releases} />
            <Route path="/release/create" component={CreateRelease} />
            <Route exact path="/release/:slug" component={Release} />
            <Route path="/release/:slug/edit" component={EditRelease} />
            <Route path="/vendors" component={Vendors} />
            <Route path="/vendor/create" component={CreateVendor} />
            <Route path="/vendor/:id/edit" component={EditVendor} />
          </AnimatedSwitch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
