import React, { Component } from "react";
import Helmet from "react-helmet";
import Markdown from "markdown-to-jsx";
import IconButton from "../../components/common/IconButton";
import ActionMenu from "../../components/common/ActionMenu";
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
    const artist = this.state.artist;

    if (artist) {
      return (
        <div>
          <Helmet>
            <title>{artist.name}</title>
          </Helmet>
          <ActionMenu>
            <IconButton
              to="#"
              className="is-primary"
              icon="edit"
              label="Edit"
            />
            <IconButton
              to="#"
              className="is-danger"
              icon="minus-circle"
              label="Delete"
            />
          </ActionMenu>
          <h2 className="title is-2">{artist.name}</h2>
          <Markdown>{artist.description}</Markdown>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default Show;
