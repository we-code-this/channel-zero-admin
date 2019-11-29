import React, { setGlobal } from "reactn";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router";
import LabelTable from "./LabelTable";
import { adminGlobals, emptyGlobals } from "../../utilities/testing";

Enzyme.configure({ adapter: new Adapter() });

function createWrapper(pageCount = 1, itemCount = 2) {
  let labels = [
    {
      id: 1,
      name: "Label 1",
      slug: "label-1",
      created_at: "2019-01-01"
    }
  ];

  if(itemCount === 2) {
    labels.push(
      {
        id: 2,
        title: "Label 2",
        slug: "label-2",
        created_at: "2019-01-01"
      }
    );
  }

  return shallow(
    <MemoryRouter>
      <LabelTable
        labels={labels}
        page={1}
        pageCount={pageCount}
        perPage={1}
        path="/"
      />
    </MemoryRouter>
  ).render();
}

describe("labels/LabelTable", () => {
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
    expect(wrapper.find("thead th").length).toEqual(4);
    expect(wrapper.find("tbody").length).toEqual(1);
    expect(wrapper.find("tbody tr").length).toEqual(1);
    expect(wrapper.find("tbody td").length).toEqual(4);
    expect(wrapper.find(".pagination-list").length).toEqual(0);
  });

  it("should render all provided labels", () => {
    const wrapper = createWrapper();
    expect(wrapper.find("tbody tr").length).toEqual(2);
  });

  it("should render pagination when pageCount equals 2", () => {
    const wrapper = createWrapper(2);
    expect(wrapper.find(".pagination-list").length).toEqual(1);
  });
});
