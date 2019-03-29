import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import TextInput from "./TextInput";

Enzyme.configure({ adapter: new Adapter() });

it("should render", () => {
  const wrapper = shallow(
    <TextInput label="Test" value="test" onChange={() => {}} />
  ).render();

  expect(wrapper.hasClass("field")).toBeTruthy();
  expect(wrapper.find("input").hasClass("input")).toBeTruthy();
  expect(wrapper.find("input").attr("value")).toEqual("test");
});

it("should render with is-danger class when props.error", () => {
  const wrapper = shallow(
    <TextInput label="Test" value="test" error="error" onChange={() => {}} />
  ).render();
  expect(wrapper.find("input").hasClass("is-danger")).toBeTruthy();
});
