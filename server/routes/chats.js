const express = require("express");
const passport = require("passport");
const router = express.Router();
const Chats = require("../models/ChatsModel");

router.get(
  "/getchat/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const chat = await Chats.getChatById(req.params.id);
      res.status(200).json(chat);
    } catch (error) {
      console.error(`GET /getchat - Error: ${error.message}`);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

router.post(
  "/addMessage",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { chatId, content } = req.body;
    try {
      const chat = await Chats.addMessage(chatId, req.user._id, content);
      console.log("About to return the chat:", chat);
      res.status(200).json(chat);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
