import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getMovieTrailer } from "../services/api";
import "../css/MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const movieData = await getMovieDetails(id);
      setMovie(movieData);

      const trailer = await getMovieTrailer(id);
      setTrailerUrl(trailer);
    };

    fetchDetails();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="movie-details">
      <a href="/" className="back-button">
        Back to Home
      </a>

      <div className="movie-header">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={`Poster of ${movie.title}`}
          className="movie-poster"
        />
        <div className="movie-content">
          <h1>{movie.title}</h1>
          <p className="movie-tagline">
            {`"${movie.tagline}"` || "No tagline available."}
          </p>
          <p className="movie-overview">{movie.overview}</p>
          <div className="movie-extra">
            <p>
              <strong>Release Date:</strong> {movie.release_date}
            </p>
            <p>
              <strong>Rating:</strong> ⭐ {movie.vote_average.toFixed(1)}/10
            </p>
            <p>
              <strong>Genres:</strong>{" "}
              {movie.genres?.map((g) => g.name).join(", ") || "N/A"}
            </p>
          </div>
        </div>
      </div>
      {trailerUrl ? (
        <div className="movie-trailer">
          <h2>Official Trailer</h2>
          <iframe
            src={trailerUrl}
            title="Movie Trailer"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <p className="no-trailer">No trailer available.</p>
      )}
    </div>
  );
};

export default MovieDetails;
