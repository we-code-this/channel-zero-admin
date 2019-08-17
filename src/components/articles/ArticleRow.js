import React, { Component } from "reactn";
import { Link } from "react-router-dom";
import TableActionButtons from "../common/TableActionButtons";
import { human } from "../../utilities/date";
import { showPath, editPath, deleteArticle } from "../../models/articles";
import { canEditOrDelete } from "../../utilities/user";

class ArticleRow extends Component {
  handleDelete = async e => {
    e.preventDefault();
    await deleteArticle(this.props.article.id);
    this.props.onUpdate();
    this.forceUpdate();
  };

  render() {
    const article = this.props.article;

    return (
      <tr>
        <td>{article.id}</td>
        <td>
          <Link to={showPath(article.slug)}>{article.title}</Link>
        </td>
        <td>{article.published ? "Yes" : "No"}</td>
        <td>{human(article.created_at)}</td>
        <td>
          {canEditOrDelete(this.global.token, this.global.groups, article.user_id) && (
            <TableActionButtons
              editPath={editPath(article.slug)}
              onSubmit={this.handleDelete}
            />
          )}
        </td>
      </tr>
    );
  }
}

export default ArticleRow;
