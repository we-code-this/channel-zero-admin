import React, { Component } from "react";

class PromoLocationSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locations: [
        {
          id: 1,
          value: "horizontal",
          label: "Horizontal"
        }, {
          id: 2,
          value: "vertical",
          label: "Vertical"
      }]
    };
  }

  render() {
    return (
      <div className="field promo-select">
        <label htmlFor="location" className="label">
          Location
        </label>
        <div className="control">
          <div className="select">
            <select
              name="location"
              onChange={this.props.onChange}
              value={this.props.value}
            >
              {this.state.locations.map(location => {
                return (
                  <option value={location.value} key={`location-${location.id}`}>
                    {location.label}
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

export default PromoLocationSelect;
