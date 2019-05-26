import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router";
import Nav from "./Nav";

Enzyme.configure({ adapter: new Adapter() });

it("should render with correct number of links", () => {
  const wrapper = shallow(
    <MemoryRouter>
      <Nav />
    </MemoryRouter>
  ).render();

  expect(wrapper.hasClass("admin-menu")).toBeTruthy();
  expect(wrapper.find("a").length).toEqual(6);
});
