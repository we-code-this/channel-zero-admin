import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Breadcrumbs from "./Breadcrumbs";

Enzyme.configure({ adapter: new Adapter() });

it("should render with children", () => {
  const wrapper = shallow(<Breadcrumbs>Something</Breadcrumbs>).render();

  expect(wrapper.hasClass("breadcrumb")).toBeTruthy();
  expect(wrapper.attr("aria-label")).toEqual("breadcrumbs");
  expect(wrapper.text()).toEqual("Something");
});
