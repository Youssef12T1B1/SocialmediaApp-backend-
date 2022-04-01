const Joi = require("joi");

exports.registerValidation = async (userInput) => {
  const userSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
  });

  const { error } = await userSchema.validate(userInput);
  return error;
};

exports.loginValidation = async (loginInput) => {
  const userSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required().min(6),
  });

  const { error } = await userSchema.validate(loginInput);
  return error;
};

exports.PostValidation = async (content) => {
  const postSchema = Joi.object({
    content: Joi.string().required(),
  });

  const { error } = await postSchema.validate(content);
  return error;
};
