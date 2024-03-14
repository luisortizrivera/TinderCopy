import React, { useState, useEffect, useContext } from "react";
import Accordion from "react-bootstrap/Accordion";
import UserMatchCard from "./Match";
import Pagination from "react-bootstrap/Pagination";
import { handleOpenChat, handleOpenProfile } from "../handlers/cardHandlers";
import { MainPageContext } from "../Context/MainPageContext";
const uuid = require("uuid");

/**
 * Renders the user's matches into an accordion component.
 *
 * @param {*} props  showChatBox and setShowMatchedProfile trigger states
 */
const Matches = (props) => {
  const {
    currentUser,
    matches,
    matchedUsersData,
    setMatchedUsersData,
    fetchUserImage,
  } = useContext(MainPageContext);
  const { setShowChatBox, setShowMatchedProfile } = props;
  const [activeKey, setActiveKey] = useState(
    window.innerWidth >= 500 ? "0" : null
  );

  /**
   * Sets the active key of the accordion based on the window width.
   * If the window width is greater than 500px, the active key is set to "0" and the accordion is expanded by default.
   * If the window width is less than 500px, the active key is set to null and the accordion is collapsed by default.
   */
  useEffect(() => {
    const handleResize = () => {
      setActiveKey(window.innerWidth >= 500 ? "0" : null);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //#region Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = matchedUsersData.slice(
    indexOfFirstUser,
    indexOfLastUser
  );
  let active = currentPage;
  let items = Array.from(
    { length: Math.ceil(matchedUsersData.length / usersPerPage) },
    (_, number) => (
      <Pagination.Item
        key={number + 1}
        active={number + 1 === active}
        onClick={() => setCurrentPage(number + 1)}
      >
        {number + 1}
      </Pagination.Item>
    )
  );
  //#endregion

  /**
   *  Gets the user data and image from the server and adds it to the matchedUsersData state array
   */
  const getUserData = async (userMatchedID, newUsersWithMatches) => {
    try {
      const userMatchedDataresponse = await fetch(
        `/api/user/getUser/${userMatchedID}`
      );
      const userMatchedData = await userMatchedDataresponse.json();
      const userImage = await fetchUserImage(userMatchedID);
      newUsersWithMatches.push({
        userMatchedData: userMatchedData.user,
        userImage,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  /**
   * Forwards the matched user's data in addition to some other data
   * to the handleOpenChat function when the user clicks the open chat button.
   *
   * @param {*} matchedUser
   */
  const handleOpenChatFromMatches = (matchedUser) => {
    handleOpenChat(
      { matches, currentUser, setShowMatchedProfile, setShowChatBox },
      matchedUser.userMatchedData
    );
  };

  /**
   * Forwards the matched user's data in addition to some other data when the
   * user clicks the open profile button.
   *
   * @param {*} matchedUser
   */
  const handleOpenProfileFromMatches = (matchedUser) => {
    handleOpenProfile({ setShowMatchedProfile, setShowChatBox }, matchedUser);
  };

  /**
   * Fetches the matched user's data and image from the server and sets the matchedUsersData state array
   * when the matches state array changes.
   * It also checks if the user is already in the matchedUsersData state array before fetching the user's data.
   * If the user is already in the matchedUsersData state array, it adds the user to the newUsersWithMatches array.
   * If the user is not in the matchedUsersData state array, it fetches the user's data and image from the server.
   */
  useEffect(() => {
    const fetchData = async () => {
      if (matches.length > 0) {
        const newUsersWithMatches = [];
        for (const match of matches) {
          const userMatchedID =
            match.userID1 !== currentUser._id ? match.userID1 : match.userID2;
          const existingUser = matchedUsersData.find(
            (user) => user.userMatchedData._id === userMatchedID
          );
          if (existingUser) newUsersWithMatches.push(existingUser);
          else await getUserData(userMatchedID, newUsersWithMatches);
        }
        setMatchedUsersData(newUsersWithMatches);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matches, currentUser._id]);

  return (
    <div
      className="chatAccordion"
      style={{
        height: "100%",
        alignItems: "flex-end",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Accordion
        defaultActiveKey={activeKey}
        style={{ width: "100%", maxWidth: "400px", marginBottom: "3px" }}
      >
        <Accordion.Item eventKey="0">
          <Accordion.Header> Your Matches</Accordion.Header>
          <Accordion.Body
            style={{ padding: 0, textAlign: "center", width: "100%" }}
          >
            {currentUsers.length > 0
              ? currentUsers.map((user) => {
                  return (
                    <UserMatchCard
                      key={uuid.v4()}
                      matchedUser={user}
                      handleOpenChat={handleOpenChatFromMatches}
                      handleOpenProfile={handleOpenProfileFromMatches}
                    />
                  );
                })
              : "You have no matches"}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Pagination>{items}</Pagination>
    </div>
  );
};
export default Matches;
