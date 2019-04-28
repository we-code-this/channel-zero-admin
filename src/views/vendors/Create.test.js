import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router";
import Create from "./Create";

Enzyme.configure({ adapter: new Adapter() });

describe("vendors/Create", () => {
  it("should render", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <Create />
      </MemoryRouter>
    ).render();

    expect(wrapper.find(".breadcrumb").length).toEqual(1);
    expect(wrapper.find("form").length).toEqual(1);
  });
});
