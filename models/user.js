const { Schema, model } = require("mongoose");
const Joi = require("joi");

const emailRegExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
/*Doesn't allow numbers in the domain name and doesn't allow for top level
domains that are less than 2 or more than 3 letters (which is fine until they allow more).
Doesn't handle multiple &quot;.&quot; in the domain (joe@abc.co.uk).*/
const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,10}$/;
/* Password must be at least 6 characters, no more than 10 characters,
and must include at least one upper case letter,
one lower case letter, and one numeric digit.*/

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
