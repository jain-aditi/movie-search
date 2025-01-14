import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import Favourites from "./components/Favourites";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";

const App = () => {
  const API_URL = `https://www.omdbapi.com/?s=hai&type=movie&apikey=11f074f3&page=`;
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [favourites, setFavourites] = useState(
    () => JSON.parse(localStorage.getItem("favouriteMovies")) || []
  );

  // Fetch movies from the API
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const promises = [];
        for (let i = 1; i <= 10; i++) {
          promises.push(axios.get(`${API_URL}${i}`));
        }

        const responses = await Promise.all(promises);
        const movieArr = responses.flatMap(
          (response) => response?.data?.Search || []
        );
        setMovies(movieArr);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [API_URL]);

  // Update filtered movies based on search query
  useEffect(() => {
    const filtered = movies?.filter((movie) =>
      movie?.Title?.toLowerCase().includes(searchQuery)
    );
    setFilteredMovies(filtered);
  }, [searchQuery, movies]);

  // Update localStorage whenever favourites change
  useEffect(() => {
    localStorage.setItem("favouriteMovies", JSON.stringify(favourites));
  }, [favourites]);

  // Add or remove a movie from favourites
  const toggleFavourite = (movie) => {
    setFavourites((prevFavourites) => {
      const isFavourite = prevFavourites.some(
        (favMovie) => favMovie.imdbID === movie.imdbID
      );
      if (isFavourite) {
        return prevFavourites.filter(
          (favMovie) => favMovie.imdbID !== movie.imdbID
        );
      }
      return [...prevFavourites, movie];
    });
  };

  // Handle search input
  const handleSearch = (query) => setSearchQuery(query?.toLowerCase());

  return (
    <main className="main">
      <header>
        <a href="#">
          <h1 className="text-white">Movie Search</h1>
        </a>
        <nav>
          <a href="#favourites">Go To Favourites</a>
          <SearchBar onSearch={handleSearch} />
        </nav>
      </header>
      {loading ? (
        <p className="text-white">Loading</p>
      ) : (
        <>
          <MovieList
            movies={filteredMovies}
            onToggleFavourite={toggleFavourite}
            favourites={favourites}
          />
          <Favourites
            favourites={favourites}
            onToggleFavourite={toggleFavourite}
          />
        </>
      )}
    </main>
  );
};

export default App;
