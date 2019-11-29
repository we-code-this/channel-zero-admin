import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router";
import ArticleForm from "./ArticleForm";

Enzyme.configure({ adapter: new Adapter() });

describe("articles/ArticleForm", () => {
  it("should render", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <ArticleForm />
      </MemoryRouter>
    ).render();

    expect(wrapper.hasClass("article-form")).toEqual(true);
    expect(wrapper.find("input[name='title']").length).toEqual(1);
    expect(wrapper.find("textarea[name='summary']").length).toEqual(1);
    expect(wrapper.find("textarea[name='description']").length).toEqual(1);
    expect(wrapper.find("input[type='file']").length).toEqual(1);
    expect(wrapper.find(".submit-with-cancel").length).toEqual(1);
    expect(wrapper.find(".image-error").length).toEqual(0);
  });

  it("should render image error", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <ArticleForm
          onSubmit={() => {}}
          errors={{
            image: "error"
          }}
        />
      </MemoryRouter>
    ).render();

    expect(wrapper.find(".image-error").length).toEqual(1);
  });

  it("should render image when article with filename and url provided", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <ArticleForm
          article={{
            filename: 'test.jpg',
            url: 'test.jpg'
          }}
        />
      </MemoryRouter>
    ).render();

    expect(wrapper.find('img').length).toEqual(1);
  });
});
