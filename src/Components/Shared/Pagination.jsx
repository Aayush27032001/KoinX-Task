import React from "react";
import { usePagination, DOTS } from "../../hooks/usePagination";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import styles from "./Pagination.module.scss"
const Pagination = (props) => {
  const { onPageChange, totalCount, siblingCount = 1, currentPage } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const ListItem = (props) => {
    return (
      <li
        className={`${styles.paginationListItem} ${(props.active && styles.active)}`}
        onClick={props.click}
      >
        <span>{props.children}</span>
      </li>
    );
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className={styles.paginationList}>
      <button className={`${styles.paginationListItem} ${currentPage === 1 && styles.disabled}`} onClick={onPrevious} disabled={currentPage === 1}>
        <FiChevronLeft/>
      </button>
      {paginationRange.map((pageNumber, idx) => {
        if (pageNumber === DOTS) {
          return (
            <ListItem disabled={true} key={idx}>
              ...
            </ListItem>
          );
        }

        return (
          <ListItem
            active={pageNumber === currentPage}
            disabled={pageNumber === currentPage}
            click={() => onPageChange(pageNumber)}
            key={idx}
          >
            {pageNumber}
          </ListItem>
        );
      })}
      <button className={`${styles.paginationListItem} ${currentPage === lastPage && styles.disabled}`} disabled={currentPage === lastPage} onClick={onNext}>
        <FiChevronRight/>
      </button>
    </ul>
  );
};

export default Pagination;
