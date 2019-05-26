import React from "react";
import { MemoryRouter } from "react-router";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ArtistShowColumns from "./ArtistShowColumns";

Enzyme.configure({ adapter: new Adapter() });

describe("ArtistShowColumns", () => {
  it("should render", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <ArtistShowColumns
          artist={{ id: 1, images: [{}], description: "A description" }}
          onImageDelete={() => {}}
        />
      </MemoryRouter>
    ).render();

    expect(wrapper.hasClass("show-columns")).toBeTruthy();
    expect(wrapper.find(".image-gallery").length).toEqual(1);
  });
});
