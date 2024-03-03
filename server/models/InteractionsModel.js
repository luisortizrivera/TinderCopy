const mongoose = require("mongoose");
const ChatsModel = require("./ChatsModel");

const interactionsSchema = new mongoose.Schema({
  userID1: {
    type: String,
    required: true,
  },
  userID2: {
    type: String,
    required: true,
  },
  interactionStatus: {
    type: String,
    enum: ["like", "dislike", "pending"],
    default: "pending",
    required: true,
  },
  chatID: {
    type: String,
    default: null,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

interactionsSchema.post("findOneAndUpdate", async function (doc) {
  if (doc.interactionStatus === "like" && !doc.chatID) {
    try {
      const chat = new ChatsModel({
        _id: this._id,
        userID1: doc.userID1,
        userID2: doc.userID2,
        messages: [],
      });
      const savedChat = await chat.save();
      doc.chatID = savedChat._id;
      await doc.save();
    } catch (err) {
      console.error(err);
    }
  }
});

interactionsSchema.statics.updateInteractionStatus = async function (
  id,
  status
) {
  try {
    const updatedInteraction = await this.findOneAndUpdate(
      { _id: id },
      { interactionStatus: status },
      { new: true }
    );
    return updatedInteraction;
  } catch (error) {
    throw new Error("Failed to update interaction");
  }
};

interactionsSchema.statics.isThereAnInteraction = async function (
  targetUserID,
  currentUserID
) {
  try {
    const interaction = await this.findOne({
      userID1: targetUserID,
      userID2: currentUserID,
    });
    return interaction;
  } catch (error) {
    throw new Error("Failed to find interaction");
  }
};

interactionsSchema.statics.getUserMatches = async function (userId) {
  try {
    const interactions = await this.find({
      $or: [{ userID1: userId }, { userID2: userId }],
      interactionStatus: "like",
    });
    return interactions;
  } catch (error) {
    throw new Error("Failed to get interactions with status 'like'");
  }
};

const InteractionsModel = mongoose.model("Interaction", interactionsSchema);

module.exports = InteractionsModel;
