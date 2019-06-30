import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PasswordInput from "./PasswordInput";

Enzyme.configure({ adapter: new Adapter() });

it("should render", () => {
  const wrapper = shallow(
    <PasswordInput label="Test" value="test" onChange={() => {}} />
  ).render();

  expect(wrapper.hasClass("field")).toBeTruthy();
  expect(wrapper.find("input").hasClass("input")).toBeTruthy();
  expect(wrapper.find("input").attr("value")).toEqual("test");
});

it("should render with is-danger class when props.error", () => {
  const wrapper = shallow(
    <PasswordInput label="Test" value="test" error="error" onChange={() => {}} />
  ).render();
  expect(wrapper.find("input").hasClass("is-danger")).toBeTruthy();
});

it("should render input with placeholder when placeholder prop used", () => {
  const wrapper = shallow(
    <PasswordInput label="Test" value="test" error="error" onChange={() => {}} placeholder />
  ).render();

  expect(wrapper.find('input[placeholder="Test"]').length).toEqual(1);
});

it("should not render input with placeholder when placeholder prop not used", () => {
  const wrapper = shallow(
    <PasswordInput label="Test" value="test" error="error" onChange={() => {}} />
  ).render();

  expect(wrapper.find('input[placeholder="Test"]').length).toEqual(0);
});