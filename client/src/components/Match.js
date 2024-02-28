import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
const Match = (props) => {
  const { name, id, image } = props;

  return (
    <div>
      <Card>
        <Card.Body className="d-flex" style={{ padding: 0 }}>
          <div
            className="matchActions"
            style={{
              width: "50%",
              float: "left",
              padding: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Button style={{ marginBottom: "2px" }}>{name}</Button>
            <Button>Open Chat</Button>
          </div>
          <div
            className="matchImage"
            style={{
              width: "50%",
              float: "right",
              padding: 0,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card.Img
              variant="right"
              src={image}
              style={{ objectFit: "cover", width: "auto", height: "78px" }}
              //   width={"20px"}
              //   height={"20px"}
            />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
export default Match;
