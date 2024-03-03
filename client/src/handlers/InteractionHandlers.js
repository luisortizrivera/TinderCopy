const fetchInteractionExists = async (currentUser, randomUser) => {
  const response = await fetch(
    `/api/matches/interactionExists/${randomUser.user._id}/${currentUser._id}`
  );
  return await response.json();
};

const updateInteraction = async (id, interaction) => {
  await fetch(`/api/matches/updateInteraction/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ interactionStatus: interaction }),
  });
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

export const handleInteraction = async (
  interaction,
  currentUser,
  randomUser
) => {
  console.log("Interaction: ", interaction);

  const interactionExists = await fetchInteractionExists(
    currentUser,
    randomUser
  );

  if (interactionExists)
    await updateInteraction(interactionExists._id, interaction);
  else await createInteraction(interaction, currentUser, randomUser);
};
