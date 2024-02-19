const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const UsersSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  surname: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UsersSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const User = (module.exports = mongoose.model("User", UsersSchema));

module.exports.getUserById = async function (id) {
  try {
    const result = await User.findById(id);
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
    const user = await User.findOne(query);
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
    const user = await User.findOne(query);
    return user || null;
  } catch (error) {
    console.log("Error getting user by email");
    console.error(error);
    return null;
  }
};

module.exports.addUser = async function (newUser, callback) {
  try {
    const validationError = await validateNewUserFields(newUser);
    if (validationError) return callback(validationError);

    await newUser.save();
    callback(null, newUser);
  } catch (err) {
    callback(err);
  }
};

async function validateNewUserFields(newUser) {
  const paths = User.schema.paths;
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
  if (await module.exports.getUserByEmail(newUser.email)) {
    return {
      name: "ValidationError",
      message: "An user with the same email already exists",
    };
  }
  return null;
}
