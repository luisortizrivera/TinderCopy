import React, { useEffect, useState, useContext } from "react";
import "../Styles/ProfileCard.css";
import { MainPageContext } from "../Context/MainPageContext";
import { handleOpenChat } from "../handlers/cardHandlers";
const ProfileMatched = () => {
  const [matchedUser, setMatchedUser] = useState(null);
  const {
    showMatchedProfile,
    matches,
    currentUser,
    setShowMatchedProfile,
    setShowChatBox,
  } = useContext(MainPageContext);

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
            <p>
              {matchedUser.user.Bio}
              {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequatliquip ex ea */}
            </p>
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
              // onClick={() =>
              //   handleInteraction({
              //     interaction: "like",
              //     currentUser: props.currentUser,
              //     matchedUser: matchedUser,
              //     fetchUserData: fetchUserData,
              //     fetchMatches: props.fetchMatches,
              //   })
              // }
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
