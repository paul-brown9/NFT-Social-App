import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [followers, setFollowers] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.following.includes(user?._id)
  );
  useEffect(() => {
    setFollowed(currentUser.following.includes(user?._id));
  });

  useEffect(() => {
    const getFollowers = async () => {
      try {
        const followerList = await axios.get("/users/followers/" + user._id);
        setFollowers(followerList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFollowers();
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
      const followerList = await axios.get("/users/followers/" + user._id);
      setFollowers(followerList.data);
    } catch (err) {
      console.log(err);
    }
  };

  const HomeRightbar = () => {
    return (
      <>
        {/* <img className="rightbarAd" src="assets/ad.png" alt="" /> */}
        <h4 className="rightbarHomeTitle">Who to follow</h4>
        <ul className="rightbarFollowerList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarFollowerTitle">
          <span className="rightbarFollowerCount">{followers.length}</span>
          {followers.length === 1 ? ' Follower' : ' Followers'} 
        </h4>
        <div className="rightbarFollowers">
          {followers.map((follower) => (
            <Link
              to={"/profile/" + follower.username}
              style={{ textDecoration: "none", fontSize: "20px", textAlign: "center" }}
            >
              <div className="rightbarFollower">
                <img
                  src={
                    follower.profilePicture
                      ? PF + follower.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowerImg"
                />
                <span className="rightbarFollowerName">@{follower.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
