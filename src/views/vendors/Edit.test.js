import React, { setGlobal } from "reactn";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router";
import Edit from "./Edit";
import { authorGlobals, adminGlobals, editorGlobals, emptyGlobals } from "../../utilities/testing";

Enzyme.configure({ adapter: new Adapter() });

function expectEditForm(wrapper) {
  expect(wrapper.find(".breadcrumb").length).toEqual(1);
  expect(wrapper.find(".vendor-form").length).toEqual(1);
  expect(wrapper.find(".login-form").length).toEqual(0);
  expect(wrapper.hasClass('no-access')).toEqual(false);
}

function expectLoginForm(wrapper) {
  expect(wrapper.find(".breadcrumb").length).toEqual(0);
  expect(wrapper.find(".vendor-form").length).toEqual(0);
  expect(wrapper.find(".login-form").length).toEqual(1);
  expect(wrapper.hasClass('no-access')).toEqual(false);
}

describe("vendors/Edit", () => {
  describe("logged in as admin", () => {
    beforeEach(() => {
      setGlobal(adminGlobals());
    });
    
    afterEach(() => {
      setGlobal(emptyGlobals());
    });

    it("should render Edit component", () => {
      const wrapper = shallow(
        <MemoryRouter>
          <Edit
            vendor={{
              id: 1,
              name: "Vendor",
              icon_class: "icon",
              created_at: "2019-01-01"
            }}
          />
        </MemoryRouter>
      ).render();
  
      expectEditForm(wrapper);
    });
  });

  describe("logged in as editor", () => {
    beforeEach(() => {
      setGlobal(editorGlobals());
    });
    
    afterEach(() => {
      setGlobal(emptyGlobals());
    });

    it("should render Edit component", () => {
      const wrapper = shallow(
        <MemoryRouter>
          <Edit
            vendor={{
              id: 1,
              name: "Vendor",
              icon_class: "icon",
              created_at: "2019-01-01"
            }}
          />
        </MemoryRouter>
      ).render();
  
      expectEditForm(wrapper);
    });
  });

  describe("logged in as author", () => {
    beforeEach(() => {
      setGlobal(authorGlobals());
    });
    
    afterEach(() => {
      setGlobal(emptyGlobals());
    });

    it("should render NoAccess component", () => {
      const wrapper = shallow(
        <MemoryRouter>
          <Edit
            vendor={{
              id: 1,
              name: "Vendor",
              icon_class: "icon",
              created_at: "2019-01-01"
            }}
          />
        </MemoryRouter>
      ).render();
  
      expect(wrapper.find(".breadcrumb").length).toEqual(0);
      expect(wrapper.find(".vendor-form").length).toEqual(0);
      expect(wrapper.find(".login-form").length).toEqual(0);
      expect(wrapper.hasClass('no-access')).toEqual(true);
    });
  });

  describe("not logged in", () => {
    it("should render LoginForm", () => {
      const wrapper = shallow(
        <MemoryRouter>
          <Edit
            vendor={{
              id: 1,
              name: "Vendor",
              icon_class: "icon",
              created_at: "2019-01-01"
            }}
          />
        </MemoryRouter>
      ).render();
  
      expectLoginForm(wrapper);
    });
  });
});
