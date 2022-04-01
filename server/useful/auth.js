const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSEC = require("../config/.env").JWTkey;

exports.hashPass = async (passwordInput) => {
  const salt = await bcrypt.genSalt(12);
  const hashedPass = await bcrypt.hash(passwordInput, salt);
  return hashedPass;
};

exports.bcryptPass = async (passwordInput, hashedPass) => {
  const Isvalid = await bcrypt.compare(passwordInput, hashedPass);
  return Isvalid;
};

exports.newToken = (user) => {
  const token = jwt.sign(user, jwtSEC, { expiresIn: "1h" });
  return token;
};

exports.decryptToken = (token) => {
  try {
    const user = jwt.verify(token, jwtSEC);
    return user;
  } catch (error) {
    return null;
  }
};
