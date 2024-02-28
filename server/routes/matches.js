const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
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

module.exports = router;
