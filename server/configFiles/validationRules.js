const { body } = require("express-validator");

exports.validateUser = [
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("name").isLength({ min: 1 }).withMessage("Name is required"),
  body("surname").isLength({ min: 1 }).withMessage("Surname is required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches("[a-z]")
    .withMessage("Password must contain at least one lowercase letter")
    .matches("[A-Z]")
    .withMessage("Password must contain at least one uppercase letter")
    .matches("[0-9]")
    .withMessage("Password must contain at least one number")
    .matches('[~`!@#$%^&*()-_+={}[]|\\;:"<>,./?]')
    .withMessage(
      'Password must contain at least one symbol: ~`!@#$%^&*()-_+={}[]|\\;:"<>,./?'
    ),
  body("profileImg").notEmpty().withMessage("Please provide a profile image"),
  body("bio").notEmpty().withMessage("Please provide a bio"),
];
exports.validateLogin = [
  body("email").notEmpty().withMessage("Please provide an email"),
  body("password").notEmpty().withMessage("Please provide a password"),
];
