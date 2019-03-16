import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";
import Layout from "./components/layouts/Layout";
import Dashboard from "./views/Dashboard";
import Artists from "./views/artists/Index";
import Artist from "./views/artists/Show";
import EditArtist from "./views/artists/Edit";
import CreateArtist from "./views/artists/Create";
import CreateArtistImage from "./views/artist_images/Create";
import Labels from "./views/labels/Index";
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
            <Route exact path="/artists" component={Artists} />
            <Route path="/artists/:page" component={Artists} />
            <Route path="/artist/create" component={CreateArtist} />
            <Route
              path="/artist/:slug/image/create"
              component={CreateArtistImage}
            />
            <Route path="/artist/:slug/edit" component={EditArtist} />
            <Route exact path="/artist/:slug" component={Artist} />
            <Route path="/labels" component={Labels} />
            <Route path="/releases" component={Releases} />
            <Route path="/vendors" component={Vendors} />
          </AnimatedSwitch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
