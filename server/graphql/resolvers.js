const {
  registerValidation,
  loginValidation,
  PostValidation,
} = require("../validation/auth");
const { hashPass, bcryptPass, newToken } = require("../useful/auth");

const resolvers = {
  Query: {
    posts: async (_, __, context) => {
      const posts = await context.models.Post.find();
      return posts;
    },
  },
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
      const user = await context.models.User.findOne({
        username: input.username,
      });
      if (!user) throw new Error("No user Found");
      const Testpass = await bcryptPass(input.password, user.password);
      if (!Testpass) throw new Error("Auth Failed");

      const token = newToken({
        username: user.username,
        id: user._id,
      });

      return {
        ...user._doc,
        token,
      };
    },
    createPost: async (_, args, context) => {
      const { input } = args;
      console.log(context.user);
      const error = await PostValidation(input);
      if (error) throw new Error(error.details[0].message);
      const post = new context.models.Post({
        ...input,
        owner: context.user.id,
      });
      const newPost = await post.save();
      return newPost;
    },
  },
  Post: {
    owner: async (post, _, context) => {
      const user = await context.models.User.findOne({ _id: post.owner });
      return user;
    },
  },
};

module.exports = resolvers;
