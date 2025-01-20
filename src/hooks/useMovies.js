import { useEffect , useState } from "react";
// import your own apikey
import { API_KEY } from "../constant";
// please use your own apikey
const KEY = API_KEY;


export function useMovies(query, callback) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    useEffect(function () {
        // Executes only if passed
        callback?.();
        // A native browser api to stop race condition for multiple requests
        const controller = new AbortController();
        // We can implement an extra functionality of debouncing
        async function fetchMovies() {
            try {
                setIsLoading(true);
                setError("");
                const res = await fetch(
                    `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
                    { signal: controller.signal },
                );

                if (!res.ok) throw new Error("Something went wrong with fethcing movies");

                const data = await res.json();

                if (data.Response === "False") throw new Error("Movies not found");

                setMovies(data.Search);
                setError("");
            } catch (err) {
                if (err.name !== "AbortError") {
                    console.log(err.message);
                    setError(err.message);
                }
            } finally {
                setIsLoading(false);
            }
        }

        if (query.length < 2) {
            setMovies([]);
            setError("");
            return;
        }
        fetchMovies();

        return function () {
            controller.abort();
        };
    }, [query, callback])

    return { movies, isLoading , error }
}