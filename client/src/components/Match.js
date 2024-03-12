import React, { useContext } from "react";
import "../Styles/MatchCard.css";
import { MainPageContext } from "../Context/MainPageContext";
const UserMatchCard = (props) => {
  const { matchedUser, handleOpenChat, handleOpenProfile } = props;
  const { setTargetUser } = useContext(MainPageContext);
  return (
    <div className="matchCardListContainer">
      <div className="matchCardButtonContainer">
        <button
          onClick={() => {
            setTargetUser(matchedUser);
            handleOpenProfile(matchedUser);
          }}
        >
          {matchedUser.userMatchedData.Name}
        </button>
        <button
          onClick={() => {
            setTargetUser(matchedUser);
            handleOpenChat(matchedUser);
          }}
        >
          Open Chat
        </button>
      </div>
      <img className="image" src={matchedUser.userImage} alt="centered_image" />
    </div>
  );
};
export default UserMatchCard;
