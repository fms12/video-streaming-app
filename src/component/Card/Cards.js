import React, {useState } from "react";
import "./Card.css";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import Tooltip from "@mui/material/Tooltip";
import DoneIcon from "@mui/icons-material/Done";
import { Link } from "react-router-dom";
import {useSelector } from "react-redux";
import { selectUser } from "../../utils/userSlice";
import {db} from "../../firebase"
import { arrayUnion,doc,updateDoc } from "firebase/firestore";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";


const baseImgUrl = "https://image.tmdb.org/t/p/original";

function Cards({ data, isLargeRow}) {
  // console.log(data);
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false); // Track tapping state
  const [isLiked ,setIsLiked]  = useState(false);
 const [snackbarOpen, setSnackbarOpen] = useState(false);
   const user = useSelector(selectUser);

  const handleCardTap = () => {
    setIsTapped(!isTapped);
  };

  // const movieIdsInList = useSelector((store) => store.list.movieIdsInList);
 const movieID = doc(db, "user", user?.email);

  // const dispatch = useDispatch();
const addMovieToFirestore = async (movie) => {
  setIsLiked(!isLiked);
   await updateDoc(movieID, {
     savedShows: arrayUnion(movie),
   });
setSnackbarOpen(true);
};



  const trailer =
    "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";
  return (
    <div
      className={`card__poster ${isTapped ? "tapped" : ""} `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardTap}
    >
      {data.backdrop_path !== null && (
        <Tooltip title="click">
          <img
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${baseImgUrl}${
              isLargeRow ? data.poster_path : data.backdrop_path
            }`}
            alt={data.name}
          />
        </Tooltip>
      )}

      {isHovered && (
        <div className="card__hover">
          <div className="card__videoContainer">
            <video src={trailer} autoPlay={true} loop muted />
          </div>
          <div className="card__infoContainer">
            <h3>{data?.title || data?.name || data?.original_name}</h3>
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

                {isLiked ? (
                  <DoneIcon />
                ) : (
                  <Tooltip title="Add">
                    <AddIcon onClick={() => addMovieToFirestore(data)} />
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <Snackbar
        direction="right"
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)} // Close the Snackbar when it's clicked away
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Movie added to your list!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Cards;
