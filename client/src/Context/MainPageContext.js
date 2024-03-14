import React, { createContext, useState } from "react";

export const MainPageContext = createContext();

/**
 * Provider component to wrap the ChatPage so it has access to the common states variables and functions.
 */
export const MainPageProvider = ({ children }) => {
  //array of matches(interactions where status is like)
  const [matches, setMatches] = useState([]);

  //array of matched users data
  const [matchedUsersData, setMatchedUsersData] = useState([]);

  //current user, data and image
  const [currentUser, setCurrentUser] = useState(null);

  //target user, data and image
  const [targetUser, setTargetUser] = useState(null);

  //show chat box trigger state
  const [showChatBox, setShowChatBox] = useState(null);

  //show matched profile trigger state
  const [showMatchedProfile, setShowMatchedProfile] = useState(null);

  /**
   * Function to get the user image from the server.
   *
   * @param {*} userId
   * @returns the user image as a base64 string
   */
  const fetchUserImage = async (userId) => {
    const userImageResponse = await fetch(`/api/user/getUserImage/${userId}`);
    const base64Image = await userImageResponse.text();
    return "data:image/jpeg;base64," + base64Image;
  };

  /**
   * Function to fetch the user's matches and the current user data based on the auth_token.
   */
  const fetchMatches = async () => {
    try {
      const response = await fetch("/api/matches/getUserMatches", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
      const data = await response.json();
      setCurrentUser(data.currentUser);
      setMatches(data.matches);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <MainPageContext.Provider
      value={{
        matches,
        setMatches,
        matchedUsersData,
        setMatchedUsersData,
        currentUser,
        setCurrentUser,
        targetUser,
        setTargetUser,
        showChatBox,
        setShowChatBox,
        showMatchedProfile,
        setShowMatchedProfile,
        fetchUserImage,
        fetchMatches,
      }}
    >
      {children}
    </MainPageContext.Provider>
  );
};
