import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom"
import "./Nav.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LogoutIcon from "@mui/icons-material/Logout";
import { auth } from "../../firebase";
import { Avatar } from "@mui/material";

function Nav() {
  const [show, handleShow] = useState(false);
  const [open , SetOpen] = useState(false);

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      // Use window.scrollY instead of window.screenY
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);

const toggleMenu =()=>{
  SetOpen(!open)
}

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <div className="nav__contents">
        <Link to={"/"}>
          <img
            className="nav__logo" // Use className instead of class
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
            alt="Netflix"
          />
        </Link>
        <div className="nav__avatar">
          <div className="nav__avatarContent">
            <Avatar
              src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png"
              sx={{ width: 38, objectFit: "contain" }}
              variant="square"
              onClick={toggleMenu}
            />
            <ArrowDropDownIcon className="nav__dropDown" onClick={toggleMenu} />
          </div>

          {open && (
            <div className="menu">
              <div className="menu__Items">
                <ul className="menu__list">
                  <Link to={"/mylist"}>
                    <li>Mylist</li>
                  </Link>
                  <li onClick={() => auth.signOut()}>
                    Logout <LogoutIcon className="LogoutIcon" />
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;
