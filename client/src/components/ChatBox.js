import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const ChatBox = (props) => {
  const { currentUser, userName, userSurname, chatId } = props;
  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const chatResponse = await fetch(`/api/chats/getChat/${chatId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        });
        const chat = await chatResponse.json();
        setChat(chat);
      } catch (error) {
        console.error("Error fetching chat:", error);
      }
    };

    fetchChat();
  }, [currentUser, chatId]);

  useEffect(() => {
    if (chat) setMessages(chat.messages);
  }, [chat]);

  const handleSend = async (event) => {
    event.preventDefault();

    if (newMessage.trim() !== "") {
      try {
        console.log("Sending message:", newMessage);
        const updatedChatResponse = await fetch(`/api/chats/addMessage`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chatId,
            content: newMessage,
          }),
        });
        console.log("Updated chat response:", updatedChatResponse);
        const updatedChat = await updatedChatResponse.json();
        console.log("Updated chat:", updatedChat);
        setMessages(updatedChat.messages);
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div
      className="profileCard"
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card style={{ height: "70%", width: "70%", margin: "auto" }}>
        <Card.Header className="text-center">{`${userName} ${userSurname}`}</Card.Header>
        <Card.Body className="d-flex flex-column overflow-auto">
          {messages &&
            messages.map((message, index) => (
              <div
                key={index}
                className={`d-flex ${
                  message.senderID === currentUser._id
                    ? "justify-content-end"
                    : "justify-content-start"
                }`}
              >
                <Card
                  className="m-1 d-inline-block"
                  style={{
                    backgroundColor:
                      message.senderID === currentUser._id
                        ? "#25D366"
                        : "#2AABEE",
                    maxWidth: "70%",
                  }}
                >
                  <Card.Body
                    className="text-white"
                    style={{
                      paddingTop: "0.5rem",
                      paddingBottom: "0.5rem",
                      textAlign:
                        message.senderID === currentUser._id ? "right" : "left",
                    }}
                  >
                    {message.content}
                  </Card.Body>
                </Card>
              </div>
            ))}
        </Card.Body>
        <Card.Footer>
          <Form className="d-flex flex-column gap-2" onSubmit={handleSend}>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Type here..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <Button className="w-100" variant="primary" type="submit">
              Send
            </Button>
          </Form>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default ChatBox;
