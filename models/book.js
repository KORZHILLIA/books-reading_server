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
    // user: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    // },
  },
  { versionKey: false, timestamps: true }
);

const addNewBookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  year: Joi.number().min(1457).max(currentYear).required(),
  pages: Joi.number().required(),
});

const Book = model("Book", bookSchema);

const schemas = { addNewBookSchema };

module.exports = { schemas, Book };
