import React, { Component } from "react";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import { editorCommands } from "../../utilities/mde";
import { withRouter } from "react-router";

class ArtistForm extends Component {
  constructor(props) {
    super(props);

    console.log("ArtistForm props", props);

    this.converter = new Showdown.Converter({
      simplifiedAutoLink: true
    });

    this.state = {
      tab: "write"
    };
  }

  handleCancelClick = () => {
    this.props.history.goBack();
  };

  handleTabChange = tab => {
    this.setState({ tab });
  };

  render() {
    const artist = this.props.artist
      ? this.props.artist
      : { name: "", description: "" };

    return (
      <form onSubmit={this.props.handleSubmit}>
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={artist.name}
              onChange={this.props.handleNameChange}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Description</label>
          <div className="control">
            <ReactMde
              commands={editorCommands()}
              onChange={this.props.handleDescriptionChange}
              onTabChange={this.handleTabChange}
              value={artist.description}
              generateMarkdownPreview={markdown =>
                Promise.resolve(this.converter.makeHtml(markdown))
              }
              selectedTab={this.state.tab}
              minEditorHeight="20rem"
            />
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" type="submit">
              Submit
            </button>
          </div>
          <div className="control">
            <button className="button is-text" onClick={this.handleCancelClick}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default withRouter(ArtistForm);
