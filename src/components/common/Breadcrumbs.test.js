import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router";
import Breadcrumbs from "./Breadcrumbs";

Enzyme.configure({ adapter: new Adapter() });

it("should render with children", () => {
  const wrapper = shallow(
    <MemoryRouter>
      <Breadcrumbs>
        <span>Something</span>
      </Breadcrumbs>
    </MemoryRouter>
  ).render();

  expect(wrapper.hasClass("breadcrumb")).toBeTruthy();
  expect(wrapper.attr("aria-label")).toEqual("breadcrumbs");
  expect(wrapper.find("ul li").length).toEqual(1);
  expect(wrapper.find("span").length).toEqual(1);
  expect(wrapper.find("span").text()).toEqual("Something");
});
