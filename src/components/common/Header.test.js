import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Header from "./Header";

Enzyme.configure({ adapter: new Adapter() });

describe("should render header", () => {
  const wrapper = shallow(<Header title="Test" />).render();

  it("should render brand", () => {
    expect(wrapper.find(".brand").length).toEqual(1);
  });

  it("should render brand link", () => {
    expect(wrapper.find(".brand a").length).toEqual(1);
  });

  it("should render brand svg", () => {
    expect(wrapper.find(".brand svg").length).toEqual(1);
  });

  it("should render title", () => {
    expect(wrapper.find(".title").length).toEqual(1);
    expect(wrapper.find(".title").text()).toEqual("Test");
  });
});
