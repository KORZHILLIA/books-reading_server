const jwt = require("jsonwebtoken");
const { SECRET_WORDS } = process.env;

const verifyToken = (token) => {
  return jwt.verify(token, SECRET_WORDS);
};

module.exports = verifyToken;
