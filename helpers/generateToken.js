const jwt = require("jsonwebtoken");
const { SECRET_WORDS } = process.env;

const generateToken = (id) => {
  const payload = { id };
  const token = jwt.sign(payload, SECRET_WORDS, { expiresIn: "3h" });
  return token;
};

module.exports = generateToken;
