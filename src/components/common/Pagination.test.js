import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router";
import Pagination from "./Pagination";

Enzyme.configure({ adapter: new Adapter() });

it("shouldn't render if only 1 page", () => {
  const wrapper = shallow(
    <MemoryRouter>
      <Pagination pageCount={1} />
    </MemoryRouter>
  ).render();

  expect(wrapper.find("nav").length).toEqual(0);
});

it("should render 2 .pagination-link and 1 .pagination-next", () => {
  const wrapper = shallow(
    <MemoryRouter>
      <Pagination currentPage={1} pageCount={2} />
    </MemoryRouter>
  ).render();

  expect(wrapper.find(".pagination-link").length).toEqual(2);
  expect(wrapper.find(".pagination-next").length).toEqual(1);
});

it("should render 2 .pagination-link and 1 .pagination-previous", () => {
  const wrapper = shallow(
    <MemoryRouter>
      <Pagination currentPage={2} pageCount={2} />
    </MemoryRouter>
  ).render();

  expect(wrapper.find(".pagination-link").length).toEqual(2);
  expect(wrapper.find(".pagination-previous").length).toEqual(1);
});

it("should render 7 .pagination-link, 2 .pagination-ellipsis, 1 .pagination-next and 1 .pagination-previous", () => {
  const wrapper = shallow(
    <MemoryRouter>
      <Pagination currentPage={5} pageCount={10} />
    </MemoryRouter>
  ).render();

  expect(wrapper.find(".pagination-link").length).toEqual(7);
  expect(wrapper.find(".pagination-ellipsis").length).toEqual(2);
  expect(wrapper.find(".pagination-previous").length).toEqual(1);
  expect(wrapper.find(".pagination-next").length).toEqual(1);
});
