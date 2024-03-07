import React from "react";
import "../Styles/MatchCard.css";
const UserMatchCard = (props) => {
  const { name, _id, surname, image, handleOpenChat } = props;

  return (
    <div className="matchCardListContainer">
      <div className="matchCardButtonContainer">
        <button>{name}</button>
        <button onClick={() => handleOpenChat({ name, surname, _id })}>
          Open Chat
        </button>
      </div>
      <img className="image" src={image} alt="centered_image" />
    </div>
  );
};
export default UserMatchCard;
