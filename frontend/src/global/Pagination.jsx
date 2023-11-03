import React from "react";

const Pagination = ({ totalPosts, postsPerPage, setCurrentPage,currentPage }) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }
  return (
    <div className="flex gap-2">
      {pages.map((page, index) => {
        return (
          <button key={index} onClick={() => setCurrentPage(page)}  className={`px-4 py-2 text-[white] rounded-[50%] ${
            page === currentPage ? "bg-[#2563EB]" : "bg-[#4299E1] hover:bg-[#1C64F2]"
          }`}>
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
