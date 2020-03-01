import React, { Component } from "react";
import { Columns } from "react-bulma-components";
import LeftColumn from "./LeftColumn";
import DescriptionColumn from "./DescriptionColumn";

class ShowColumns extends Component {
  render() {
    return (
      <Columns className="show-columns">
        {this.props.showLeft && <LeftColumn>{this.props.children}</LeftColumn>}
        <DescriptionColumn description={this.props.description} />        
      </Columns>
    );
  }
}

ShowColumns.defaultProps = {
  showLeft: true
};

export default ShowColumns;
