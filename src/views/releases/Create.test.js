import React, { setGlobal } from "reactn";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router";
import Create from "./Create";
import { authorGlobals, adminGlobals, editorGlobals, emptyGlobals } from "../../utilities/testing";

Enzyme.configure({ adapter: new Adapter() });

function createWrapper() {
  return shallow(
    <MemoryRouter>
      <Create />
    </MemoryRouter>
  ).render();
}

function expectReleaseFormToRender(wrapper) {
  expect(wrapper.find(".breadcrumb").length).toEqual(1);
  expect(wrapper.find(".release-form").length).toEqual(1);
  expect(wrapper.find('.login-form').length).toEqual(0);
}

function expectLoginFormToRender(wrapper) {
  expect(wrapper.find(".breadcrumb").length).toEqual(0);
  expect(wrapper.find(".release-form").length).toEqual(0);
  expect(wrapper.find('.login-form').length).toEqual(1);
}

describe("releases/Create", () => {
  describe("when logged in", () => {
    afterEach(() => {
      setGlobal(emptyGlobals());
    });

    describe("as admin", () => {
      beforeEach(() => {
        setGlobal(adminGlobals());
      });

      it("should render", () => {
        expectReleaseFormToRender(createWrapper());
      });
    });

    describe("as editor", () => {
      beforeEach(() => {
        setGlobal(editorGlobals());
      });

      it("should render", () => {
        expectReleaseFormToRender(createWrapper());
      });
    });

    describe("as author", () => {
      beforeEach(() => {
        setGlobal(authorGlobals());
      });

      it("should render", () => {
        expectReleaseFormToRender(createWrapper());
      });
    });
  });

  describe("when not logged in", () => {
    it("should render LoginForm", () => {
      expectLoginFormToRender(createWrapper());
    })
  });
});
