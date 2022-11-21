const { User } = require("../models/user");

const createUser = async (data) => {
  return User.create(data);
};

const findUserByEmail = async (email) => {
  return User.findOne({ email });
};

const findUserByToken = async (verificationToken) => {
  return User.findOne({ verificationToken });
};

const findUserById = async (id) => {
  return User.findById(id);
};

module.exports = { createUser, findUserByEmail, findUserById, findUserByToken };
