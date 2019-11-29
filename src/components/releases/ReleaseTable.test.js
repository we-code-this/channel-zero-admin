import React, { setGlobal } from "reactn";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router";
import ReleaseTable from "./ReleaseTable";
import { adminGlobals, emptyGlobals } from "../../utilities/testing";

Enzyme.configure({ adapter: new Adapter() });

function createWrapper(pageCount = 1, itemCount = 2) {
  let releases = [
    {
      id: 1,
      slug: "artist-2-release-1",
      title: "Release 1",
      published: 1,
      created_at: "2019-01-01"
    }
  ];

  if(itemCount === 2) {
    releases.push(
      {
        id: 2,
        slug: "artist-2-release-2",
        title: "Release 2",
        published: 1,
        created_at: "2019-01-01"
      }
    );
  }

  return shallow(
    <MemoryRouter>
      <ReleaseTable
        releases={releases}
        page={1}
        pageCount={pageCount}
        perPage={2}
        path="/"
      />
    </MemoryRouter>
  ).render();
}

describe("releases/ReleaseTable", () => {
  beforeEach(() => {
    setGlobal(adminGlobals());
  });

  afterEach(() => {
    setGlobal(emptyGlobals());
  });

  it("should render", () => {
    const wrapper = createWrapper(1, 1);

    expect(wrapper.first().find(".table").length).toEqual(1);
    expect(wrapper.find("thead").length).toEqual(1);
    expect(wrapper.find("thead tr").length).toEqual(1);
    expect(wrapper.find("thead th").length).toEqual(5);
    expect(wrapper.find("tbody").length).toEqual(1);
    expect(wrapper.find("tbody tr").length).toEqual(1);
    expect(wrapper.find("tbody td").length).toEqual(5);
    expect(wrapper.find(".pagination-list").length).toEqual(0);
  });

  it("should render all provided releases", () => {
    const wrapper = createWrapper();
    expect(wrapper.find("tbody tr").length).toEqual(2);
  });

  it("should render pagination when pageCount is 2", () => {
    const wrapper = createWrapper(2);
    expect(wrapper.find(".pagination-list").length).toEqual(1);
  }); 
});
