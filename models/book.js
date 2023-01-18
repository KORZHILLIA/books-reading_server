const { Schema, model } = require("mongoose");
const Joi = require("joi");

const currentYear = new Date().getFullYear();

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      min: 1457,
      max: currentYear,
      required: true,
    },
    pages: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["future", "present", "past"],
      default: "future",
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 0,
    },
    resume: {
      type: String,
      maxLength: 500,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

const addNewBookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  year: Joi.number().min(1457).max(currentYear).required(),
  pages: Joi.number().required(),
});

const addNewResumeSchema = Joi.object({
  rating: Joi.number().min(1).max(5).required(),
  resume: Joi.string().max(500),
});

const Book = model("Book", bookSchema);

const schemas = { addNewBookSchema, addNewResumeSchema };

module.exports = { schemas, Book };
