import React from 'react'
import "./MyList.css"
import Nav from '../Nav/Nav'
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import SavedShows from '../savedShows/SavedShows';
import {  useNavigate } from 'react-router-dom';

function MyList() {
  const navigate = useNavigate();
  
  return (
    <>
      <div className="my-shows-container">
        <Nav />
        <KeyboardBackspaceIcon onClick={() => navigate(-1)} className="back" />
        <img
          className="cover-image"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="/"
        />
        <div className="overlay"></div>
        <div className="content">
          <h1 className="title">My Shows</h1>
        </div>
        <div className="list__grid">
          <SavedShows />
        </div>
      </div>
    </>
  );
}
export default MyList