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

function expectCreateForm(wrapper) {
  expect(wrapper.find('.breadcrumb').length).toEqual(1);
  expect(wrapper.find(".vendor-form").length).toEqual(1);
  expect(wrapper.find(".login-form").length).toEqual(0);
  expect(wrapper.hasClass('no-access')).toEqual(false);
}

describe("vendors/Create", () => {
  describe("logged in as admin", () => {
    beforeEach(() => {
      setGlobal(adminGlobals());
    });
    
    afterEach(() => {
      setGlobal(emptyGlobals());
    });
  
    it("should render Create component", () => {  
      expectCreateForm(createWrapper());
    });
  });

  describe("logged in as editor", () => {
    beforeEach(() => {
      setGlobal(editorGlobals());
    });
    
    afterEach(() => {
      setGlobal(emptyGlobals());
    });
  
    it("should render Create component", () => {  
      expectCreateForm(createWrapper());
    });
  });

  describe("logged in as author", () => {
    beforeEach(() => {
      setGlobal(authorGlobals());
    });
    
    afterEach(() => {
      setGlobal(emptyGlobals());
    });
  
    it("should render Create component", () => {
      const wrapper = createWrapper();

      expect(wrapper.find('.breadcrumb').length).toEqual(0);
      expect(wrapper.find(".vendor-form").length).toEqual(0);
      expect(wrapper.find(".login-form").length).toEqual(0);
      expect(wrapper.hasClass('no-access')).toEqual(true);
    });
  });

  describe("not logged in", () => {
    it("should render Login form", () => {
      const wrapper = createWrapper();

      expect(wrapper.find('.breadcrumb').length).toEqual(0);
      expect(wrapper.find(".vendor-form").length).toEqual(0);
      expect(wrapper.find(".login-form").length).toEqual(1);
      expect(wrapper.hasClass('no-access')).toEqual(false);
    });
  });
  
});
