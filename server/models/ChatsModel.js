const mongoose = require("mongoose");
const uuid = require("uuid");
const chatSchema = new mongoose.Schema({
  chatID: {
    type: String,
    unique: true,
    required: true,
  },
  userID1: {
    type: String,
    required: true,
  },
  userID2: {
    type: String,
    required: true,
  },
  messages: [
    {
      senderID: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

chatSchema.pre("save", function (next) {
  if (!this.chatID) this.chatID = uuid.v4();
  next();
});

const ChatsModel = mongoose.model("Chat", chatSchema);

module.exports = ChatsModel;
