import React, { Component, setGlobal } from "reactn";
import { BrowserRouter, Route } from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";
import Article from "./views/articles/Show";
import Articles from "./views/articles/Index";
import Artist from "./views/artists/Show";
import Artists from "./views/artists/Index";
import CreateArticle from "./views/articles/Create";
import CreateArtist from "./views/artists/Create";
import CreateArtistImage from "./views/artist_images/Create";
import CreateFeature from "./views/features/Create";
import CreateLabel from "./views/labels/Create";
import CreatePromo from "./views/promos/Create";
import CreateRelease from "./views/releases/Create";
import CreateReleaseDisc from "./views/discs/Create";
import CreateReleaseCredit from "./views/credits/Create";
import CreateReleaseEndorsement from "./views/endorsements/Create";
import CreateReleaseTrack from "./views/tracks/Create";
import CreateReleaseVendor from "./views/releasevendors/Create";
import CreateUser from "./views/users/Create";
import CreateVendor from "./views/vendors/Create";
import CreateVideo from "./views/videos/Create";
import Dashboard from "./views/Dashboard";
import EditArticle from "./views/articles/Edit";
import EditArtist from "./views/artists/Edit";
import EditArtistImage from "./views/artist_images/Edit";
import EditFeature from "./views/features/Edit";
import EditLabel from "./views/labels/Edit";
import EditPromo from "./views/promos/Edit";
import EditRelease from "./views/releases/Edit";
import EditReleaseCredit from "./views/credits/Edit";
import EditReleaseDisc from "./views/discs/Edit";
import EditReleaseEndorsement from "./views/endorsements/Edit";
import EditReleaseVendor from "./views/releasevendors/Edit";
import EditReleaseTrack from "./views/tracks/Edit";
import EditUser from "./views/users/Edit";
import EditVendor from "./views/vendors/Edit";
import EditVideo from "./views/videos/Edit";
import Feature from "./views/features/Show";
import Features from "./views/features/Index";
import Labels from "./views/labels/Index";
import Layout from "./components/layouts/Layout";
import Promo from "./views/promos/Show";
import Promos from "./views/promos/Index";
import Release from "./views/releases/Show";
import Releases from "./views/releases/Index";
import Users from "./views/users/Index";
import Vendors from "./views/vendors/Index";
import Videos from "./views/videos/Index";
import Video from "./views/videos/Show";
import "./sass/app.scss";

setGlobal({
  token: undefined,
  groups: undefined,
  uploading: false,
});

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
            <Route exact path="/articles" component={Articles} />
            <Route path="/articles/:page" component={Articles} />
            <Route path="/article/create" component={CreateArticle} />
            <Route exact path="/article/:slug" component={Article} />
            <Route path="/article/:slug/edit" component={EditArticle} />
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
            <Route exact path="/features" component={Features} />
            <Route path="/feature/create" component={CreateFeature} />
            <Route exact path="/feature/:id" component={Feature} />
            <Route path="/feature/:id/edit" component={EditFeature} />
            <Route path="/labels" component={Labels} />
            <Route path="/label/create" component={CreateLabel} />
            <Route path="/label/:slug/edit" component={EditLabel} />
            <Route exact path="/promos" component={Promos} />
            <Route path="/promo/create" component={CreatePromo} />
            <Route path="/promo/:id/edit" component={EditPromo} />
            <Route exact path="/promo/:id" component={Promo} />
            <Route exact path="/releases" component={Releases} />
            <Route path="/releases/:page" component={Releases} />
            <Route path="/release/create" component={CreateRelease} />
            <Route exact path="/release/:slug" component={Release} />
            <Route path="/release/:slug/edit" component={EditRelease} />
            <Route path="/release/:slug/disc/create" component={CreateReleaseDisc} />
            <Route path="/release/:slug/disc/:id/edit" component={EditReleaseDisc} />
            <Route path="/release/:slug/credit/create" component={CreateReleaseCredit} />
            <Route path="/release/:slug/credit/:id/edit" component={EditReleaseCredit} />
            <Route path="/release/:slug/vendor/create" component={CreateReleaseVendor} />
            <Route path="/release/:slug/vendor/:id/edit" component={EditReleaseVendor} />
            <Route path="/release/:slug/endorsement/create" component={CreateReleaseEndorsement} />
            <Route path="/release/:slug/endorsement/:id/edit" component={EditReleaseEndorsement} />
            <Route path="/release/:slug/disc/:id/track/create" component={CreateReleaseTrack} />
            <Route path="/release/:release_slug/disc/:disc_id/track/:slug/edit" component={EditReleaseTrack} />
            <Route exact path="/users" component={Users} />
            <Route path="/users/:page" component={Users} />
            <Route path="/user/create" component={CreateUser} />
            <Route path="/user/:id/edit" component={EditUser} />
            <Route exact path="/vendors" component={Vendors} />
            <Route path="/vendors/:page" component={Vendors} />
            <Route path="/vendor/create" component={CreateVendor} />
            <Route path="/vendor/:id/edit" component={EditVendor} />
            <Route path="/videos" component={Videos} />
            <Route path="/video/create" component={CreateVideo} />
            <Route exact path="/video/:id" component={Video} />
            <Route path="/video/:id/edit" component={EditVideo} />
          </AnimatedSwitch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
