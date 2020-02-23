import React, { Component } from "react";

class ReleaseTypeSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      types: [
        { id: 1, name: 'Album' },
        { id: 2, name: 'Single' },
        { id: 5, name: 'HIPHOPGODS Presents' },
        { id: 6, name: 'Marc Reddick Presents' },
        { id: 7, name: 'SLAMjamz Compilations & Projects' },
        { id: 8, name: 'Studdahman Presents' },
        { id: 9, name: 'SuperNatural INC Presents' },
      ]
    };
  }

  render() {
    return (
      <div className="field release-type-select">
        <label htmlFor="release_type" className="label">
          Release Type
        </label>
        <div className="control">
          <div className="select">
            <select
              name="release_type"
              onChange={this.props.onChange}
              value={this.props.value}
            >
              {this.state.types.map(type => {
                return (
                  <option value={type.name} key={`type-${type.id}`}>
                    {type.name}
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

export default ReleaseTypeSelect;
