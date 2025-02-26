import axios from "../../Utils/axios";
import React, { useEffect, useState } from "react";
import requests from "../../Utils/requests";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState({});
  useEffect(() => {
    (async () => {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);
        console.log(request);
        setMovie(
          request.data.results[
            Math.floor(Math.random() * request.data.results.length)
          ]
        );
      } catch (error) {
        console.log(error);
      }
    })();
  }, []); //the array meanes dependency, it change the thumbnail when click it
  // console.log(movie);
  function truncate(str, n) {
    return str?.lenght > n ? str.substring(0, n - 1) + "..." : str;
  }

  return (
    <div
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
        backgroundRepeat: "no-repeat",
        // backgroundPosition: "center",
        //baseurl to fetch image from tmdb
      }}
    >
      <div className="banner_contents">
        <h1 className="banner-title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
      </div>
      <div className="banner_buttons">
        <button className="banner_button play">Play</button>
        <button className="banner_button">My List</button>
      </div>
      <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>

      <div className="banner_fadeBottom"></div>
    </div>
  );
}

export default Banner;
