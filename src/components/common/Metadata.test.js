import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Metadata from "./Metadata";

Enzyme.configure({ adapter: new Adapter() });

describe("Metadata", () => {
  it("should render", () => {
    const wrapper = shallow(
      <Metadata data={[{ key: "One", value: "One" }]} />
    ).render();

    expect(wrapper.hasClass("metadata")).toBeTruthy();
  });

  it("should render 3 list items", () => {
    const wrapper = shallow(
      <Metadata
        data={[
          { key: "One", value: "One" },
          { key: "Two", value: "Two" },
          { key: "Three", value: "Three" }
        ]}
      />
    ).render();

    expect(wrapper.find("li").length).toEqual(3);
  });
});
