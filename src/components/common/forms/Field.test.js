import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Field from "./Field";

Enzyme.configure({ adapter: new Adapter() });

describe("Field", () => {
  it("should render", () => {
    const wrapper = shallow(
      <Field label="Test" onChange={() => {}}>
        <p>Child</p>
      </Field>
    ).render();

    expect(wrapper.hasClass("field")).toBeTruthy();
    expect(wrapper.find(".control").html()).toEqual("<p>Child</p>");
    expect(wrapper.find("label").text()).toEqual("Test");
  });

  it("should render help when provided", () => {
    const wrapper = shallow(
      <Field label="Test" onChange={() => {}} help="help">
        <p>Child</p>
      </Field>
    ).render();

    expect(wrapper.find(".help").length).toEqual(1);
  });

  it("should render error when provided", () => {
    const wrapper = shallow(
      <Field label="Test" onChange={() => {}} error="error">
        <p>Child</p>
      </Field>
    ).render();

    expect(wrapper.find(".is-danger").length).toEqual(1);
  });
});
