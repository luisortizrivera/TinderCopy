import React, { useEffect, useState, useContext } from "react";
import "../Styles/ProfileCard.css";
import { MainPageContext } from "../Context/MainPageContext";
import { handleOpenChat } from "../handlers/cardHandlers";
import { unmatchUser } from "../handlers/InteractionHandlers";

/**
 * Component that renders the matched profile card.
 */
const ProfileMatched = () => {
  const [matchedUser, setMatchedUser] = useState(null);
  const {
    showMatchedProfile,
    matches,
    setMatches,
    currentUser,
    setShowMatchedProfile,
    setShowChatBox,
  } = useContext(MainPageContext);

  /**
   * Sets the local matched user data when the showMatchedProfile trigger state changes.
   */
  useEffect(() => {
    setMatchedUser({
      user: showMatchedProfile.userMatchedData,
      profileImg: showMatchedProfile.userImage,
    });
  }, [showMatchedProfile]);

  return (
    <div className="profileCardContainer">
      {matchedUser ? (
        <div className="profileCard">
          <div className="profileImage">
            <img src={matchedUser.profileImg} alt="Random" />
          </div>
          <div className="profileName">
            <h3>{`${matchedUser.user.Name} ${matchedUser.user.Surname}`}</h3>
          </div>
          <div className="profileDescription">
            <p>{matchedUser.user.Bio}</p>
          </div>
          <div className="profileButtons">
            <button
              onClick={() => {
                handleOpenChat(
                  {
                    matches,
                    currentUser,
                    setShowMatchedProfile,
                    setShowChatBox,
                  },
                  matchedUser.user
                );
              }}
            >
              Open chat
            </button>
            <button
              className="unmatchButton"
              onClick={() =>
                unmatchUser(
                  matches,
                  setMatches,
                  currentUser,
                  matchedUser.user,
                  setShowMatchedProfile
                )
              }
            >
              Unmatch
            </button>
          </div>
        </div>
      ) : (
        <div className="profileEmptyCard">User not found</div>
      )}
    </div>
  );
};

export default ProfileMatched;
