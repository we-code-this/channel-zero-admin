import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MarkdownEditor from "./MarkdownEditor";

Enzyme.configure({ adapter: new Adapter() });

describe("MarkdownEditor", () => {
  it("should render", () => {
    const wrapper = shallow(
      <MarkdownEditor label="Test" value="test" onChange={() => {}} />
    ).render();

    expect(wrapper.hasClass("field")).toBeTruthy();
    expect(wrapper.find(".react-mde").length).toEqual(1);
  });

  it("should have .is-danger class when props.error", () => {
    const wrapper = shallow(
      <MarkdownEditor
        label="Test"
        value="test"
        onChange={() => {}}
        error="error"
      />
    ).render();

    expect(wrapper.find(".is-danger").length).toBeGreaterThan(0);
  });
});
