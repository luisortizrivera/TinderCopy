import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import "bootstrap/dist/css/bootstrap.min.css";

function ChatCard({ messages }) {
  return (
    <Card style={{ width: "18rem", height: "30rem", overflow: "auto" }}>
      <Card.Body>
        <Card.Title>Chat</Card.Title>
        <ListGroup variant="flush">
          {messages.map((message, index) => (
            <ListGroup.Item
              key={index}
              className={message.user === "user1" ? "text-left" : "text-right"}
            >
              <strong>{message.user}</strong>: {message.text} <br />
              <small>{new Date(message.timestamp).toLocaleString()}</small>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default ChatCard;
