import React, { createContext, useState } from "react";

export const MainPageContext = createContext();

export const MainPageProvider = ({ children }) => {
  const [matches, setMatches] = useState([]);
  const [matchedUsersData, setMatchedUsersData] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [targetUser, setTargetUser] = useState(null);
  const [showChatBox, setShowChatBox] = useState(null);
  const [showMatchedProfile, setShowMatchedProfile] = useState(null);

  const fetchUserImage = async (userId) => {
    const userImageResponse = await fetch(`/api/user/getUserImage/${userId}`);
    const base64Image = await userImageResponse.text();
    return "data:image/jpeg;base64," + base64Image;
  };

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
