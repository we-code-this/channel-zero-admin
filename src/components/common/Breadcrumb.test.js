import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router";
import Breadcrumb from "./Breadcrumb";

Enzyme.configure({ adapter: new Adapter() });

describe("should render correctly", () => {
  const path = "/";
  const label = "Breadcrumb";
  const wrapper = shallow(
    <MemoryRouter>
      <Breadcrumb to={path}>{label}</Breadcrumb>
    </MemoryRouter>
  ).render();

  it("should render a list item containing a link", () => {
    expect(wrapper.find("li")).toBeTruthy();
    expect(wrapper.find("li > a")).toBeTruthy();
  });

  it("should have link with correct href value", () => {
    expect(wrapper.find("li > a").attr("href")).toEqual(path);
  });

  it("should have link with correct label", () => {
    expect(wrapper.find("li > a").text()).toEqual(label);
  });
});

it("should render active link", () => {
  const wrapper = shallow(
    <MemoryRouter>
      <Breadcrumb to="/" active>
        Breadcrumb
      </Breadcrumb>
    </MemoryRouter>
  ).render();

  expect(wrapper.hasClass("is-active")).toBeTruthy();
  expect(wrapper.find("a").attr("aria-current")).toEqual("page");
});
