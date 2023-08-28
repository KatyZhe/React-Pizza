import React from "react";
import ReactPaginate from "react-paginate";

import './Pagination.scss';

type PaginationProps = {
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, onPageChange }) => {
  return (
    <>
      <ReactPaginate
        className="pagination"
        breakLabel="..."
        nextLabel=">"
        onPageChange={(evt) => onPageChange(evt.selected + 1)}
        pageRangeDisplayed={8}
        pageCount={2}
        forcePage={currentPage - 1}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default Pagination;
