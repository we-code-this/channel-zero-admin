import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router";
import LabelBreadcrumbs from "./LabelBreadcrumbs";
import { indexPath } from "../../models/labels";

Enzyme.configure({ adapter: new Adapter() });

describe("LabelBreadcrumbs", () => {
  it("should render", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <LabelBreadcrumbs />
      </MemoryRouter>
    ).render();

    expect(wrapper.hasClass("breadcrumb")).toBeTruthy();
    expect(wrapper.find("ul li").length).toEqual(2);
    expect(wrapper.html()).toContain(indexPath());
  });

  it("should render child", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <LabelBreadcrumbs>
          <li>test</li>
        </LabelBreadcrumbs>
      </MemoryRouter>
    ).render();

    expect(wrapper.find("ul li").length).toEqual(3);
  });
});
