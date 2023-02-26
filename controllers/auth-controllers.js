const { nanoid } = require("nanoid");
const { User } = require("../models/user");
const {
  createUser,
  findUserByEmail,
  findUserByToken,
} = require("../services/auth-service");
const { createReqError } = require("../middlewares");
const {
  hashPassword,
  comparePassword,
  generateToken,
  sendMail,
} = require("../helpers");
const BASE_URL = "https://books-reading-one.vercel.app/";

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await findUserByEmail(email);
  if (user) {
    throw createReqError(409, "This email already in use");
  }
  const hashedPassword = await hashPassword(password);
  const verificationToken = nanoid(5);
  const result = await createUser({
    name,
    email,
    password: hashedPassword,
    verificationToken,
  });
  const mail = {
    to: email,
    subject: "Books Reading signup confirmation",
    html: `<a href="${BASE_URL}api/auth/verify/${verificationToken}" target="_blank">Press to confirm registration</a>`,
  };
  await sendMail(mail);
  res.status(201).json({
    name: result.name,
    email: result.email,
    verificationToken: result.verificationToken,
  });
};

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await findUserByToken(verificationToken);
  if (!user) {
    throw createReqError(404, "User not found");
  }
  const { isVerified } = await User.findByIdAndUpdate(
    user._id,
    {
      isVerified: true,
      verificationToken: "",
    },
    { new: true }
  );
  res.json({ isVerified });
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await findUserByEmail(email);
  if (!user) {
    throw createReqError(404, "User with this email not found");
  }
  if (user.isVerified) {
    throw createReqError(404, "Verification has already been passed");
  }
  const mail = {
    to: email,
    subject: "Books Reading signup conirmation",
    html: `<a href="${BASE_URL}/api/auth/verify/${verificationToken}">Press to confirm registration</a>`,
  };
  await sendMail(mail);
  res.json({ message: "Verification email has been sent" });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user) {
    throw createReqError(404, "No user with this email");
  }
  if (!user.isVerified) {
    throw createReqError(409, "Please, verify your email first");
  }
  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw createReqError(401, "This password is invalid");
  }
  const token = generateToken(user._id);
  await User.findByIdAndUpdate(user._id, { token });
  res.json({ name: user.name, email, isVerified: user.isVerified, token });
};

const getCurrent = async (req, res) => {
  const { name, email, token, isVerified, books } = req.user;
  res.json({ name, email, token, isVerified, books });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.json({ message: "Logout successfully" });
};

module.exports = {
  signup,
  verifyEmail,
  resendVerifyEmail,
  signin,
  getCurrent,
  logout,
};
