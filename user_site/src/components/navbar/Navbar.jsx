import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import HomeIcon from "@mui/icons-material/Home";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import "./navbar.scss";
import { hallName } from "./NavBarData";

import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  let user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  //const history = useHistory();

  function logOut() {
    localStorage.clear();

    navigate("/login");
    //history.push("/login");
  }
  //const { dispatch } = useContext(DarkModeContext);
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <div className="title">{hallName}</div>
          <div className="item">
            <HomeIcon className="icon" />
            Home
          </div>
          <div className="item">
            <PermContactCalendarIcon className="icon" />
            User Manual
          </div>
          <div className="item">
            <IntegrationInstructionsIcon className="icon" />
            Instructions
          </div>
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              //onClick={() => dispatch({ type: "TOGGLE" })}
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
            <div className="notifications">
              <div className="wrapper">Notifications</div>
              <div className="wrapper">
                <button variant="contained">All</button>
                <button variant="contained">Unseen</button>
              </div>
              <div className="notifItem">notifications 1</div>
              <div className="notifItem">notifications 2</div>
              <div className="notifItem">notifications 3</div>
              <div className="notifItem">notifications 4</div>
            </div>
          </div>
          <div className="item">
          
            <img

            src={
                user
                    ? user.img
                    : "https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                }
             
              //src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
          </div>
          <div className="item">
            {/* {user && user.username+" "} */}
            <LogoutIcon className="icon" onClick={logOut} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
