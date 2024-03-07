import React, { useEffect, useState } from "react";
import "../Styles/ProfileCard.css";
import { handleInteraction } from "../handlers/InteractionHandlers";

const Profile = (props) => {
  const [randomUser, setRandomUser] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/user/getRandomUser", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });

      const userData = await response.json();
      if (userData) {
        const imageResponse = await fetch(
          "/api/user/getUserImage/" + userData._id
        );
        if (!imageResponse.ok) {
          throw new Error(`HTTP error! status: ${imageResponse.status}`);
        }
        const base64Image = await imageResponse.text();
        const imageUrl = "data:image/jpeg;base64," + base64Image;
        setRandomUser({
          user: userData,
          profileImg: imageUrl,
        });
      } else setRandomUser(null);
    } catch (error) {
      console.error("Error fetching random user:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="profileCardContainer">
      {randomUser ? (
        <div className="profileCard">
          <div className="profileImage">
            <img src={randomUser.profileImg} alt="Random" />
          </div>
          <div className="profileName">
            <h3>{`${randomUser.user.Name} ${randomUser.user.Surname}`}</h3>
          </div>
          <div className="profileDescription">
            <p>
              {randomUser.user.Bio}
              {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequatliquip ex ea */}
            </p>
          </div>
          <div className="profileButtons">
            <button
              onClick={() =>
                handleInteraction({
                  interaction: "dislike",
                  currentUser: props.currentUser,
                  randomUser: randomUser,
                  fetchUserData: fetchUserData,
                  fetchMatches: props.fetchMatches,
                })
              }
            >
              NOPE
            </button>
            <button
              onClick={() =>
                handleInteraction({
                  interaction: "like",
                  currentUser: props.currentUser,
                  randomUser: randomUser,
                  fetchUserData: fetchUserData,
                  fetchMatches: props.fetchMatches,
                })
              }
            >
              YES
            </button>
          </div>
        </div>
      ) : (
        <div className="profileEmptyCard">There are no more users</div>
      )}
    </div>
  );
};

export default Profile;
