const fetchInteractionExists = async (currentUser, randomUser) => {
  const response = await fetch(
    `/api/matches/interactionExists/${randomUser.user._id}/${currentUser._id}`
  );
  return await response.json();
};

const updateInteraction = async (id, interaction) => {
  const updateInteraction = await fetch(
    `/api/matches/updateInteraction/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ interactionStatus: interaction }),
    }
  );
  return updateInteraction;
};

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

export const handleInteraction = async (props) => {
  const { interaction, currentUser, randomUser, fetchUserData, fetchMatches } =
    props;
  console.log("Interaction: ", interaction);

  const interactionExists = await fetchInteractionExists(
    currentUser,
    randomUser
  );

  if (interactionExists) {
    const updatedInteractionResponse = await updateInteraction(
      interactionExists._id,
      interaction
    );
    const updatedInteraction = await updatedInteractionResponse.json();
    if (updatedInteraction.interactionStatus === "like") {
      console.log("Match!!!");
      fetchMatches();
    }
  } else await createInteraction(interaction, currentUser, randomUser);
  await fetchUserData();
};
