import React from "react";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import "./style.css";

const MovieCard = ({ movie, isFavourite, onToggleFavourite }) => {
  return (
    <div className="movie-card">
      <img src={movie?.Poster} alt={movie?.Title} className="poster-img" />
      <div className="card-details">
        <span className="movie-year">({movie?.Year})</span>
        <span
          onClick={() => onToggleFavourite(movie)}
          className="fav-toggle-btn"
        >
          {isFavourite ? (
            <IoHeart className="favourite-icon" />
          ) : (
            <IoHeartOutline className="favourite-icon" />
          )}
        </span>
      </div>
      <h3 className="movie-title text-primary">{movie?.Title}</h3>
    </div>
  );
};

export default MovieCard;
