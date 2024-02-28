import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Match from "./Match";

const Chats = () => {
  const [chats, setChats] = useState([]);
  function getChats() {
    fetch("/api/chats", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("auth_token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setChats(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div
      className="chatAccordion"
      style={{
        width: "30%",
        height: "100%",
        float: "right",
        display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
      }}
    >
      <Accordion defaultActiveKey="0" style={{ width: "100%" }}>
        <Accordion.Item eventKey="0">
          <Accordion.Header> Your Matches</Accordion.Header>
          <Accordion.Body style={{ padding: 0 }}>
            <Match
              name="Doctor Johnson"
              id="123"
              image={require("../testingImages/doctor.jpg")}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
export default Chats;
