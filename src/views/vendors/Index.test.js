import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router";
import Index from "./Index";

Enzyme.configure({ adapter: new Adapter() });

describe("vendors/Index", () => {
  it("should render", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <Index />
      </MemoryRouter>
    ).render();

    expect(wrapper.find(".action-menu").length).toEqual(1);
    expect(wrapper.find(".breadcrumb").length).toEqual(1);
    expect(wrapper.find(".table").length).toEqual(1);
  });
});
