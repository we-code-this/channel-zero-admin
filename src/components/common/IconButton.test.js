import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router";
import IconButton from "./IconButton";

Enzyme.configure({ adapter: new Adapter() });

describe("should render correctly", () => {
  const path = "/";
  const label = "Test";
  const wrapper = shallow(
    <MemoryRouter>
      <IconButton icon="test" label={label} to={path} />
    </MemoryRouter>
  ).render();

  it("should render link with correct href value", () => {
    expect(wrapper.attr("href")).toEqual(path);
  });

  it("should render link with button class", () => {
    expect(wrapper.hasClass("button")).toBeTruthy();
  });

  it("should render with child svg", () => {
    expect(wrapper.find("svg").length).toEqual(1);
  });

  it("should render label in span", () => {
    expect(wrapper.find("span").text()).toEqual(label);
  });
});

it("should render with additional className", () => {
  const wrapper = shallow(
    <MemoryRouter>
      <IconButton icon="test" label="Test" to="/" className="test" />
    </MemoryRouter>
  ).render();

  expect(wrapper.hasClass("button")).toBeTruthy();
  expect(wrapper.hasClass("test")).toBeTruthy();
});
