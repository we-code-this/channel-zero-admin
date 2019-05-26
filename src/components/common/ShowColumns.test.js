import React from "react";
import { MemoryRouter } from "react-router";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ShowColumns from "./ShowColumns";

Enzyme.configure({ adapter: new Adapter() });

describe("ShowColumns", () => {
  it("should render with children", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <ShowColumns description="A description">
          <div className="show-columns-child" />
        </ShowColumns>
      </MemoryRouter>
    ).render();

    expect(wrapper.hasClass("show-columns")).toBeTruthy();
    expect(wrapper.find(".left-column").length).toEqual(1);
    expect(wrapper.find(".description").length).toEqual(1);
    expect(wrapper.find(".show-columns-child").length).toEqual(1);
  });

  it("shouldn’t have left-column when showLeft is false", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <ShowColumns description="A description" showLeft={false}>
          <div className="show-columns-child" />
        </ShowColumns>
      </MemoryRouter>
    ).render();

    expect(wrapper.find(".left-column").length).toEqual(0);
  });
});
