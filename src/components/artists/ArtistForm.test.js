import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router";
import ArtistForm from "./ArtistForm";

Enzyme.configure({ adapter: new Adapter() });

describe("ArtistForm", () => {
  it("should render without artist", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <ArtistForm />
      </MemoryRouter>
    ).render();

    expect(wrapper[0].name).toEqual("form");
    expect(wrapper.find(".field").length).toEqual(3);
    expect(wrapper.find("input[type='text']").length).toEqual(1);
    expect(wrapper.find("textarea").length).toEqual(1);
    expect(wrapper.find(".button").length).toEqual(2);
  });

  it("should render with artist", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <ArtistForm
          artist={{ name: "Artist", description: "Artist description" }}
        />
      </MemoryRouter>
    ).render();

    expect(wrapper.find("input[type='text']").val()).toEqual("Artist");
    expect(wrapper.find("textarea").val()).toEqual("Artist description");
  });
});
