import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router";
import VendorRow from "./VendorRow";

Enzyme.configure({ adapter: new Adapter() });

describe("VendorRow", () => {
  it("should render", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <VendorRow
          vendor={{
            id: 1,
            name: "Vendor 1",
            icon_class: "test",
            created_at: "2019-01-01"
          }}
        />
      </MemoryRouter>
    ).render();

    expect(wrapper.find("td:first-child").text()).toEqual("1");
    expect(wrapper.find("td:nth-child(2)").text()).toEqual("Vendor 1");
    expect(wrapper.find("td:nth-child(3)").text()).toEqual("test");
    expect(wrapper.find("td:nth-child(4)").text()).toEqual("2019-01-01");
    expect(
      wrapper.find("td:nth-child(5) .table-action-buttons").length
    ).toEqual(1);
  });
});
