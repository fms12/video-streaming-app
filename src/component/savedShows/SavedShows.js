import React, { useEffect, useState } from "react";
import "./SavedShows.css";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import Tooltip from "@mui/material/Tooltip";
import DoneIcon from "@mui/icons-material/Done";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../utils/userSlice";
import { db } from "../../firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";

const baseImgUrl = "https://image.tmdb.org/t/p/original";

function SavedShows({ isLargeRow }) {
  const [isTapped, setIsTapped] = useState(false);
  const user = useSelector(selectUser);
  const movieID = doc(db, "user", `${user?.email}`);
  const [movie, setMovie] = useState([]);
  const [isHovered, setIsHovered] = useState(null); // Track the hovered item

useEffect(() => {
  // Subscribe to changes in the user's savedShows collection
  const unsubscribe = onSnapshot(doc(db, "user", `${user?.email}`), (doc) => {
    setMovie(doc.data()?.savedShows || []);
  });

  // Clean up the subscription when the component unmounts
  return () => unsubscribe();
}, [user?.email]);


  const handleCardTap = () => {
    setIsTapped(!isTapped);
  };

 const handleMouseEnter = (item) => {
   setIsHovered(item);
 };

 const handleMouseLeave = () => {
   setIsHovered(null);
 };

  const deleteShow = async (passedID) => {
    try {
      const result = movie.filter((item) => item.id !== passedID);
      await updateDoc(movieID, {
        savedShows: result,
      });
    } catch (error) {
      // Handle errors
      console.log(error)
    }
  };

  const trailer =
    "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";

  return (
    <>
      {movie.map((item) => (
        <div
          className={`card__poster ${isTapped ? "tapped" : ""}
           `}
          onMouseEnter={()=> handleMouseEnter(item)}
          onMouseLeave={handleMouseLeave}
          onClick={handleCardTap}
          key = {item.id}
        >
          {item?.backdrop_path !== null && (
            <img
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={`${baseImgUrl}${
                isLargeRow ? item?.poster_path : item?.backdrop_path
              }`}
              alt={item?.name}
            />
          )}

          {isHovered  === item && (
            <div className="card__hover">
              <div className="card__videoContainer">
                <video src={trailer} autoPlay={true} loop muted />
              </div>
              <div className="card__infoContainer">
                <h3>{item?.title || item?.name || item?.original_name}</h3>
                <div className="card__icons">
                  <div className="card__controls">
                    <Link to={"/player"}>
                      <Tooltip title="Play">
                        <PlayCircleOutlineIcon className="icon" />
                      </Tooltip>
                    </Link>
                    <Tooltip title="Like">
                      <ThumbUpOffAltIcon />
                    </Tooltip>

                    <Tooltip title="remove">
                      <DoneIcon onClick = {()=>deleteShow(item.id)} />
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
}

export default SavedShows;
