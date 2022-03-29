const bcrypt = require("bcrypt");

exports.hashPass = async (passwordInput) => {
  const salt = await bcrypt.genSalt(12);
  const hashedPass = await bcrypt.hash(passwordInput, salt);
  return hashedPass;
};
