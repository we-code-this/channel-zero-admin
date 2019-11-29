import React, { setGlobal } from "reactn";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router";
import ArtistRow from "./ArtistRow";
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
      <ArtistRow
        artist={{
          id: 1,
          user_id: userId,
          slug: "artist",
          name: "Artist",
          created_at: "2019-01-01"
        }}
      />
    </MemoryRouter>
  ).render();
}

function expectRowWithActionButtons(wrapper) {
  expect(wrapper.find("td:first-child").text()).toEqual("1");
  expect(wrapper.find("td:nth-child(2) a").text()).toEqual("Artist");
  expect(wrapper.find("td:nth-child(3)").text()).toEqual("January 1st, 2019");
  expect(
    wrapper.find("td:nth-child(4) .table-action-buttons").length
  ).toEqual(1);
}

function expectRowWithoutActionButtons(wrapper) {
  expect(wrapper.find("td:first-child").text()).toEqual("1");
  expect(wrapper.find("td:nth-child(2) a").text()).toEqual("Artist");
  expect(wrapper.find("td:nth-child(3)").text()).toEqual("January 1st, 2019");
  expect(
    wrapper.find("td:nth-child(4) .table-action-buttons").length
  ).toEqual(0);
}

describe("artists/ArtistRow", () => {
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
        expectRowWithActionButtons(wrapper);
      });
    });

    describe("as editor", () => {
      beforeEach(() => {
        setGlobal(editorGlobals());
      });
      
      it("should render with action buttons", () => {
        const wrapper = createWrapper(1);
        expectRowWithActionButtons(wrapper);
      });
    });

    describe("as author", () => {
      beforeEach(() => {
        setGlobal(authorGlobals());
      });

      describe("with id 1 and user_id is 1", () => {
        it("should render action buttons", () => {
          const wrapper = createWrapper(1);
          expectRowWithActionButtons(wrapper);
        });
      });

      describe("with id 1 and user_id is 2", () => {    
        it("should not render action buttons", () => {
          const wrapper = createWrapper(2);
          expectRowWithoutActionButtons(wrapper);
        });
      });
    });
  });
});
