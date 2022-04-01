const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("post", postSchema);

module.exports = Post;
