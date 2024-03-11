export const handleOpenChat = (props, userMatchedData) => {
  const { matches, currentUser, setShowMatchedProfile, setShowChatBox } = props;
  try {
    const match = findMatchedUser(
      matches,
      currentUser._id,
      userMatchedData._id
    );

    if (match) {
      setShowMatchedProfile(null);
      setShowChatBox({
        name: userMatchedData.Name,
        surname: userMatchedData.Surname,
        matchId: match._id,
      });
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const handleOpenProfile = (props, targetUser) => {
  try {
    props.setShowChatBox(null);
    props.setShowMatchedProfile(targetUser);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const findMatchedUser = (matches, currentUserId, userMatchedId) => {
  return matches.find((match) => {
    return (
      (match.userID1 === currentUserId && match.userID2 === userMatchedId) ||
      (match.userID2 === currentUserId && match.userID1 === userMatchedId)
    );
  });
};
