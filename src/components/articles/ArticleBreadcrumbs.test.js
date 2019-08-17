import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router";
import ArticleBreadcrumbs from "./ArticleBreadcrumbs";
import { indexPath } from "../../models/articles";

Enzyme.configure({ adapter: new Adapter() });

describe("ArticleBreadcrumbs", () => {
  it("should render", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <ArticleBreadcrumbs />
      </MemoryRouter>
    ).render();

    expect(wrapper.hasClass("breadcrumb")).toBeTruthy();
    expect(wrapper.find("ul li").length).toEqual(2);
    expect(wrapper.html()).toContain(indexPath());
  });

  it("should render child", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <ArticleBreadcrumbs>
          <li>test</li>
        </ArticleBreadcrumbs>
      </MemoryRouter>
    ).render();

    expect(wrapper.find("ul li").length).toEqual(3);
  });
});
