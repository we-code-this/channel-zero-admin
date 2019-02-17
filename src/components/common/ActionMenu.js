import React from "react";

const ActionMenu = ({ children }) => (
  <div className="action-menu">
    <div className="buttons has-addons">{children}</div>
  </div>
);

export default ActionMenu;
