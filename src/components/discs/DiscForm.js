import _ from "lodash";
import React, { Component } from "react";
import { withRouter } from "react-router";
import TextInput from "../common/forms/TextInput";
import SubmitWithCancel from "../common/forms/SubmitWithCancel";

class DiscForm extends Component {
  constructor(props) {
    super(props);

    const disc = props.disc
      ? props.disc
      : {
        release_id: props.release.id,
        name: `Disc ${parseInt(props.release.discCount) + 1}`
      };

    this.state = {
      disc: disc,
      errors: props.errors
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (!_.isEqual(props.errors, state.errors)) {
      return { ...state, errors: props.errors };
    }

    return null;
  }

  handleCancelClick = e => {
    e.preventDefault();
    this.props.history.goBack();
  };

  handleNameChange = e => {
    const disc = { ...this.state.disc, name: e.target.value };

    this.setState({ ...this.state, disc });
  };

  handleAddTrackSubmitClick = e => {
    e.preventDefault();

    if (this.props.onAddTrackSubmitClick) {
      this.props.onAddTrackSubmitClick(this.state.disc);
    }
  };

  render() {
    return (
      <form
        onSubmit={this.props.onSubmit}
        className="form disc-form"
      >
        <input type="hidden" name="release_id" value={this.state.disc.release_id} />
        <TextInput
          name="name"
          label="Disc Name"
          onChange={this.handleNameChange}
          value={this.state.disc.name}
          error={
            this.state.errors && this.state.errors.name
              ? this.state.errors.name
              : undefined
          }
        />
        <SubmitWithCancel onClick={this.handleCancelClick}>
          {this.props.onAddTrackSubmitClick && <div className="control">
            <button className="button" onClick={this.handleAddTrackSubmitClick}>Submit and Add Track</button>
          </div>}
        </SubmitWithCancel>
      </form>
    );
  }
}

export default withRouter(DiscForm);
