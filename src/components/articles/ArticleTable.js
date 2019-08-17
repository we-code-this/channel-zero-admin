import React from "react";
import Pagination from "../common/Pagination";
import ArticleRow from "./ArticleRow";

const ArticleTable = props => {
  return (
    <React.Fragment>
      <div className="table-container">
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Published</th>
              <th>Created</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {props.articles.map(article => (
              <ArticleRow
                article={article}
                key={article.id}
                onUpdate={props.onUpdate}
              />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={props.page}
        pageCount={props.pageCount}
        perPage={props.perPage}
        path={props.path}
      />
    </React.Fragment>
  );
};

export default ArticleTable;
