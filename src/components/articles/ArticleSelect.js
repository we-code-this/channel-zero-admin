import React, { Component } from "react";
import he from "he";
import { getForSelect } from "../../models/articles";

class ArticleSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: []
    };
  }

  async componentDidMount() {
    const articles = this.props.articles
      ? this.props.articles
      : await getForSelect();

    this.setState({
      articles
    });
  }

  render() {
    return (
      <div className="field article-select">
        <label htmlFor="article_id" className="label">
          Article
        </label>
        <div className="control">
          <div className="select">
            <select
              name="article_id"
              onChange={this.props.onChange}
              value={this.props.value}
            >
              {this.state.articles.map(article => {
                return (
                  <option value={article.id} key={`article-${article.id}`}>
                    {he.decode(article.title)}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default ArticleSelect;
