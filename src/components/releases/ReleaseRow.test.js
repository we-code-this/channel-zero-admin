import React, { setGlobal } from "reactn";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router";
import ReleaseRow from "./ReleaseRow";
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
      <ReleaseRow
        release={{
          id: 1,
          user_id: userId,
          slug: "artist-2-release-1",
          title: "Release 1",
          published: 1,
          created_at: "2019-01-01"
        }}
      />
    </MemoryRouter>
  ).render();
}

function expectTableWithActionsToRender(wrapper) {
  expect(wrapper.find("td:first-child").text()).toEqual("1");
  expect(wrapper.find("td:nth-child(2) a").text()).toEqual("Release 1");
  expect(wrapper.find("td:nth-child(3)").text()).toEqual("Yes");
  expect(wrapper.find("td:nth-child(4)").text()).toEqual("January 1st, 2019");
  expect(
    wrapper.find("td:nth-child(5) .table-action-buttons").length
  ).toEqual(1);
}

function expectTableWithoutActionsToRender(wrapper) {
  expect(wrapper.find("td:first-child").text()).toEqual("1");
  expect(wrapper.find("td:nth-child(2) a").text()).toEqual("Release 1");
  expect(wrapper.find("td:nth-child(3)").text()).toEqual("Yes");
  expect(wrapper.find("td:nth-child(4)").text()).toEqual("January 1st, 2019");
  expect(
    wrapper.find("td:nth-child(5) .table-action-buttons").length
  ).toEqual(0);
}

describe("releases/ReleaseRow", () => {
  describe("when logged in", () => {
    afterEach(() => {
      setGlobal(emptyGlobals());
    });

    describe("as admin", () => {
      beforeEach(() => {
        setGlobal(adminGlobals());
      });

      it("should render with action buttons", () => {
        const wrapper = createWrapper(1);
        expectTableWithActionsToRender(wrapper);
      });
    });

    describe("as editor", () => {
      beforeEach(() => {
        setGlobal(editorGlobals());
      });

      it("should render action buttons", () => {
        const wrapper = createWrapper(1);
        expectTableWithActionsToRender(wrapper);
      });
    });

    describe("as author", () => {
      beforeEach(() => {
        setGlobal(authorGlobals());
      });

      describe("with id 1 and user_id 1", () => {
        it("should render with action buttons", () => {
          const wrapper = createWrapper(1);
          expectTableWithActionsToRender(wrapper);
        });
      });

      describe("with id 1 and user_id 2", () => {
        it("should render without action buttons", () => {
          const wrapper = createWrapper(2);
          expectTableWithoutActionsToRender(wrapper);
        });
      });
    });
  });
});
