const mongoose = require("mongoose");

const interactionsSchema = new mongoose.Schema({
  userID1: {
    type: String,
    required: true,
  },
  userID2: {
    type: String,
    required: true,
  },
  user1Action: {
    type: String,
    enum: ["like", "dislike"],
    required: true,
  },
  user2Action: {
    type: String,
    enum: ["like", "dislike", "pending"],
    default: "pending",
    required: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

// interactionsSchema.post('save', function(doc, next) {
//   if (doc.user1Action === 'like' && doc.user2Action === 'like') {
//     const chat = new ChatsModel({
//       userID1: doc.userID1,
//       userID2: doc.userID2,
//       messages: [],
//     });
//     chat.save();
//   }
//   next();
// });

const InteractionsModel = mongoose.model("Interaction", interactionsSchema);

module.exports = InteractionsModel;
