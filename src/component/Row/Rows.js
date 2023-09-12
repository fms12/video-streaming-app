import React from "react";
import useFetch from "../../utils/useFetch";
import "./Rows.css";
import Cards from "../Card/Cards";


function Rows({ title, fetchUrl, isLargeRow }) {
  const movies = useFetch(fetchUrl);
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <Cards data={movie} key = {movie.id} value={isLargeRow} />
        ))}
      </div>
    </div>
  );
}

export default Rows;
