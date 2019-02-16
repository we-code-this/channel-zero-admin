import React, { Component } from "react";
import Helmet from "react-helmet";
import { findBySlug } from "../../models/artists";

class Show extends Component {
  constructor(props) {
    super(props);

    console.log("props", props);

    this._isMounted = false;

    this.state = {
      artist: undefined
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    const artist = await findBySlug(this.props.match.params.slug);

    if (this._isMounted) {
      this.setState({ artist });
    }
  }

  async componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    console.log("this.state.artist", this.state.artist);
    if (this.state.artist) {
      return (
        <div>
          <Helmet>
            <title>{this.state.artist.name}</title>
          </Helmet>
          <p>{this.state.artist.name}</p>
        </div>
      );
    } else {
      return <div>Loading</div>;
    }
  }
}

export default Show;
