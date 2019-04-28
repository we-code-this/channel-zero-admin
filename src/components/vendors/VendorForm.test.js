import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router";
import VendorForm from "./VendorForm";

Enzyme.configure({ adapter: new Adapter() });

describe("VendorForm", () => {
  it("should render without vendor", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <VendorForm />
      </MemoryRouter>
    ).render();

    expect(wrapper[0].name).toEqual("form");
    expect(wrapper.find(".field").length).toEqual(3);
    expect(wrapper.find("input[type='text']").length).toEqual(2);
    expect(wrapper.find(".button").length).toEqual(2);
  });

  it("should render with vendor", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <VendorForm vendor={{ name: "Vendor", icon_class: "test-icon" }} />
      </MemoryRouter>
    ).render();

    expect(wrapper.find("input[name='name']").val()).toEqual("Vendor");
    expect(wrapper.find("input[name='icon_class']").val()).toEqual("test-icon");
  });
});
