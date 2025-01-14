import React from "react";
import MovieCard from "../MovieCard";
import "./style.css";

const Favourites = ({ favourites, onToggleFavourite }) => {
  return (
    <div className="favourites" id="favourites">
      <h2 className="fav-header">My Favourites</h2>
      {favourites.length ? (
        <div className="fav-list">
          {favourites?.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              isFavourite={true}
              onToggleFavourite={onToggleFavourite}
            />
          ))}
        </div>
      ) : (
        <p className="empty-favs">Nothing to see here yet...</p>
      )}
    </div>
  );
};

export default Favourites;
