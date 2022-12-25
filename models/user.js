const { Schema, model } = require("mongoose");
const Joi = require("joi");

const emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,10}$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      minLength: 4,
      maxLength: 30,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      match: emailRegExp,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    token: {
      type: String,
      default: "",
    },
    verificationToken: {
      type: String,
      default: "",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
    training: {
      type: Schema.Types.ObjectId,
      ref: "Training",
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const registerUserSchema = Joi.object({
  name: Joi.string().min(4).max(30).required(),
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().pattern(passwordRegExp).required(),
});

const loginUserSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().pattern(passwordRegExp).required(),
});

const verifyEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
});

const schemas = { registerUserSchema, loginUserSchema, verifyEmailSchema };

const User = model("User", userSchema);

module.exports = { schemas, User };
