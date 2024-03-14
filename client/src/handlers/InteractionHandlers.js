/**
 * Function to fetch the interaction between the current user and the random user if it exists.
 *
 * @param {*} currentUser
 * @param {*} randomUser
 * @returns response
 */
const fetchInteractionExists = async (currentUser, randomUser) => {
  const response = await fetch(
    `/api/matches/interactionExists/${randomUser.user._id}/${currentUser._id}`
  );
  return await response.json();
};

/**
 * Function to update the interaction status.
 *
 * @param {String} id The interaction id.
 * @param {String} interaction The interaction (like or dislike).
 * @returns {Object} The updated interaction.
 */
const updateInteraction = async (id, interaction) => {
  const updateInteractionResponse = await fetch(
    `/api/matches/updateInteraction/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ interactionStatus: interaction }),
    }
  );
  if (!updateInteractionResponse.ok) {
    throw new Error(`HTTP error! status: ${updateInteractionResponse.status}`);
  }

  return await updateInteractionResponse.json();
};

/**
 * Function to create a new interaction between the current user and the random user.
 *
 * @param {Object} interaction like or dislike
 * @param {Object} currentUser
 * @param {Object} randomUser
 */
const createInteraction = async (interaction, currentUser, randomUser) => {
  await fetch(`/api/matches/createInteraction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userID1: currentUser._id,
      userID2: randomUser.user._id,
      interactionStatus: interaction,
    }),
  });
};

/**
 * Handles the unmatch user interaction.
 * It updates the interaction status to dislike and removes the match from the matches array.
 * Once unmatched, it sets the showMatchedProfile state to null and goes back to the swipe card.
 *
 * @param {Object} currentUser The current user.
 */
export const unmatchUser = async (
  matches,
  setMatches,
  currentUser,
  targetUser,
  setShowMatchedProfile
) => {
  try {
    const interactionId = matches.find(
      (match) =>
        (match.userID1 === currentUser._id &&
          match.userID2 === targetUser._id) ||
        (match.userID2 === currentUser._id && match.userID1 === targetUser._id)
    )._id;
    await updateInteraction(interactionId, "dislike");
    console.log("User unmatched successfully");
    setShowMatchedProfile(null);
    setMatches(matches.filter((match) => match._id !== interactionId));
  } catch (error) {
    console.error("Failed to unmatch user:", error);
  }
};

/**
 * Handles the interaction between the current user and the random user.
 * If the interaction exists, it updates the interaction status.
 * If the interaction does not exist, it creates a new interaction.
 * If the interaction status is like after the update, it fetches the user's matches to trigger an update.
 *
 * @param {Object} props contains the interaction (like, dislike), the current user, the random user, the fetchUserData and fetchMatches functions.
 */
export const handleInteraction = async (props) => {
  const { interaction, currentUser, randomUser, fetchUserData, fetchMatches } =
    props;
  console.log("Interaction: ", interaction);

  const interactionExists = await fetchInteractionExists(
    currentUser,
    randomUser
  );

  if (interactionExists) {
    const updatedInteraction = await updateInteraction(
      interactionExists._id,
      interaction
    );
    if (updatedInteraction.interactionStatus === "like") fetchMatches();
  } else await createInteraction(interaction, currentUser, randomUser);
  await fetchUserData();
};
