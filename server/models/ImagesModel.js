const mongoose = require("mongoose");
const imageSchema = new mongoose.Schema({
  profileImg: {
    type: Buffer,
    required: true,
  },
});

imageSchema.statics.getImageById = async function (id) {
  return await this.findById(id);
};
const ImagesModel = mongoose.model("Image", imageSchema);

module.exports = ImagesModel;
