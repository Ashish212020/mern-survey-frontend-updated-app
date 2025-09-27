// FILE: client/src/components/Pagination.jsx

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Don't render the component if there's only one page or less.
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center items-center space-x-4 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1} // Disable if on the first page
        className="px-4 py-2 bg-white border border-gray-300 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        &larr; Previous
      </button>

      <span className="text-sm text-gray-700">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages} // Disable if on the last page
        className="px-4 py-2 bg-white border border-gray-300 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next &rarr;
      </button>
    </div>
  );
};

export default Pagination;
