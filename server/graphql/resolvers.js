const { registerValidation, loginValidation } = require("../validation/auth");
const { hashPass, bcryptPass, newToken } = require("../useful/auth");
const User = require("../models/user");

const resolvers = {
  Mutation: {
    register: async (_, args, context) => {
      const { input } = args;
      const error = await registerValidation(input);

      if (error) {
        throw new Error(error.details[0].message);
      }

      const hashedPass = await hashPass(input.password);
      const user = new context.models.User({
        ...input,
        password: hashedPass,
      });
      const newUser = await user.save();
      return newUser;
    },
    login: async (_, args, context) => {
      const { input } = args;
      const error = await loginValidation(input);
      if (error) throw new Error(error.details[0].message);
      const user = User.findOne({ username: input.username });
      if (!user) throw new Error("No user Found");
      if (!bcryptPass(input.password, user.password))
        throw new Error("Auth Failed");

      const token = newToken({
        username: user.username,
      });

      return {
        ...user,
        token,
      };
    },
  },
};

module.exports = resolvers;
