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
