import React, { useState, useEffect } from "react";
import "../Styles/ChatPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Profile from "../components/Profile";
import Matches from "../components/Matches";

const ChatPage = () => {
  const [matches, setMatches] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const fetchMatches = async () => {
    try {
      const response = await fetch("/api/matches/getUserMatches", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
      const data = await response.json();
      setCurrentUser(data.currentUser);
      setMatches(data.matches);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchMatches();
  }, []);

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
      {currentUser && <Profile currentUser={currentUser} fetchMatches={fetchMatches} />}
      {currentUser && <Matches currentUser={currentUser} matches={matches} />}
    </div>
  );
};

export default ChatPage;
