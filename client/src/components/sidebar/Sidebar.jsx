import "./sidebar.css";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@material-ui/icons";
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";
import { NFTE } from "@nfte/react";

export default function Sidebar({user}) {
  const HomeSidebar = () => {
    return (
      <>
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Explore</span>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
        </ul>
        {/* <button className="sidebarButton">Show More</button> */}
        {/* <hr className="sidebarHr" /> */}
        {/* <ul className="sidebarFriendList">
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul> */}
      </>
    );
    
  };

  const ProfileSidebar = () => {
    return (
      <>
        <h4 className="sidebarCollectionTitle">Collection</h4>
        <div className="sidebarCollection">
          <NFTE contract="0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0" tokenId="18552" />
          <NFTE contract="0x3b3ee1931dc30c1957379fac9aba94d1c48a5405" tokenId="387" />
          <NFTE contract="0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0" tokenId="18552" />
        </div>
      </>
    );
  };

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        {user ? <ProfileSidebar /> : <HomeSidebar />}
      </div>
    </div>
  );
}
