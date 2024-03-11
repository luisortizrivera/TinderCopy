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

  useEffect(() => {
    fetchMatches();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              <Nav.Link href="#pricing">My Profile</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div
        className="chatPage"
        style={{
          display: "grid",
          gridTemplateColumns: "80% 20%",
          height: "100%",
          width: "100%",
          margin: 0,
        }}
      >
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
    </>
  );
};

export default ChatPage;
