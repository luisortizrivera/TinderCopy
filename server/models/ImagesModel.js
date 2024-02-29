const mongoose = require("mongoose");
const imageSchema = new mongoose.Schema({
  profileImg: {
    type: Buffer,
    required: true,
  },
});

const ImagesModel = mongoose.model("Image", imageSchema);

module.exports = ImagesModel;
