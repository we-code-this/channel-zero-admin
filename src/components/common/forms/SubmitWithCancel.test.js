import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SubmitWithCancel from "./SubmitWithCancel";

Enzyme.configure({ adapter: new Adapter() });

it("should render submit and cancel buttons", () => {
  const wrapper = shallow(<SubmitWithCancel onClick={() => {}} />).render();

  expect(wrapper.hasClass("field")).toBeTruthy();
  expect(wrapper.find(".control").length).toEqual(2);
  expect(wrapper.find("button").length).toEqual(2);
  expect(wrapper.find("button.is-link").text()).toEqual("Submit");
  expect(wrapper.find("button.is-text").text()).toEqual("Cancel");
});
