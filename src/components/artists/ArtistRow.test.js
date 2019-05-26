import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router";
import ArtistRow from "./ArtistRow";

Enzyme.configure({ adapter: new Adapter() });

describe("ArtistRow", () => {
  it("should render", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <ArtistRow
          artist={{
            id: 1,
            slug: "artist",
            name: "Artist",
            created_at: "2019-01-01"
          }}
        />
      </MemoryRouter>
    ).render();

    expect(wrapper.find("td:first-child").text()).toEqual("1");
    expect(wrapper.find("td:nth-child(2) a").text()).toEqual("Artist");
    expect(wrapper.find("td:nth-child(3)").text()).toEqual("January 1st, 2019");
    expect(
      wrapper.find("td:nth-child(4) .table-action-buttons").length
    ).toEqual(1);
  });
});
