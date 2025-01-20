import { useEffect, useRef, useState , useCallback } from "react";
// importing hooks
import { useMovies } from "./hooks/useMovies";
import { useLocalStorageState } from "./hooks/useLocalStorageState";
import { useKey } from "./hooks/useKeys";
// importing components
import Logo from "./components/Logo";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import WatcedSummary from "./components/WatchedSummary";
import WatchedMovieList from "./components/WatchedMovieList";
import SelectedMovieDetails from "./components/SelectedMovieDetails";
import MovieList from "./components/MovieList";

// Main App component
export default function App() {
  
  const [query, setQuery] = useState("");
  const [selectedId , setSelectedId] = useState(null)

  // Using our customHook
  const [watched, setWatched] = useLocalStorageState([], "watched");
  
  function handleSelectMovie(id){
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }
  
  // making a variable function so that we can use it as callback to resist 
  // circular dependency
  const handleCloseMovie = useCallback(() => {
    setSelectedId(null);
  }, []); // No dependencies, so it won't change
  
  function handleAddWatched(movie){
    setWatched((watched) => [...watched, movie]);
  }
  
  function handleDeleteWatched(id){
    setWatched((watched)=> watched.filter(movie => movie.imdbID !== id));
  }
  
  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);
  useEffect(
    function(){
      localStorage.setItem("watched", JSON.stringify(watched));
    }
  ,[watched]);

  return (
    <>
      <NavBar movies={movies} >
        <Search query={query} setQuery={setQuery}/>
        <NumResult movies={movies} />
      </NavBar>
      <Main >
        {/* can be passed in two ways --  */}
        {/* passing as element or */}
        {/* passing as children  */}
        <Box >
          {/* <MovieList movies={movies} /> */}
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectMovie} />}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box >
            {
              selectedId ? 
              (<SelectedMovieDetails 
                selectedId={selectedId} 
                onCLoseMovie={handleCloseMovie} 
                onAddWatched={handleAddWatched}
                watchedMovies={watched}
              />) :
              <>
              <WatcedSummary watched={watched} />
              <WatchedMovieList watched={watched} onDeleteWatched={handleDeleteWatched} />
              </>
            }
        </Box>
      </Main>
    </>
  );
}

function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo /> {/* stateless component, and a part of navbar only  */ }
      {children}
    </nav>
  )
}

function Search({query , setQuery}){
  const inputElement = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === inputElement.current) return;
    inputElement.current.focus();
    setQuery("");
  });

  return (
    <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputElement}
      />
  )
}

function NumResult({movies}){
  return(
    <p className="num-results">
        Found <strong>{movies.length}</strong> results
      </p>
  )
}

function Main({children}) {
  return (
    
  <main className="main">
    {children}
  </main>
  )
}

function Box({children}){
  
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "–" : "+"}
      </button>
      {/* Don't do this {children} as it will create a new object just conditionally render it */ }
      {isOpen && children}
    </div>
  )
}