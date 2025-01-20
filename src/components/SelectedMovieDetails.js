import { useState, useRef, useEffect } from "react";
// import your own apikey
import { API_KEY } from "../constant";
import Loader from "./Loader";
import StarRating from "../StarRating";
// please use your own apikey
const KEY = API_KEY;

export default function SelectedMovieDetails({ selectedId, onCLoseMovie, onAddWatched, watchedMovies }) {
    const [movieDetails, setMovieDetails] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState('');

    // Example case of local variable -- 
    // let count = 0;
    // Using useRef for persisting data across re-renders
    const countStarsRef = useRef(0);
    // For mutanting useRef value -
    useEffect(function () {
        if (userRating) countStarsRef.current++;
        // reseting to 0 after every re-render
        // if(userRating) count++;
    }, [userRating])

    const isWatched = watchedMovies.map(movie => movie.imdbID).includes(selectedId);
    const watchedUserRating = watchedMovies.find(movie => movie.imdbID === selectedId)?.userRating;

    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
    } = movieDetails;

    function handleAdd() {
        const newWatchedMovie = {
            imdbID: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(' ').at(0)),
            userRating,
            countRatingDescision: countStarsRef.current,
        }
        onAddWatched(newWatchedMovie);
        onCLoseMovie();
    }

    useEffect(
        function () {
            function callback(e) {
                if (e.code === "Escape") {
                    onCLoseMovie();
                }
            }
            document.addEventListener("keydown", callback);
            return function () {
                document.removeEventListener("keydown", callback);
            }
        },
        [onCLoseMovie]
    )

    //use try-catch here
    useEffect(function () {
        async function getMovieDetails() {
            setIsLoading(true);
            const res = await fetch(
                `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`,
            );
            const data = await res.json();
            setMovieDetails(data);
            setIsLoading(false);
        }

        getMovieDetails()
    }, [selectedId])


    useEffect(
        function () {
            if (!title) return;
            document.title = `Movie | ${title}`;

            //Clean up effect for title
            /*
              the title is remembered as if the component is 
              being unmounted because of closure property 
            */
            return function () {
                document.title = "movie-popcorn";
            };
        },
        [title]
    );

    return (
        <div className="details" >
            {isLoading ? <Loader /> :
                <>
                    <header>
                        <button className="btn-back" onClick={onCLoseMovie} >
                            &larr;
                        </button>
                        <img src={poster} alt={`Poster of ${movieDetails} movie`} />
                        <div className="details-overview" >
                            <h2>{title}</h2>
                            <p>
                                {released} &bull; {runtime}
                            </p>
                            <p>{genre}</p>
                            <p><span>⭐️</span>{imdbRating} IMDb rating</p>
                        </div>
                    </header>
                    <section>
                        <div className="rating" >
                            {!isWatched ?
                                <>
                                    <StarRating
                                        maxRating={10}
                                        size={24}
                                        onSetRating={setUserRating}
                                    />
                                    {userRating > 0 && (<button
                                        className="btn-add"
                                        onClick={handleAdd}
                                    >+ Add to list
                                    </button>)}
                                </> :
                                <p>You rated this movie <span>⭐</span> {watchedUserRating}</p>
                            }
                        </div>
                        <p><em>{plot}</em></p>
                        <p>Starring {actors}</p>
                        <p>Directed by {director}</p>
                    </section>
                </>
            }
        </div>
    )
}