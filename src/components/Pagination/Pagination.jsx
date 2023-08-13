import React from "react";
import ReactPaginate from "react-paginate";

import './Pagination.scss';

const Pagination = ({ currentPage, onPageChange }) => {
  return (
    <>
      <ReactPaginate
        className="pagination"
        breakLabel="..."
        nextLabel=">"
        onPageChange={(evt) => onPageChange(evt.selected + 1)}
        pageRangeDisplayed={8}
        currentPage={3}
        forcePage={currentPage - 1}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default Pagination;
