import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import DescriptionColumn from "./DescriptionColumn";

Enzyme.configure({ adapter: new Adapter() });

describe("DescriptionColumn", () => {
  it("should render", () => {
    const wrapper = shallow(
      <DescriptionColumn description="A description" />
    ).render();

    expect(wrapper.hasClass("description")).toBeTruthy();
  });
});
