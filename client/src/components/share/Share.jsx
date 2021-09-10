import "./share.css";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@material-ui/icons";
import { TextField } from "@material-ui/core";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Web3 from "web3";
import Web3Modal from "web3modal";

export default function Share() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);
  const [nftContract, setNFTContract] = useState(null);
  const [nftTokenId, setNFTTokenId] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const submitNFTHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
          <input
            placeholder={"What's on your mind " + user.username + "?"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            {/* <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png, .jpeg, .jpg, .gif"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label> */}
            {/* <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">NFT</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div> */}
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
        <div className="shareOption">
          <span className="shareOptionText">Find an NFT:</span>
          <form
            className="shareNFT"
            noValidate
            autoComplete="off"
            onSubmit={submitNFTHandler}
          >
            <TextField
              value={nftContract}
              id="outlined-basic"
              size="small"
              margin="dense"
              label="Contract address"
              variant="outlined"
            />
            <TextField
              value={nftTokenId}
              id="outlined-basic"
              size="small"
              margin="dense"
              label="Token ID"
              variant="outlined"
            />
            <button className="shareFindButton" type="submit">
              Find
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
