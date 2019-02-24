import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Notification from "./Notification";

Enzyme.configure({ adapter: new Adapter() });

describe("Notification", () => {
  const message = "This is the message";

  it("should render", () => {
    const wrapper = shallow(<Notification>{message}</Notification>).render();

    expect(wrapper.hasClass("notification")).toBeTruthy();
    expect(wrapper.text()).toEqual(message);
  });

  it("should render with provided color", () => {
    const wrapper = shallow(
      <Notification color="danger">{message}</Notification>
    ).render();

    expect(wrapper.hasClass("is-danger")).toBeTruthy();
  });

  it("should not be visible without show prop", () => {
    const wrapper = shallow(
      <Notification color="danger">{message}</Notification>
    ).render();

    expect(wrapper.attr("style").includes("opacity:0;height:0;")).toBeTruthy();
  });

  it("should be visible with show prop", () => {
    const wrapper = shallow(
      <Notification color="danger" show>
        {message}
      </Notification>
    ).render();

    expect(
      wrapper.attr("style").includes("opacity:1;height:auto;")
    ).toBeTruthy();
  });
});
