import React, { setGlobal } from "reactn";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router";
import Index from "./Index";
import { authorGlobals, adminGlobals, editorGlobals, emptyGlobals } from "../../utilities/testing";

Enzyme.configure({ adapter: new Adapter() });

function createWrapper() {
  return shallow(
    <MemoryRouter>
      <Index />
    </MemoryRouter>
  ).render();
}

function expectIndexToRender(wrapper) {
  expect(wrapper.find(".action-menu").length).toEqual(1);
  expect(wrapper.find(".breadcrumb").length).toEqual(1);
  expect(wrapper.find(".table").length).toEqual(1);
  expect(wrapper.find(".login-form").length).toEqual(0);
}

function expectLoginToRender(wrapper) {
  expect(wrapper.find(".action-menu").length).toEqual(0);
  expect(wrapper.find(".breadcrumb").length).toEqual(0);
  expect(wrapper.find(".table").length).toEqual(0);
  expect(wrapper.find(".login-form").length).toEqual(1);
}

describe("releases/Index", () => {
  describe("when logged in", () => {    
    afterEach(() => {
      setGlobal(emptyGlobals());
    });

    describe("as admin", () => {
      beforeEach(() => {
        setGlobal(adminGlobals());
      });

      it("should render Index", () => {
        const wrapper = createWrapper();
        expectIndexToRender(wrapper);
      });
    });

    describe("as editor", () => {
      beforeEach(() => {
        setGlobal(editorGlobals());
      });

      it("should render Index", () => {
        const wrapper = createWrapper();
        expectIndexToRender(wrapper);
      });
    });

    describe("as author", () => {
      beforeEach(() => {
        setGlobal(authorGlobals());
      });

      it("should render Index", () => {
        const wrapper = createWrapper();
        expectIndexToRender(wrapper);
      });
    });
  });

  describe("when not logged in", () => {
    it("should render LoginForm", () => {
      const wrapper = createWrapper();
      expectLoginToRender(wrapper);
    });
  });
});
