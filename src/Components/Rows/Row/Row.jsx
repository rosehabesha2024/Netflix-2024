// import axios from "axios";
import React, { useEffect, useState } from "react";
import axios from "../../../Utils/axios";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";
import "./Row.css";

function Rows({ fetchUrl, title, isLargeRow }) {
  const [movie, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const base_Url = "https://image.tmdb.org/t/p/original";
  useEffect(() => {
    (async () => {
      try {
        const request = await axios.get(fetchUrl);
        console.log(request);
        setMovie(request.data.results);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [fetchUrl]);

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.orginal_name)
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          const videoId = urlParams.get("v");
          console.log(videoId);
          setTrailerUrl(videoId);
        })
        .catch((error) => console.log(error));
    }
  };
  const opts = {
    //this is to means option the measeure are the size of the vidoe
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1, // it means autoplay is on
    },
  };
  return (
    <>
      <div className="row">
        <h1>{title}</h1>
        <div className="row__posters">
          {movie?.map((movie, index) => (
            <img
              onError={(e) => (e.target.style.display = "none")}
              onClick={
                () => handleClick(movie) // this will handle the movie
              }
              key={index}
              src={`${base_Url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.title}
              className={`row__poster ${isLargeRow && "row_posterLarge"}`} // it takes only if its large accordingly
            />
          ))}
        </div>
        <div style={{ padding: "20px" }}>
          {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
          {/* // if trailer url is there, play the video */}
        </div>
      </div>
    </>
  );
}

export default Rows;
