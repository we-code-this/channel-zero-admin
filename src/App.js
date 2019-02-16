import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/common/layouts/Layout";
import "./sass/app.scss";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>something</Layout>
      </BrowserRouter>
    );
  }
}

export default App;
