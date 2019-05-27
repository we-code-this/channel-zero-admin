import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router";
import VendorBreadcrumbs from "./VendorBreadcrumbs";
import { indexPath } from "../../models/vendors";

Enzyme.configure({ adapter: new Adapter() });

describe("VendorBreadcrumbs", () => {
  it("should render", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <VendorBreadcrumbs />
      </MemoryRouter>
    ).render();

    expect(wrapper.hasClass("breadcrumb")).toBeTruthy();
    expect(wrapper.find("ul li").length).toEqual(2);
    expect(wrapper.html()).toContain(indexPath());
  });

  it("should render child", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <VendorBreadcrumbs>
          <li>test</li>
        </VendorBreadcrumbs>
      </MemoryRouter>
    ).render();

    expect(wrapper.find("ul li").length).toEqual(3);
  });
});
