import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router";
import ArtistTable from "./ArtistTable";

Enzyme.configure({ adapter: new Adapter() });

describe("ArtistTable", () => {
  it("should render", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <ArtistTable
          artists={[
            {
              id: 1,
              slug: "artist-1",
              name: "Artist 1",
              created_at: "2019-01-01"
            }
          ]}
          page={1}
          pageCount={2}
          perPage={1}
          path="/"
        />
      </MemoryRouter>
    ).render();

    expect(wrapper.hasClass("table")).toBeTruthy();
    expect(wrapper.find("thead").length).toEqual(1);
    expect(wrapper.find("tbody").length).toEqual(1);
    expect(wrapper.find("th").length).toEqual(4);
    expect(wrapper.find("td").length).toEqual(4);
    expect(wrapper.find("tbody tr").length).toEqual(1);
    expect(wrapper.find(".pagination-list").length).toEqual(1);
  });

  it("should render all provided artists", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <ArtistTable
          artists={[
            {
              id: 1,
              slug: "artist-1",
              name: "Artist 1",
              created_at: "2019-01-01"
            },
            {
              id: 2,
              slug: "artist-2",
              name: "Artist 2",
              created_at: "2019-01-01"
            }
          ]}
          page={1}
          pageCount={1}
          perPage={2}
          path="/"
        />
      </MemoryRouter>
    ).render();

    expect(wrapper.find("tbody tr").length).toEqual(2);
  });
});
