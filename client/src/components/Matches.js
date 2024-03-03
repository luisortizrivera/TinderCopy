import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import UserMatchCard from "./Match";
const uuid = require("uuid");

const Matches = (props) => {
  // const [chats, setChats] = useState([]);
  const [usersWithMatches, setUsersWithMatches] = useState([]);
  function handleOpenChat() {
    console.log("Open Chat");
  }

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
            (user) => user._id === userMatchedID
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
      }}
    >
      <Accordion defaultActiveKey="0" style={{ width: "100%" }}>
        <Accordion.Item eventKey="0">
          <Accordion.Header> Your Matches</Accordion.Header>
          <Accordion.Body style={{ padding: 0, textAlign: "center" }}>
            {usersWithMatches.length > 0
              ? usersWithMatches.map((user) => (
                  <UserMatchCard
                    key={uuid.v4()}
                    name={`${user.userMatchedData.name} ${user.userMatchedData.surname}`}
                    image={user.userImage}
                    handleOpenChat={handleOpenChat}
                  />
                ))
              : "You have no matches"}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
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
    newUsersWithMatches.push({ userMatchedData, userImage });
  } catch (error) {
    console.error("Error:", error);
  }
}
