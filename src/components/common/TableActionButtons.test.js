import React from "react";
import { MemoryRouter } from "react-router";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import TableActionButtons from "./TableActionButtons";

Enzyme.configure({ adapter: new Adapter() });

describe("TableActionButtons", () => {
  it("should render", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <TableActionButtons editPath="/something" onSubmit={() => {}} />
      </MemoryRouter>
    ).render();

    expect(wrapper.hasClass("table-action-buttons")).toBeTruthy();
    expect(wrapper.find(".buttons").length).toEqual(1);
    expect(wrapper.find(".button").length).toEqual(2);
    expect(wrapper.find("form").length).toEqual(1);
  });
});
