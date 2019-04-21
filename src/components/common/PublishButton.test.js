import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PublishButton from "./PublishButton";

Enzyme.configure({ adapter: new Adapter() });

describe("PublishButton", () => {
  it("should render correctly", () => {
    const wrapper = shallow(
      <PublishButton published={true} onSubmit={() => {}} />
    ).render();

    expect(wrapper.hasClass("is-inline")).toBeTruthy();
    expect(wrapper.find("button").hasClass("button")).toBeTruthy();
    expect(wrapper.find("button").hasClass("is-warning")).toBeTruthy();
    expect(wrapper.find("button").attr("aria-label")).toEqual("Unpublish");
    expect(wrapper.find("button span:last-child").text()).toEqual("Unpublish");
    expect(wrapper.find(".svg-icon use").attr("href")).toEqual(
      "#icon-file-minus"
    );
  });

  it("should render correct icon, button class and label when published is false", () => {
    const wrapper = shallow(
      <PublishButton published={false} onSubmit={() => {}} />
    ).render();

    expect(wrapper.find("button").hasClass("is-info")).toBeTruthy();
    expect(wrapper.find("button").attr("aria-label")).toEqual("Publish");
    expect(wrapper.find("button span:last-child").text()).toEqual("Publish");
    expect(wrapper.find(".svg-icon use").attr("href")).toEqual(
      "#icon-file-plus"
    );
  });

  it("should not render label", () => {
    const wrapper = shallow(
      <PublishButton published={true} onSubmit={() => {}} showLabel={false} />
    ).render();

    expect(wrapper.find("button span:last-child").text()).not.toEqual(
      "Unpublish"
    );
  });
});
