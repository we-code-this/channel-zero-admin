import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import IconDeleteButton from "./IconDeleteButton";

Enzyme.configure({ adapter: new Adapter() });

describe("IconDeleteButton", () => {
  it("should render correctly", () => {
    const wrapper = shallow(
      <IconDeleteButton icon="test" label="Test" onSubmit={() => {}} />
    ).render();

    expect(wrapper.hasClass("is-inline")).toBeTruthy();
    expect(wrapper.find("input").length).toEqual(0);
    expect(wrapper.find("button").hasClass("button")).toBeTruthy();
    expect(wrapper.find("button").attr("aria-label")).toEqual("Test");
    expect(wrapper.find("button span:last-child").text()).toEqual("Test");
    expect(wrapper.find(".svg-icon use").attr("href")).toEqual("#icon-test");
  });

  it("should render input when id provided", () => {
    const wrapper = shallow(
      <IconDeleteButton id={1} icon="test" label="Test" onSubmit={() => {}} />
    ).render();

    expect(wrapper.find("input").length).toEqual(1);
  });

  it("should add className to button class", () => {
    const wrapper = shallow(
      <IconDeleteButton
        className="test"
        icon="test"
        label="Test"
        onSubmit={() => {}}
      />
    ).render();

    expect(wrapper.find("button").hasClass("button")).toBeTruthy();
    expect(wrapper.find("button").hasClass("test")).toBeTruthy();
  });

  it("should not render label", () => {
    const wrapper = shallow(
      <IconDeleteButton
        icon="test"
        label="Test"
        onSubmit={() => {}}
        showLabel={false}
      />
    ).render();

    expect(wrapper.find("button span:last-child").text()).not.toEqual("Test");
  });
});
