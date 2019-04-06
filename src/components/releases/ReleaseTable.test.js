import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router";
import ReleaseTable from "./ReleaseTable";

Enzyme.configure({ adapter: new Adapter() });

describe("ReleaseTable", () => {
  it("should render", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <ReleaseTable
          releases={[
            {
              id: 1,
              slug: "artist-2-release-1",
              title: "Release 1",
              published: 1,
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

    expect(wrapper.first().find(".table").length).toEqual(1);
    expect(wrapper.find("thead").length).toEqual(1);
    expect(wrapper.find("thead tr").length).toEqual(1);
    expect(wrapper.find("thead th").length).toEqual(5);
    expect(wrapper.find("tbody").length).toEqual(1);
    expect(wrapper.find("tbody tr").length).toEqual(1);
    expect(wrapper.find("tbody td").length).toEqual(5);
    expect(wrapper.find(".pagination-list").length).toEqual(1);
  });

  it("should render all provided releases", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <ReleaseTable
          releases={[
            {
              id: 1,
              slug: "artist-2-release-1",
              title: "Release 1",
              published: 1,
              created_at: "2019-01-01"
            },
            {
              id: 2,
              slug: "artist-2-release-2",
              title: "Release 2",
              published: 1,
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
