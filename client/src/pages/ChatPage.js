import React, { useEffect, useContext } from "react";
import "../Styles/ChatPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Profile from "../components/Profile";
import ProfileMatched from "../components/ProfileMatched";
import ChatBox from "../components/ChatBox";
import Matches from "../components/Matches";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { MainPageContext } from "../Context/MainPageContext";

const ChatPage = () => {
  const {
    currentUser,
    fetchMatches,
    showChatBox,
    setShowChatBox,
    showMatchedProfile,
    setShowMatchedProfile,
  } = useContext(MainPageContext);

  /**
   * Loads the user's matches when the component mounts.
   */
  useEffect(() => {
    fetchMatches();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="chatPage">
      <Navbar
        fixed="top"
        collapseOnSelect
        expand="lg"
        className="myNavbar d-flex bg-body-tertiary rounded"
        style={{ left: 0, right: "auto" }}
      >
        <Container style={{ paddingLeft: "10px", paddingRight: "10px" }}>
          <Navbar.Brand>FLAM-E</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                onClick={() => {
                  setShowChatBox(null);
                  setShowMatchedProfile(null);
                }}
              >
                Swipe
              </Nav.Link>
              <Nav.Link
                id="logoutButton"
                href="/"
                onClick={() => localStorage.removeItem("auth_token")}
              >
                Log out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {currentUser && !showChatBox && !showMatchedProfile && <Profile />}
      {currentUser && showMatchedProfile && <ProfileMatched />}
      {currentUser && showChatBox && (
        <ChatBox
          userName={showChatBox.name}
          userSurname={showChatBox.surname}
          chatId={showChatBox.matchId}
        />
      )}
      {currentUser && (
        <Matches
          setShowChatBox={setShowChatBox}
          setShowMatchedProfile={setShowMatchedProfile}
        />
      )}
    </div>
  );
};

export default ChatPage;
