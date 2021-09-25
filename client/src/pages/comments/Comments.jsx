import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";

export default function Comments() {
  return (
    <>
      <Topbar />
      <div className="comments">
        <Sidebar />
      </div>
    </>
  );
}
