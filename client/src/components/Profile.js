import React, { useEffect, useState, useContext } from "react";
import "../Styles/ProfileCard.css";
import { handleInteraction } from "../handlers/InteractionHandlers";
import { MainPageContext } from "../Context/MainPageContext";

/**
 * Renders the profile card component of a random user.
 */
const Profile = () => {
  const { currentUser, fetchUserImage, fetchMatches } =
    useContext(MainPageContext);
  const [randomUser, setRandomUser] = useState(null);

  /**
   * Fetches the random user data from the server.
   * If the user is found, it fetches the user's image.
   * If the user is not found, it sets the randomUser state to null.
   */
  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/user/getRandomUser", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });

      const userData = await response.json();
      if (userData) {
        const imageUrl = await fetchUserImage(userData._id);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <p>{randomUser.user.Bio}</p>
          </div>
          <div className="profileButtons">
            <button
              id="dislikeButton"
              onClick={() =>
                handleInteraction({
                  interaction: "dislike",
                  currentUser: currentUser,
                  randomUser: randomUser,
                  fetchUserData: fetchUserData,
                  fetchMatches: fetchMatches,
                })
              }
            >
              NOPE
            </button>
            <button
              id="likeButton"
              onClick={() =>
                handleInteraction({
                  interaction: "like",
                  currentUser: currentUser,
                  randomUser: randomUser,
                  fetchUserData: fetchUserData,
                  fetchMatches: fetchMatches,
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
