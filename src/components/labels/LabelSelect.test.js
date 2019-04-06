import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import LabelSelect from "./LabelSelect";

Enzyme.configure({ adapter: new Adapter() });

describe("LabelSelect", () => {
  it("should render", () => {
    const wrapper = shallow(
      <LabelSelect
        labels={[
          { id: 10, name: "Label A" },
          { id: 1, name: "Label D" },
          { id: 3, name: "Label Z" }
        ]}
      />
    ).render();

    expect(wrapper.hasClass("field")).toBeTruthy();
    expect(wrapper.find(".label").length).toEqual(1);
    expect(wrapper.find("select[name='label_id']").length).toEqual(1);
    expect(wrapper.find("select[name='label_id'] option").length).toEqual(3);
  });
});
