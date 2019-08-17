import React, { Component } from "react";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import { editorCommands } from "../../../utilities/mde";
import Field from "./Field";

class MarkdownEditor extends Component {
  constructor(props) {
    super(props);

    this.converter = new Showdown.Converter({
      simplifiedAutoLink: true
    });
    this.converter.setFlavor("github");

    this.state = {
      tab: "write"
    };
  }

  handleTabChange = tab => {
    this.setState({ tab });
  };

  render() {
    const mdeClass = this.props.error ? "is-danger" : "";
    const editorHeight = this.props.editorHeight ? this.props.editorHeight : "20rem";

    return (
      <Field
        label={this.props.label}
        error={this.props.error}
        help={this.props.help}
      >
        <ReactMde
          textAreaProps={{ name: this.props.label.toLowerCase() }}
          className={mdeClass}
          commands={editorCommands()}
          onChange={this.props.onChange}
          onTabChange={this.handleTabChange}
          value={this.props.value}
          generateMarkdownPreview={markdown =>
            Promise.resolve(this.converter.makeHtml(markdown))
          }
          selectedTab={this.state.tab}
          minEditorHeight={editorHeight}
        />
      </Field>
    );
  }
}

export default MarkdownEditor;
