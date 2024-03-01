import React from "react";
import "../Styles/ChatPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Profile from "../components/Profile";
// import Matches from "../components/Matches";

const ChatPage = () => {
  return (
    <div
      className="chatPage"
      style={{
        display: "grid",
        gridTemplateColumns: "70% 30%",
        height: "100vh",
        width: "100vw",
        overflow: "auto",
        margin: 0,
      }}
    >
      <Profile />
      {/* <Matches /> */}
    </div>
  );
};

export default ChatPage;
