import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
const UserMatchCard = (props) => {
  const { name, _id, surname, image, handleOpenChat } = props;

  return (
    <div>
      <Card style={{ height: "100px" }}>
        <Card.Body className="d-flex p-0 h-100 justify-content-between">
          <div
            className="matchActions d-flex flex-column justify-content-center h-100"
            style={{ width: "49%" }}
          >
            <Button className="mb-1 h-100">{name}</Button>
            <Button className="h-100" onClick={() => handleOpenChat({name, surname, _id})}>
              Open Chat
            </Button>
          </div>
          <div
            className="matchImage d-flex justify-content-center h-100"
            style={{ width: "49%" }}
          >
            <Card.Img
              variant="right"
              src={image}
              className="w-100 h-100"
              style={{ objectFit: "cover" }}
            />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
export default UserMatchCard;
