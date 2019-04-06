import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ArtistSelect from "./ArtistSelect";

Enzyme.configure({ adapter: new Adapter() });

describe("ArtistSelect", () => {
  it("should render", () => {
    const wrapper = shallow(
      <ArtistSelect
        artists={[
          { id: 10, name: "Artist A" },
          { id: 1, name: "Artist D" },
          { id: 3, name: "Artist Z" }
        ]}
      />
    ).render();

    expect(wrapper.hasClass("field")).toBeTruthy();
    expect(wrapper.find(".label").length).toEqual(1);
    expect(wrapper.find("select[name='artist_id']").length).toEqual(1);
    expect(wrapper.find("select[name='artist_id'] option").length).toEqual(3);
  });
});
