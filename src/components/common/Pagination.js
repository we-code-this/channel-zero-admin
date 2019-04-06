import React, { Component } from "react";
import { Link } from "react-router-dom";

class Pagination extends Component {
  constructor(props) {
    super(props);

    this.link = this.link.bind(this);
  }

  previous(page, path) {
    const prev = parseInt(page) - 1;
    return page > 1 ? (
      <Link
        to={`${path}/${prev}`}
        className="pagination-previous"
        aria-label="Prev page"
      >
        &lt;
      </Link>
    ) : (
      <Link
        to={`${path}/${prev}`}
        className="pagination-previous"
        aria-label="Prev page"
        disabled
      >
        &lt;
      </Link>
    );
  }

  next(page, totalPages, path) {
    const next = parseInt(page) + 1;
    return page < totalPages ? (
      <Link
        prefetch="true"
        to={`${path}/${next}`}
        className="pagination-next"
        aria-label="Next page"
      >
        &gt;
      </Link>
    ) : (
      <Link
        prefetch="true"
        to={`${path}/${next}`}
        className="pagination-next"
        aria-label="Next page"
        disabled
      >
        &gt;
      </Link>
    );
  }

  isPaginationLink(pageNumber, currentPage, totalPages) {
    return (
      pageNumber === 1 ||
      pageNumber === totalPages ||
      (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2)
    );
  }

  isEllipsis(pageNumber, currentPage, totalPages) {
    return (
      (pageNumber === currentPage - 3 && pageNumber !== 1) ||
      (pageNumber === currentPage + 3 && pageNumber !== totalPages)
    );
  }

  link(page, currentPage, totalPages, path) {
    const pageNumber = parseInt(page) + 1;

    return this.isPaginationLink(pageNumber, currentPage, totalPages) ? (
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
    ) : this.isEllipsis(pageNumber, currentPage, totalPages) ? (
      <li key={`ellipsis-${page}`}>
        <span className="pagination-ellipsis">&hellip;</span>
      </li>
    ) : (
      ""
    );
  }

  links() {
    const link = this.link;
    const path = this.props.path;

    return (
      <React.Fragment>
        {this.previous(this.props.currentPage, path)}
        {this.next(this.props.currentPage, this.props.pageCount, path)}
        <ul className="pagination-list">
          {Array.from(Array(this.props.pageCount).keys()).map(page => {
            return link(
              page,
              this.props.currentPage,
              this.props.pageCount,
              path
            );
          })}
        </ul>
      </React.Fragment>
    );
  }

  render() {
    return (
      this.props.pageCount > 1 && (
        <nav
          className="pagination is-centered"
          role="navigation"
          aria-label="pagination"
        >
          {this.links()}
        </nav>
      )
    );
  }
}

export default Pagination;
