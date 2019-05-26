import React from "react";
import { MemoryRouter } from "react-router";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ArtistImageGallery from "./ArtistImageGallery";

Enzyme.configure({ adapter: new Adapter() });

describe("ArtistImageGallery", () => {
  it("should render", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <ArtistImageGallery
          artist={{ id: 1, images: [{}] }}
          onImageDelete={() => {}}
        />
      </MemoryRouter>
    ).render();

    expect(wrapper.hasClass("image-gallery")).toBeTruthy();
    expect(wrapper.find(".image-container").length).toEqual(1);
  });

  it("should container 2 image-containers", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <ArtistImageGallery
          artist={{ id: 1, images: [{}, {}] }}
          onImageDelete={() => {}}
        />
      </MemoryRouter>
    ).render();

    expect(wrapper.find(".image-container").length).toEqual(2);
  });
});
