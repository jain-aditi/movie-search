import React, { useEffect, useMemo, useState } from "react";
import MovieCard from "../MovieCard";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import "./style.css";

const MovieList = ({ movies, onToggleFavourite, favourites }) => {
  const ITEMS_PER_PAGE = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const queryParameters = useMemo(
    () => new URLSearchParams(window.location.search),
    []
  );

  useEffect(() => {
    const page = queryParameters.get("page") || 1;
    setCurrentPage(page);
  }, [queryParameters]);

  useEffect(() => {
    handlePageChange(1);
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);

    // Update URL with new page number
    const newUrl = new URL(window.location.href);
    newUrl.search = newPage === 1 ? "" : `?page=${newPage}`;

    try {
      window.history.pushState(null, "", newUrl.toString());
    } catch (error) {
      console.error("Error pushing state to history:", error);
    }
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedMovies = movies.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const totalPages = Math.ceil(movies.length / ITEMS_PER_PAGE);

  const renderPaginationButtons = () => {
    const pageBtns = [];
    const curPage = +currentPage;

    if (curPage > 1) {
      pageBtns.push(
        <button
          onClick={() => handlePageChange(curPage - 1)}
          className={`pagination-btn pagination-navigate`}
        >
          <GrFormPrevious />
        </button>
      );
    }

    Array.from({ length: totalPages }, (_, index) =>
      pageBtns.push(
        <button
          key={index + 1}
          onClick={() => handlePageChange(index + 1)}
          className={`pagination-btn ${index + 1 === curPage ? "active" : ""}`}
        >
          {index + 1}
        </button>
      )
    );

    if (curPage < totalPages)
      pageBtns.push(
        <button
          onClick={() => handlePageChange(curPage + 1)}
          className={`pagination-btn pagination-navigate`}
        >
          <GrFormNext />
        </button>
      );

    return pageBtns;
  };

  return (
    <div className="movies">
      {paginatedMovies?.length ? (
        <>
          <div className="movie-list">
            {paginatedMovies?.map((movie) => (
              <MovieCard
                key={movie.Title}
                movie={movie}
                isFavourite={favourites.some(
                  (fav) => fav.imdbID === movie.imdbID
                )}
                onToggleFavourite={onToggleFavourite}
              />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="pagination-container">
              {renderPaginationButtons()}
            </div>
          )}
        </>
      ) : (
        <p className="empty-favs">No results found...</p>
      )}
    </div>
  );
};

export default React.memo(MovieList);
