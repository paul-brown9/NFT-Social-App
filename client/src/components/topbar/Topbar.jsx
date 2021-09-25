import "./topbar.css";
import { Search, Person, ChatOutlined } from "@material-ui/icons";
import NotificationsOutlinedIcon from "@material-ui/icons/NotificationsOutlined";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import { Menu, MenuItem, IconButton } from "@material-ui/core";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory();

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const handleProfile = () => {
    history.push("/profile/" + user.username);
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Ignite</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for an artist"
            className="searchInput"
            type="search"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <NotificationsOutlinedIcon />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <IconButton
          aria-label="more"
          onClick={handleClick}
          aria-haspopup="true"
          aria-controls="long-menu"
        >
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </IconButton>
        <Menu anchorEl={anchorEl} keepMounted onClose={handleClose} open={open}>
          <MenuItem onClick={handleProfile}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
}
