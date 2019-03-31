import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router";
import ReleaseBreadcrumbs from "./ReleaseBreadcrumbs";
import { indexPath } from "../../models/releases";

Enzyme.configure({ adapter: new Adapter() });

describe("ReleaseBreadcrumbs", () => {
  it("should render", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <ReleaseBreadcrumbs />
      </MemoryRouter>
    ).render();

    expect(wrapper.hasClass("breadcrumb")).toBeTruthy();
    expect(wrapper.find("ul li").length).toEqual(2);
    expect(wrapper.html()).toContain(indexPath());
  });

  it("should render child", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <ReleaseBreadcrumbs>
          <li>test</li>
        </ReleaseBreadcrumbs>
      </MemoryRouter>
    ).render();

    expect(wrapper.find("ul li").length).toEqual(3);
  });
});
