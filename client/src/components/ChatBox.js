import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../Styles/ChatBox.css";

const ChatBox = (props) => {
  const { currentUser, userName, userSurname, chatId } = props;
  ChatBox.propTypes = {
    currentUser: PropTypes.object.isRequired,
    userName: PropTypes.string.isRequired,
    userSurname: PropTypes.string.isRequired,
    chatId: PropTypes.string.isRequired,
  };
  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");

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

  useEffect(() => {
    fetchChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div className="chatBoxContainer">
      <div className="chatBox">
        <div className="chatHeader">
          <h3>{`${userName} ${userSurname}`}</h3>
          <button className="refreshButton" onClick={fetchChat}>
            Refresh
          </button>
        </div>
        <div className="chatMessages">
          {messages?.map((message) => (
            <div
              key={`message-${message._id}`}
              className={`chatMessage ${
                message.senderID === currentUser?._id ? "sent" : "received"
              }`}
            >
              {message.content}
            </div>
          ))}
        </div>
        <div className="chatInput">
          <form id="newMessageForm" onSubmit={handleSend}>
            <textarea
              rows="3"
              placeholder="Type here..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
          </form>
        </div>
        <div className="chatButton">
          <button type="submit" form="newMessageForm">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
