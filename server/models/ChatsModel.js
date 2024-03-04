const mongoose = require("mongoose");
const uuid = require("uuid");
const chatSchema = new mongoose.Schema({
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

chatSchema.statics.getAllChats = async function (userID) {
  try {
    const chats = await this.find({
      $or: [{ userID1: userID }, { userID2: userID }],
    });
    return chats;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

chatSchema.statics.getChatById = async function (chatId) {
  try {
    const chat = await this.findById(chatId);
    return chat;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

chatSchema.statics.addMessage = async function (chatId, senderID, content) {
  try {
    const chat = await this.findById(chatId);
    chat.messages.push({ senderID, content });
    await chat.save();
    return chat;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const ChatsModel = mongoose.model("Chat", chatSchema);

module.exports = ChatsModel;
