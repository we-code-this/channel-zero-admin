import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router";
import ReleaseForm from "./ReleaseForm";

Enzyme.configure({ adapter: new Adapter() });

describe("ReleaseForm", () => {
  it("should render", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <ReleaseForm
          artists={[
            { id: 10, name: "Artist A" },
            { id: 1, name: "Artist D" },
            { id: 3, name: "Artist Z" }
          ]}
          labels={[
            { id: 10, name: "Label A" },
            { id: 2, name: "Label C" },
            { id: 4, name: "Label X" }
          ]}
        />
      </MemoryRouter>
    ).render();

    expect(wrapper[0].name).toEqual("form");
    expect(wrapper.find(".artist-select").length).toEqual(1);
    expect(wrapper.find(".label-select").length).toEqual(1);
    expect(wrapper.find("input[name='title']").length).toEqual(1);
    expect(wrapper.find("textarea").length).toEqual(1);
    expect(wrapper.find("input[type='file']").length).toEqual(1);
    expect(wrapper.find(".submit-with-cancel").length).toEqual(1);
    expect(wrapper.find(".is-danger").length).toEqual(0);
  });

  it("should render image error", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <ReleaseForm
          onSubmit={() => {}}
          errors={{
            image: "error"
          }}
        />
      </MemoryRouter>
    ).render();

    expect(wrapper.find(".image-error").length).toEqual(1);
  });
});
