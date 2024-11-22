const API_KEY = "24e9e767b7d82e9d74acb843dea1960d";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const SEARCH_URL = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=`;

const App = () => {
  const [movies, setMovies] = React.useState([]);
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    fetchTrendingMovies();
  }, []);

  const fetchTrendingMovies = () => {
    fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => setMovies(data.results))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const fetchMoviesByQuery = () => {
    if (!query) return;
    fetch(`${SEARCH_URL}${query}`)
      .then((response) => response.json())
      .then((data) => setMovies(data.results))
      .catch((error) => console.error("Error fetching data:", error));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && fetchMoviesByQuery()}
      />
      <button onClick={fetchMoviesByQuery}>Search</button>
      <div id="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="film">
            <img src={`${IMG_URL}${movie.poster_path}`} alt={movie.title} />
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

const changeLanguage = (lang) => {
  // Dilde değişiklik işlevi burada yapılacaktır
  console.log(`Dil değiştirildi: ${lang}`);
};
