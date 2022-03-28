const { registerValidation } = require("../validation/auth");
const resolvers = {
  Mutation: {
    register: async (_, args, context) => {
      const { input } = args;
      const error = await registerValidation(input);

      if (error) {
        throw new Error(error.details[0].message);
      }

      const user = new context.models.User(input);
      const newUser = await user.save();
    },
  },
};

module.exports = resolvers;
