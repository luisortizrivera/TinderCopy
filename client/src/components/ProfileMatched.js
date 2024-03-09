import React, { useEffect, useState } from "react";
import "../Styles/ProfileCard.css";
// import { handleInteraction } from "../handlers/InteractionHandlers";

const ProfileMatched = (props) => {
  const [matchedUser, setMatchedUser] = useState(null);

  const handleUnmatch = async (matchedUser) => {
    try {
      const response = await fetch("/api/matches/unmatch", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify({
          matchedUser: matchedUser,
        }),
      });
      if (response.ok) {
        props.fetchMatches();
        props.fetchUserData();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    setMatchedUser({
      user: props.showMatchedProfile.userMatchedData,
      profileImg: props.showMatchedProfile.userImage,
    });
  }, [props.showMatchedProfile]);

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
            // onClick={() =>
            //   handleInteraction({
            //     interaction: "dislike",
            //     currentUser: props.currentUser,
            //     matchedUser: matchedUser,
            //     fetchUserData: fetchUserData,
            //     fetchMatches: props.fetchMatches,
            //   })
            // }
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
