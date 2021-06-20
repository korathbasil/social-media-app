const { userInputError, UserInputError } = require("apollo-server");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = require("../../config");
const User = require("../../models/User");

module.exports = {
  Query: {},
  Mutation: {
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      // TODO: Validate user data
      // TODO: Make sure user doesnt already exists
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Username already exists.", {
          errors: {
            username: "Username already exists.",
          },
        });
      }
      // TODO: Hash the password
      // TODO: Return Web Token
      password = await bcrypt.hash(password, 12);

      const newwUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });
      const res = await newwUser.save();

      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          username: res.username,
        },
        SECRET_KEY,
        { expiresIn: "1h" }
      );

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
