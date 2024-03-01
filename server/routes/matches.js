const express = require("express");
const passport = require("passport");
const router = express.Router();
const Chats = require("../models/ChatsModel");

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
      const chats = await Chats.getAllChats(currentUser._id);
      res.json(chats);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

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
