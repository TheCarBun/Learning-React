const API_KEY = import.meta.env.VITE_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
  );
  const data = await response.json();
  return data.results;
};

export const getMovieDetails = async (id) => {
  const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  const data = await response.json();
  return data;
};

export const getMovieTrailer = async (id) => {
  const response = await fetch(
    `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`
  );
  const data = await response.json();

  // Get the official trailer from YT
  const trailer = data.results.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );

  return trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;
};
