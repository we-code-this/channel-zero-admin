import React, { Component } from "react";
import { Link } from "react-router-dom";

class Pagination extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: props.currentPage,
      count: props.count,
      perPage: props.perPage,
      path: props.path
    };
  }

  previous(page, path) {
    const prev = parseInt(page) - 1;
    return page > 1 ? (
      <Link to={`${path}/${prev}`} className="pagination-previous">
        Previous
      </Link>
    ) : (
      undefined
    );
  }

  next(page, totalPages, path) {
    const next = parseInt(page) + 1;
    return page < totalPages ? (
      <Link prefetch="true" to={`${path}/${next}`} className="pagination-next">
        Next page
      </Link>
    ) : (
      undefined
    );
  }

  link(page, totalPages, path) {
    const pageNumber = parseInt(page) + 1;
    return page === 1 ||
      page === totalPages ||
      (page >= page - 2 && page <= page + 2) ? (
      <li key={`page-${page}`}>
        <Link
          prefetch="true"
          to={`${path}/${pageNumber}`}
          className="pagination-link"
          aria-label={`Go to page ${pageNumber}`}
        >
          {pageNumber}
        </Link>
      </li>
    ) : (
      ""
    );
  }

  links() {
    const link = this.link;
    const path = this.state.path;

    return (
      <React.Fragment>
        {this.previous(this.props.currentPage, path)}
        {this.next(this.props.currentPage, this.props.pageCount, path)}
        <ul className="pagination-list">
          {Array.from(Array(this.props.pageCount).keys()).map(page => {
            return link(page, this.props.pageCount, path);
          })}
        </ul>
      </React.Fragment>
    );
  }

  render() {
    return (
      <nav
        className="pagination is-centered"
        role="navigation"
        aria-label="pagination"
      >
        {this.links()}
      </nav>
    );
  }
}

export default Pagination;
