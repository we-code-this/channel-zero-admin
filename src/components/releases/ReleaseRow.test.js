import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router";
import ReleaseRow from "./ReleaseRow";

Enzyme.configure({ adapter: new Adapter() });

describe("ReleaseRow", () => {
  it("should render", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <ReleaseRow
          release={{
            id: 1,
            slug: "artist-2-release-1",
            title: "Release 1",
            published: 1,
            created_at: "2019-01-01"
          }}
        />
      </MemoryRouter>
    ).render();

    expect(wrapper.find("td:first-child").text()).toEqual("1");
    expect(wrapper.find("td:nth-child(2) a").text()).toEqual("Release 1");
    expect(wrapper.find("td:nth-child(3)").text()).toEqual("Yes");
    expect(wrapper.find("td:nth-child(4)").text()).toEqual("2019-01-01");
    expect(
      wrapper.find("td:nth-child(5) .table-action-buttons").length
    ).toEqual(1);
  });
});
