import React from "react";
import Nav from "../Nav/Nav";
import Banner from "../Banner/Banner";
import { categoryRows } from "../../utils/helper";
import Row from "../Row/Rows";


function HomeScreen() {
  return (
    <div className="homeScreen">
      <Nav />
      <Banner />
      {categoryRows.map((row) => (

        <Row 
        key = {row.title}
        title ={row.title}
        fetchUrl = {row.fetchUrl}
        />
      )
      )}
    </div>
  );
}

export default HomeScreen;
