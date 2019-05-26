import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router";
import LabelTable from "./LabelTable";

Enzyme.configure({ adapter: new Adapter() });

describe("LabelTable", () => {
  it("should render", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <LabelTable
          labels={[
            {
              id: 1,
              name: "Label 1",
              slug: "label-1",
              created_at: "2019-01-01"
            }
          ]}
          page={1}
          pageCount={1}
          perPage={1}
          path="/"
        />
      </MemoryRouter>
    ).render();

    expect(wrapper.first().find(".table").length).toEqual(1);
    expect(wrapper.find("thead").length).toEqual(1);
    expect(wrapper.find("thead tr").length).toEqual(1);
    expect(wrapper.find("thead th").length).toEqual(4);
    expect(wrapper.find("tbody").length).toEqual(1);
    expect(wrapper.find("tbody tr").length).toEqual(1);
    expect(wrapper.find("tbody td").length).toEqual(4);
    expect(wrapper.find(".pagination-list").length).toEqual(0);
  });

  it("should render all provided labels", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <LabelTable
          labels={[
            {
              id: 1,
              name: "Label 1",
              slug: "label-1",
              created_at: "2019-01-01"
            },
            {
              id: 2,
              title: "Label 2",
              slug: "label-2",
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

  it("should render pagination when pageCount equals 2", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <LabelTable
          labels={[
            {
              id: 1,
              name: "Label 1",
              slug: "label-1",
              created_at: "2019-01-01"
            },
            {
              id: 2,
              title: "Label 2",
              slug: "label-2",
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

    expect(wrapper.find(".pagination-list").length).toEqual(1);
  });
});
