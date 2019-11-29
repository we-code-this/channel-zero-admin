import React, { setGlobal } from "reactn";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router";
import ArtistTable from "./ArtistTable";
import { adminGlobals, emptyGlobals } from "../../utilities/testing";

Enzyme.configure({ adapter: new Adapter() });

function createWrapper(itemCount = 1) {
  let artists = [
    {
      id: 1,
      slug: "artist-1",
      name: "Artist 1",
      created_at: "2019-01-01"
    }
  ];

  if (itemCount === 2) {
    artists.push({
      id: 2,
      slug: "artist-2",
      name: "Artist 2",
      created_at: "2019-01-01"
    });
  }

  return shallow(
    <MemoryRouter>
      <ArtistTable
        artists={artists}
        page={1}
        pageCount={2}
        perPage={1}
        path="/"
      />
    </MemoryRouter>
  ).render();
}

describe("artists/ArtistTable", () => {
  beforeEach(() => {
    setGlobal(adminGlobals());
  });

  afterEach(() => {
    setGlobal(emptyGlobals());
  });
  
  it("should render", () => {
    const wrapper = createWrapper();

    expect(wrapper.first().find(".table").length).toEqual(1);
    expect(wrapper.find("thead").length).toEqual(1);
    expect(wrapper.find("thead tr").length).toEqual(1);
    expect(wrapper.find("thead th").length).toEqual(4);
    expect(wrapper.find("tbody").length).toEqual(1);
    expect(wrapper.find("tbody tr").length).toEqual(1);
    expect(wrapper.find("tbody td").length).toEqual(4);
    expect(wrapper.find(".pagination-list").length).toEqual(1);
  });

  it("should render all provided artists", () => {
    const wrapper = createWrapper(2);

    expect(wrapper.find("tbody tr").length).toEqual(2);
  });
});
