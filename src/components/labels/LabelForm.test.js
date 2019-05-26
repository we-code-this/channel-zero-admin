import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router";
import LabelForm from "./LabelForm";

Enzyme.configure({ adapter: new Adapter() });

describe("LabelForm", () => {
  it("should render", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <LabelForm onSubmit={() => {}} errors={{ name: undefined }} />
      </MemoryRouter>
    ).render();

    expect(wrapper.hasClass("form")).toBeTruthy();
    expect(wrapper.find(".control").length).toEqual(3);
    expect(wrapper.find(".label").length).toEqual(1);
    expect(
      wrapper
        .find(".label")
        .first()
        .text()
    ).toEqual("Name");
    expect(wrapper.find(".input").length).toEqual(1);
    expect(wrapper.find("button").length).toEqual(2);
  });
});
