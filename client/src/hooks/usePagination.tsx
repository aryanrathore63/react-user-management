import { useState } from "react";

interface UsePaginationProps {
  initialPage?: number;
  initialTotalPages?: number;
}

export function usePagination({
  initialPage = 1,
  initialTotalPages = 1,
}: UsePaginationProps = {}) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(initialTotalPages);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return {
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
    setCurrentPage,
    setTotalPages,
  };
}
