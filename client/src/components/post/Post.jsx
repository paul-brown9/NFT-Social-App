import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Menu, MenuItem, IconButton } from "@material-ui/core";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes])

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    }
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id })
    } catch (err) {
      console.log(err);
    }
    setLike(isLiked ? like - 1 : like + 1)
    setIsLiked(!isLiked)
  };

  const vertHandler = (event) =>{
    setAnchorEl(event.currentTarget);
  }

  const vertCloseHandler = () => {
    setAnchorEl(null);
  }

  const vertDeleteHandler = async () => {
    try{
      console.log("delete post");
    } catch(err){
      console.log(err);
    }
  }
  const vertReportHandler = async () => {
    try{
      console.log("report post");
    } catch(err){
      console.log(err);
    }
  }

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"}
                alt=""
              />
            </Link>
            <span className="postUsername">
              {user.username}
            </span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <IconButton
              aria-label="more"
              onClick={vertHandler}
              aria-haspopup="true"
              aria-controls="long-menu" >
              <MoreVert />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              keepMounted onClose={vertCloseHandler}
              open={open}>
              {currentUser._id === post.userId ? <MenuItem onClick={vertDeleteHandler}>Delete post</MenuItem> : null}
              {currentUser._id !== post.userId ? <MenuItem onClick={vertReportHandler}>Report post</MenuItem> : null}
            </Menu>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={post.img ? PF + post.img : ""} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={`${PF}like.png`} onClick={likeHandler} alt="" />
            <img className="likeIcon" src={`${PF}heart.png`} onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
