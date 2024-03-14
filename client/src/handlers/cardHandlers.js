/**
 * Handles the logic of the open chat button in matched profiles.
 *
 * @param {Object} props Contains the array of matches, the current user and the trigger states set functions.
 * @param {Object} userMatchedData The user's data (without the image)
 */
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

/**
 * Handles the logic of the open profile button in matched profiles.
 *
 * @param {Object} props Contains the trigger states
 * @param {Object} targetUser The user to show the profile of.
 */
export const handleOpenProfile = (props, targetUser) => {
  try {
    props.setShowChatBox(null);
    props.setShowMatchedProfile(targetUser);
  } catch (error) {
    console.error("Error:", error);
  }
};

/**
 * Finds the matched user in the matches array.
 *
 * @param {Array} matches The array of matches/interactions.
 */
export const findMatchedUser = (matches, currentUserId, userMatchedId) => {
  return matches.find((match) => {
    return (
      (match.userID1 === currentUserId && match.userID2 === userMatchedId) ||
      (match.userID2 === currentUserId && match.userID1 === userMatchedId)
    );
  });
};
