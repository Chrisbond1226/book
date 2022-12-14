const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { bookSchema } = require("../models/Book");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__password")
          .populate("savedBooks");
        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect Credentials");
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect Credentials");
      }

      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (parent, { userId, description, title }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: userId },
          {
            $push: {
              books: { description, title, username: context.user.username },
            },
          },
          { new: true, runValidators: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError(" you need to be logged in");
    },
  },
};

module.exports = resolvers;
