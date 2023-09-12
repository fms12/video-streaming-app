import React from "react";
import { useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();
  return (
    <div class="text">
      <h1>{error.status}</h1>
      <h2>Uh, Ohh</h2>
      <h3>
       {error.statusText}
      </h3>
    </div>
  );
}

export default Error;
