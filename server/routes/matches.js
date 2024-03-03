const express = require("express");
const passport = require("passport");
const router = express.Router();
const Chats = require("../models/ChatsModel");
const Interactions = require("../models/InteractionsModel");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    try {
      const { Email } = req.user;
      console.log(`GET /matches - User email: ${Email}`);
      res.status(200).json({ success: true, Email });
    } catch (error) {
      console.error(`GET /matches - Error: ${error.message}`);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

router.get(
  "/getUserMatches",
  passport.authenticate("jwt", { session: false }),
  async (req, res, _) => {
    try {
      const currentUser = req.user;
      const matches = await Interactions.getUserMatches(currentUser._id);
      res.status(200).json({ currentUser, matches });
    } catch (error) {
      console.error(`GET /getUserMatches - Error: ${error.message}`);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

router.post("/createInteraction", async (req, res, _) => {
  try {
    const { userID1, userID2, interactionStatus } = req.body;
    const newInteraction = new Interactions({
      userID1,
      userID2,
      interactionStatus: interactionStatus === "like" ? "pending" : "dislike",
    });

    await newInteraction.save();
    res.json(newInteraction);
  } catch (error) {
    console.error(`POST /createInteraction - Error: ${error.message}`);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

router.put("/updateInteraction/:id", async (req, res, _) => {
  try {
    const { interactionStatus } = req.body;
    const updatedInteraction = await Interactions.updateInteractionStatus(
      req.params.id,
      interactionStatus
    );
    return res.json(updatedInteraction);
  } catch (error) {
    console.error(`PUT /updateInteraction/:id - Error: ${error.message}`);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

router.get("/interactionExists/:userID1/:userID2", async (req, res) => {
  try {
    const { userID1, userID2 } = req.params;
    const interaction = await Interactions.isThereAnInteraction(
      userID1,
      userID2
    );
    res.json(interaction);
  } catch (error) {
    console.error(
      `GET /interactionExists/:userID1/:userID2 - Error: ${error.message}`
    );
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

router.post(
  "/createChat/:targetUserID",
  passport.authenticate("jwt", { session: false }),
  async (req, res, _) => {
    try {
      const currentUser = req.user;
      const { targetUserID } = req.params;
      const chat = await Chats.createChat(currentUser._id, targetUserID);
      res.json(chat);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

module.exports = router;
