import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ImageFileInputWithPreview from "./ImageFileInputWithPreview";

Enzyme.configure({ adapter: new Adapter() });

describe("ImageFileInputWithPreview", () => {
  it("should render", () => {
    const wrapper = shallow(
      <ImageFileInputWithPreview onChange={() => {}} />
    ).render();

    expect(wrapper.find(".field .file").length).toEqual(1);
    expect(wrapper.find(".preview-icon").length).toEqual(1);
  });

  it("should render image when props.preview_url provided", () => {
    const wrapper = shallow(
      <ImageFileInputWithPreview
        onChange={() => {}}
        preview_url="http://image"
      />
    ).render();

    expect(wrapper.find(".image-preview img").length).toEqual(1);
    expect(wrapper.find(".preview-icon").length).toEqual(0);
  });

  it("should display error_message when props.error is true", () => {
    const wrapper = shallow(
      <ImageFileInputWithPreview
        onChange={() => {}}
        preview_url="http://image"
        error_message="error"
        error={true}
      />
    ).render();

    expect(wrapper.find(".is-danger").length).toEqual(1);
    expect(wrapper.find(".is-danger").text()).toEqual("error");
  });
});
