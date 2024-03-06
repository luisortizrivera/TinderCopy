import React, { useState, useEffect } from "react";
import "../Styles/ChatPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Profile from "../components/Profile";
import ChatBox from "../components/ChatBox";
import Matches from "../components/Matches";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const ChatPage = () => {
  const [matches, setMatches] = useState([]);
  const [showChatBox, setShowChatBox] = useState(null);
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
    <>
      <Navbar
        fixed="top"
        collapseOnSelect
        expand="lg"
        className=" d-flex bg-body-tertiary rounded"
        style={{ left: 0, right: "auto" }}
      >
        <Container>
          <Navbar.Brand>FLAM-E</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => setShowChatBox(null)}>Swipe</Nav.Link>
              <Nav.Link href="#pricing">My Profile</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div
        className="chatPage"
        style={{
          display: "grid",
          gridTemplateColumns: "70% 30%",
          height: "100vh",
          width: "100vw",
          margin: 0,
        }}
      >
        {currentUser && !showChatBox && (
          <Profile currentUser={currentUser} fetchMatches={fetchMatches} />
        )}
        {currentUser && showChatBox && (
          <ChatBox
            currentUser={currentUser}
            userName={showChatBox.name}
            userSurname={showChatBox.surname}
            chatId={showChatBox.matchId}
          />
        )}
        {currentUser && (
          <Matches
            currentUser={currentUser}
            matches={matches}
            setShowChatBox={setShowChatBox}
          />
        )}
      </div>
    </>
  );
};

export default ChatPage;
