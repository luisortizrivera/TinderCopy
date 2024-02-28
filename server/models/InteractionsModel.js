const mongoose = require("mongoose");

const interactionsSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  targetUserID: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["like", "dislike"],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const InteractionsModel = mongoose.model("Interactions", interactionsSchema);

module.exports = InteractionsModel;
