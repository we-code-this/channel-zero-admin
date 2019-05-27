import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router";
import Edit from "./Edit";

Enzyme.configure({ adapter: new Adapter() });

describe("vendors/Edit", () => {
  it("should render", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <Edit
          vendor={{
            id: 1,
            name: "Vendor",
            icon_class: "icon",
            created_at: "2019-01-01"
          }}
        />
      </MemoryRouter>
    ).render();

    expect(wrapper.find(".breadcrumb").length).toEqual(1);
    expect(wrapper.find("form").length).toEqual(1);
    expect(wrapper.find(".control").length).toEqual(4);
    expect(wrapper.find(".input").length).toEqual(2);
    expect(wrapper.find("label").length).toEqual(2);
    expect(
      wrapper
        .find("label")
        .first()
        .text()
    ).toEqual("Name");
    expect(
      wrapper
        .find("label")
        .last()
        .text()
    ).toEqual("Icon Class");
    expect(
      wrapper
        .find("input")
        .first()
        .val()
    ).toEqual("Vendor");
    expect(
      wrapper
        .find("input")
        .last()
        .val()
    ).toEqual("icon");
    expect(wrapper.find("button").length).toEqual(2);
  });
});
