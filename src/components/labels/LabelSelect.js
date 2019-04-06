import React, { Component } from "react";
import { getForSelect } from "../../models/labels";

class LabelSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      labels: []
    };
  }

  async componentDidMount() {
    const labels = this.props.labels ? this.props.labels : await getForSelect();

    this.setState({
      labels
    });
  }

  render() {
    return (
      <div className="field label-select">
        <label htmlFor="label_id" className="label">
          Label
        </label>
        <div className="control">
          <div className="select">
            <select
              name="label_id"
              onChange={this.props.onChange}
              value={this.props.value}
            >
              {this.state.labels.map(label => {
                return (
                  <option value={label.id} key={`label-${label.id}`}>
                    {label.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default LabelSelect;
