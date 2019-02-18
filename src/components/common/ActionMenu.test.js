import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ActionMenu from "./ActionMenu";

Enzyme.configure({ adapter: new Adapter() });

it("should render with children", () => {
  const wrapper = shallow(<ActionMenu>Something</ActionMenu>).render();

  expect(wrapper.hasClass("action-menu")).toBeTruthy();
  expect(wrapper.find("div").hasClass("buttons")).toBeTruthy();
  expect(wrapper.find("div").hasClass("has-addons")).toBeTruthy();
  expect(wrapper.find("div").text()).toEqual("Something");
});
