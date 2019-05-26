import React from "react";
import { MemoryRouter } from "react-router";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ReleaseShowColumns from "./ReleaseShowColumns";

Enzyme.configure({ adapter: new Adapter() });

describe("ReleaseShowColumns", () => {
  it("should render", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <ReleaseShowColumns
          release={{
            id: 1,
            label: { name: "Label" },
            published: true,
            description: "A description"
          }}
        />
      </MemoryRouter>
    ).render();

    expect(wrapper.hasClass("show-columns")).toBeTruthy();
    expect(wrapper.find(".image-gallery").length).toEqual(1);
    expect(wrapper.find(".metadata").length).toEqual(1);
  });
});
