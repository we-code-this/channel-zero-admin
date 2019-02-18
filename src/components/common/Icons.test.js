import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Icons from "./Icons";

Enzyme.configure({ adapter: new Adapter() });

it("should render", () => {
  const wrapper = shallow(<Icons />).render();

  expect(wrapper.hasClass("page-icons")).toBeTruthy();
});
