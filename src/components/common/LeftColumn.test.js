import React from "react";
import { MemoryRouter } from "react-router";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import LeftColumn from "./LeftColumn";

Enzyme.configure({ adapter: new Adapter() });

describe("LeftColumn", () => {
  it("should render with children", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <LeftColumn>
          <div className="left-column-child" />
        </LeftColumn>
      </MemoryRouter>
    ).render();

    expect(wrapper.hasClass("left-column")).toBeTruthy();
    expect(wrapper.find(".left-column-child").length).toEqual(1);
  });
});
