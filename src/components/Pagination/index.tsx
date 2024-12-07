import { Link } from "react-router-dom";
import styles from "./pagination.module.css";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  itemsPerPage: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  onItemsPerPageChange,
  itemsPerPage,
}) => {
  const options = [4, 8, 16];

  const generatePageLinks = (): (number | string)[] => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, "...", totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [1, "...", totalPages - 2, totalPages - 1, totalPages];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  return (
    <div className={styles.paginationWrapper}>
      <div className={styles.paginationSelect}>
        <label htmlFor="tasksPerPage">Tasks per page:</label>
        <select
          id="tasksPerPage"
          value={itemsPerPage}
          onChange={onItemsPerPageChange}
          className={styles.select}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.paginationControls}>
        <Link
          to={`?page=${currentPage - 1}`}
          className={`${styles.paginationButton} ${
            currentPage <= 1 ? styles.disabled : ""
          }`}
          onClick={() => {
            if (currentPage > 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          &lt;
        </Link>

        {generatePageLinks().map((page, index) =>
          page === "..." ? (
            <span key={index} className={styles.paginationDots}>
              ...
            </span>
          ) : (
            <Link
              key={index}
              to={`?page=${page}`}
              className={`${styles.paginationButton} ${
                currentPage === page ? styles.activePage : ""
              }`}
              onClick={() => onPageChange(Number(page))}
            >
              {page}
            </Link>
          )
        )}

        <Link
          to={`?page=${currentPage + 1}`}
          className={`${styles.paginationButton} ${
            currentPage >= totalPages ? styles.disabled : ""
          }`}
          onClick={() => {
            if (currentPage < totalPages) {
              onPageChange(currentPage + 1);
            }
          }}
        >
          &gt;
        </Link>
      </div>
    </div>
  );
};
