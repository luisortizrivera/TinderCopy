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
        name: userMatchedData.name,
        surname: userMatchedData.surname,
        matchId: match._id,
      });
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const handleOpenProfile = (props, userMatchedId, usersWithMatches) => {
  try {
    const matchedUser = usersWithMatches.find(
      (user) => user.userMatchedData._id === userMatchedId
    );
    props.setShowChatBox(null);
    props.setShowMatchedProfile(matchedUser);
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
