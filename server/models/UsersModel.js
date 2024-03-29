const mongoose = require("mongoose");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const Image = require("./ImagesModel");
const Interaction = require("./InteractionsModel");
const ObjectId = require("mongoose").Types.ObjectId;
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  userID: {
    type: String,
    unique: true,
    required: false,
  },
  Name: {
    type: String,
    required: true,
  },
  Surname: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    unique: true,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Bio: {
    type: String,
    required: true,
  },
});

usersSchema.pre("save", async function (next) {
  try {
    if (!this.userID) this.userID = uuid.v4();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.Password, salt);
    this.Password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});
usersSchema.statics.getRandomUser = async function (currentUserId) {
  try {
    const pendingMatchUserId = await Interaction.getUserPendingMatch(
      currentUserId
    );
    if (pendingMatchUserId) {
      return await UserModel.findById(pendingMatchUserId);
    }

    const dislikedUsers = await Interaction.getDislikedUsers(currentUserId);
    const likedPendingUsers = await Interaction.getLikedPendingUsers(
      currentUserId
    );
    const matchedUsers = await Interaction.getMatchedUsers(currentUserId);

    const excludedUsers = [
      ...dislikedUsers,
      ...likedPendingUsers,
      ...matchedUsers,
      currentUserId,
    ].map((id) => new ObjectId(id));

    const randomUsers = await UserModel.aggregate([
      { $match: { _id: { $nin: excludedUsers } } },
      { $sample: { size: 5 } },
    ]);

    if (randomUsers.length < 1) {
      console.log("Not enough users in the database");
      return null;
    }

    const randomIndex = Math.floor(Math.random() * randomUsers.length);
    return randomUsers[randomIndex] || null;
  } catch (error) {
    console.error("Error retrieving random user", error);
    throw error;
  }
};

const UserModel = mongoose.model("User", usersSchema);

module.exports = UserModel;

module.exports.getUserById = async function (id) {
  try {
    const result = await UserModel.findById(id);
    return result;
  } catch (error) {
    console.log("Error searching for user by id");
    console.error(error);
    return null;
  }
};
module.exports.getUserByUsername = async function (username) {
  const query = { username: username };
  try {
    const user = await UserModel.findOne(query);
    return user || null;
  } catch (error) {
    console.log("Error getting user by username");
    console.error(error);
    return null;
  }
};
module.exports.comparePassword = function (candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};

module.exports.getUserByEmail = async function (email) {
  const query = { email: email };
  try {
    const user = await UserModel.findOne(query);
    return user || null;
  } catch (error) {
    console.log("Error getting user by email");
    console.error(error);
    return null;
  }
};

module.exports.addUser = async function (newUser, profileImg) {
  try {
    console.log("Adding new user: ", newUser);
    const validationError = await validateNewUserFields(newUser);
    if (validationError) throw validationError;
    const savedUser = await newUser.save();

    const newImage = new Image({
      _id: savedUser._id,
      profileImg: profileImg,
    });

    await newImage.save();
    return savedUser;
  } catch (err) {
    throw err;
  }
};

async function validateNewUserFields(newUser) {
  const paths = UserModel.schema.paths;
  const requiredFields = Object.keys(paths).filter(
    (field) => paths[field].isRequired
  );
  const userFields = Object.keys(newUser.toObject());
  const missingFields = requiredFields.filter(
    (field) => !userFields.includes(field)
  );

  if (missingFields.length > 0) {
    return {
      name: "ValidationError",
      message: `Please fill in all required fields: ${missingFields.join(
        ", "
      )}`,
    };
  }
  if (await module.exports.getUserByEmail(newUser.Email)) {
    return {
      name: "ValidationError",
      message: "An user with the same email already exists",
    };
  }
  return null;
}
