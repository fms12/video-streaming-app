import React, { useRef, useState } from "react";
import "./VideoPlayer.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import Forward5Icon from "@mui/icons-material/Forward5";
import { useNavigate } from "react-router-dom";

const video = "https://d2a4ei7putoo8k.cloudfront.net/video.mp4";

function VideoPlayer() {
  const navigate = useNavigate();
  const videoRef= useRef(null)
  const [isHovered, setIsHovered] = useState(false);
 const handleSkipBack =()=>{
  const currentTime = videoRef.current.currentTime;
  videoRef.current.currentTime = Math.max(0, currentTime - 5);
 }
 const handleSkipForward = () => {
   const currentTime = videoRef.current.currentTime;
   videoRef.current.currentTime = Math.min(
     videoRef.current.duration,
     currentTime + 5
   ); 
 };

  return (
    <div
      className="player"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <KeyboardBackspaceIcon onClick={() => navigate(-1)} className="back" />

      {isHovered && (
        <div className="player__icons">
          <SkipPreviousIcon
            className="player__skipIcon"
            onClick={handleSkipBack}
          />
          <Forward5Icon
            className="player__skipIcon"
            onClick={handleSkipForward}
          />
        </div>
      )}
      <video ref={videoRef} src={video} autoPlay loop controls muted />
    </div>
  );
}

export default VideoPlayer;
