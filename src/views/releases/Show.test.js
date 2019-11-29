import React, { setGlobal } from "reactn";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router";
import Show from "./Show";
import { authorGlobals, adminGlobals, editorGlobals, emptyGlobals } from "../../utilities/testing";

Enzyme.configure({ adapter: new Adapter() });

jest.mock("jwt-decode", () => {
  return (token) => ({
    id: 1
  });
});

function createWrapper(userId) {
  return shallow(
    <MemoryRouter>
      <Show
        location={{}}
        release={{
          id: 1,
          artist_id: 1,
          label_id: 1,
          user_id: userId,
          title: "Test Release",
          description: "Test release description",
          filename: "test.jpg",
          created_at: "0000-00-00 12:00:00",
          artist: {
            name: "Test Artist"
          },
          label: {
            name: "Test Label"
          }
        }}
      />
    </MemoryRouter>
  ).render();
}

function expectShowToRender(wrapper) {
  expect(wrapper.find(".action-menu").length).toEqual(1);
  expect(wrapper.find(".breadcrumb").length).toEqual(1);
  expect(wrapper.find(".title").length).toEqual(1);
  expect(wrapper.find(".image-gallery img").length).toEqual(1);
  expect(wrapper.find(".metadata").length).toEqual(1);
  expect(wrapper.find(".metadata li").length).toEqual(2);
  expect(wrapper.find(".description").length).toEqual(1);
  expect(wrapper.find('.login-form').length).toEqual(0);
}

function expectShowToRenderWithoutActionMenu(wrapper) {
  expect(wrapper.find(".action-menu").length).toEqual(0);
  expect(wrapper.find(".breadcrumb").length).toEqual(1);
  expect(wrapper.find(".title").length).toEqual(1);
  expect(wrapper.find(".image-gallery img").length).toEqual(1);
  expect(wrapper.find(".metadata").length).toEqual(1);
  expect(wrapper.find(".metadata li").length).toEqual(2);
  expect(wrapper.find(".description").length).toEqual(1);
  expect(wrapper.find('.login-form').length).toEqual(0);
}

function expectLoginFormToRender(wrapper) {
  expect(wrapper.find(".action-menu").length).toEqual(0);
  expect(wrapper.find(".breadcrumb").length).toEqual(0);
  expect(wrapper.find(".title").length).toEqual(0);
  expect(wrapper.find(".image-gallery img").length).toEqual(0);
  expect(wrapper.find(".metadata").length).toEqual(0);
  expect(wrapper.find(".metadata li").length).toEqual(0);
  expect(wrapper.find(".description").length).toEqual(0);
  expect(wrapper.find('.login-form').length).toEqual(1);
}

describe("releases/Show", () => {
  describe("when logged in", () => {
    afterEach(() => {
      setGlobal(emptyGlobals());
    });

    describe("as admin", () => {
      beforeEach(() => {
        setGlobal(adminGlobals());
      });
      
      it("should render Show with action menu", () => {
        const wrapper = createWrapper(1);
        expectShowToRender(wrapper);
      });
    });

    describe("as editor", () => {
      beforeEach(() => {
        setGlobal(editorGlobals());
      });
      
      it("should render Show with action menu", () => {
        const wrapper = createWrapper(1);
        expectShowToRender(wrapper);
      });
    });

    describe("as author", () => {
      beforeEach(() => {
        setGlobal(authorGlobals());
      });

      describe('with id of 1 and user_id 1', () => {
        it("should render Show with action menu", () => {
          const wrapper = createWrapper(1);
          expectShowToRender(wrapper);
        });
      });

      describe('with id of 1 and user_id 2', () => {
        it("should render Show with action menu", () => {
          const wrapper = createWrapper(2);
          expectShowToRenderWithoutActionMenu(wrapper);
        });
      });
    });
  });

  describe("not logged in", () => {
    it('should render LoginForm', () => {
      const wrapper = createWrapper(1);
      expectLoginFormToRender(wrapper);
    })
  })
});
