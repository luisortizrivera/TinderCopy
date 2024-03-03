import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
const UserMatchCard = (props) => {
  const { name, image, handleOpenChat } = props;

  return (
    <div>
      <Card style={{ height: "100px" }}>
        <Card.Body className="d-flex p-0 h-100 justify-content-between">
          <div
            className="matchActions d-flex flex-column justify-content-center"
            style={{ height: "100%", width: "49%" }}
          >
            <Button style={{ marginBottom: "2px", height: "100%" }}>
              {name}
            </Button>
            <Button style={{ height: "100%" }} onClick={handleOpenChat}>
              Open Chat
            </Button>
          </div>
          <div
            className="matchImage d-flex justify-content-center"
            style={{ height: "100%", width: "49%" }}
          >
            <Card.Img
              variant="right"
              src={image}
              style={{ objectFit: "cover", height: "100%", width: "100%" }}
            />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
export default UserMatchCard;
