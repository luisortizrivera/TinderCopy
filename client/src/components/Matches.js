import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import UserMatchCard from "./Match";
import Pagination from "react-bootstrap/Pagination";
const uuid = require("uuid");

const Matches = (props) => {
  const [usersWithMatches, setUsersWithMatches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = usersWithMatches.slice(
    indexOfFirstUser,
    indexOfLastUser
  );
  let active = currentPage;
  let items = Array.from(
    { length: Math.ceil(usersWithMatches.length / usersPerPage) },
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

  const handleOpenChat = async (userMatchedData) => {
    try {
      const match = props.matches.find((match) => {
        return (
          (match.userID1 === props.currentUser._id &&
            match.userID2 === userMatchedData._id) ||
          (match.userID2 === props.currentUser._id &&
            match.userID1 === userMatchedData._id)
        );
      });

      if (match)
        props.setShowChatBox({
          name: userMatchedData.name,
          surname: userMatchedData.surname,
          matchId: match._id,
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (props.matches.length > 0) {
        const newUsersWithMatches = [];
        for (const match of props.matches) {
          const userMatchedID =
            match.userID1 !== props.currentUser._id
              ? match.userID1
              : match.userID2;
          const existingUser = usersWithMatches.find(
            (user) => user.userMatchedData._id === userMatchedID
          );
          if (existingUser) newUsersWithMatches.push(existingUser);
          else await getUserData(userMatchedID, newUsersWithMatches);
        }
        setUsersWithMatches(newUsersWithMatches);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.matches, props.currentUser._id]);

  return (
    <div
      className="chatAccordion"
      style={{
        height: "100%",
        float: "right",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Accordion
        defaultActiveKey="0"
        style={{ width: "100%", marginBottom: "3px" }}
      >
        <Accordion.Item eventKey="0">
          <Accordion.Header> Your Matches</Accordion.Header>
          <Accordion.Body
            style={{ padding: 0, textAlign: "center", width: "100%" }}
          >
            {currentUsers.length > 0
              ? currentUsers.map((user) => (
                  <UserMatchCard
                    key={uuid.v4()}
                    _id={user.userMatchedData._id}
                    name={`${user.userMatchedData.Name}`}
                    surname={`${user.userMatchedData.Surname}`}
                    image={user.userImage}
                    handleOpenChat={handleOpenChat}
                  />
                ))
              : "You have no matches"}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Pagination>{items}</Pagination>
    </div>
  );
};
export default Matches;

async function getUserData(userMatchedID, newUsersWithMatches) {
  try {
    const userMatchedDataresponse = await fetch(
      `/api/user/getUser/${userMatchedID}`
    );
    const userMatchedData = await userMatchedDataresponse.json();
    const userImageResponse = await fetch(
      `/api/user/getUserImage/${userMatchedID}`
    );
    const base64Image = await userImageResponse.text();
    const userImage = "data:image/jpeg;base64," + base64Image;
    newUsersWithMatches.push({
      userMatchedData: userMatchedData.user,
      userImage,
    });
  } catch (error) {
    console.error("Error:", error);
  }
}
