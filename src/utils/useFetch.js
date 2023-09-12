import { useEffect, useState } from "react";

function useFetch(requests) {
  const [movie, setMovie] = useState([]);

  useEffect(
    () => {
      fetchData();
    },
    requests ? [requests] : []
  );
  async function fetchData() {
    const request = await fetch("https://api.themoviedb.org/3" + requests);
    const data = await request.json();
    setMovie(data.results);
    return request;
  }

  return movie;
}

export default useFetch;
