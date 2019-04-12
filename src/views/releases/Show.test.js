import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router";
import Show from "./Show";

Enzyme.configure({ adapter: new Adapter() });

describe.only("releases/Show", () => {
  it("should render", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <Show
          location={{}}
          release={{
            id: 1,
            artist_id: 1,
            label_id: 1,
            title: "Test Release",
            description: "Test release description",
            filename: "test.jpg",
            created_at: "0000-00-00 12:00:00",
            artist: {
              name: "Test Artist"
            },
            label: {
              name: "Test Label"
            }
          }}
        />
      </MemoryRouter>
    ).render();

    expect(wrapper.find(".action-menu").length).toEqual(1);
    expect(wrapper.find(".breadcrumb").length).toEqual(1);
    expect(wrapper.find(".title").length).toEqual(1);
    expect(wrapper.find(".image-gallery img").length).toEqual(1);
    expect(wrapper.find(".metadata").length).toEqual(1);
    expect(wrapper.find(".metadata li").length).toEqual(2);
    expect(wrapper.find(".description").length).toEqual(1);
  });
});
