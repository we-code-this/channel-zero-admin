import React, { Component } from "react";
import he from "he";
import { getForSelect } from "../../models/vendors";

class VendorSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vendors: []
    };
  }

  async componentDidMount() {
    const vendors = this.props.vendors
      ? this.props.vendors
      : await getForSelect();

    this.setState({
      vendors
    });
  }

  render() {
    return (
      <div className="field vendor-select">
        <label htmlFor="vendor_id" className="label">
          Vendor
        </label>
        <div className="control">
          <div className="select">
            <select
              name="vendor_id"
              onChange={this.props.onChange}
              value={this.props.value}
            >
              {this.state.vendors.map(vendor => {
                return (
                  <option value={vendor.id} key={`vendor-${vendor.id}`}>
                    {he.decode(vendor.name)}
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

export default VendorSelect;
