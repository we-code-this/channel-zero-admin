import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router";
import ArtistBreadcrumbs from "./ArtistBreadcrumbs";
import { indexPath } from "../../models/artists";

Enzyme.configure({ adapter: new Adapter() });

describe("ArtistBreadcrumbs", () => {
  it("should render", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <ArtistBreadcrumbs />
      </MemoryRouter>
    ).render();

    expect(wrapper.hasClass("breadcrumb")).toBeTruthy();
    expect(wrapper.find("ul li").length).toEqual(2);
    expect(wrapper.html()).toContain(indexPath());
  });

  it("should render child", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <ArtistBreadcrumbs>
          <li>test</li>
        </ArtistBreadcrumbs>
      </MemoryRouter>
    ).render();

    expect(wrapper.find("ul li").length).toEqual(3);
  });
});
