import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router";
import ArtistImage from "./ArtistImage";

Enzyme.configure({ adapter: new Adapter() });

describe("ArtistImage", () => {
  it("should render", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <ArtistImage
          artistSlug="artist"
          image={{ id: 1, filename: "test.jpg" }}
          alt="Test"
        />
      </MemoryRouter>
    ).render();

    expect(wrapper.first()[0].name).toEqual("img");
    expect(wrapper.first().attr("src")).toContain("test.jpg");
    expect(wrapper.first().attr("alt")).toContain("Test");
    expect(wrapper.last()[0].name).toEqual("div");
    expect(wrapper.last().hasClass("buttons")).toBeTruthy();
    expect(wrapper.last().find(".button").length).toEqual(2);
  });
});
