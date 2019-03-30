import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router";
import ArtistImageForm from "./ArtistImageForm";

Enzyme.configure({ adapter: new Adapter() });

describe("ArtistImageForm", () => {
  it("should render", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <ArtistImageForm artist_id={1} onSubmit={() => {}} />
      </MemoryRouter>
    ).render();

    expect(wrapper.find("input[name='artist_id']").length).toEqual(1);
    expect(wrapper.find("input[name='artist_id']").val()).toEqual("1");
    expect(wrapper.find("input[name='id']").length).toEqual(0);
    expect(wrapper.find(".field .file").length).toEqual(1);
    expect(wrapper.find(".field.is-grouped").length).toEqual(1);
    expect(wrapper.find(".is-danger").length).toEqual(0);
  });

  it("should render error", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <ArtistImageForm
          artist_id={1}
          onSubmit={() => {}}
          errors={{
            image: "error"
          }}
        />
      </MemoryRouter>
    ).render();

    expect(wrapper.find(".is-danger").length).toEqual(1);
  });

  it("should render id input", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <ArtistImageForm
          edit={true}
          image={{ id: 2 }}
          artist_id={1}
          onSubmit={() => {}}
        />
      </MemoryRouter>
    ).render();

    expect(wrapper.find("input[name='artist_id']").length).toEqual(0);
    expect(wrapper.find("input[name='id']").length).toEqual(1);
    expect(wrapper.find("input[name='id']").val()).toEqual("2");
  });
});
