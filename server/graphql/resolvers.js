const { registerValidation } = require("../validation/auth");
const { hashPass } = require("../useful/auth");
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
  },
};

module.exports = resolvers;
