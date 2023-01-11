const { Schema, model } = require("mongoose");
const Joi = require("joi");

const trainingSchema = new Schema(
  {
    isActive: {
      type: Boolean,
      default: false,
    },
    isFinished: {
      type: Boolean,
      default: false,
    },
    start: {
      type: String,
      default: "",
    },
    finish: {
      type: String,
      default: "",
    },
    books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
    results: [
      {
        bookId: String,
        date: String,
        pages: Number,
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

const addNewTrainingSchema = Joi.object({
  start: Joi.string().required(),
  finish: Joi.string().required(),
  books: Joi.array().items(Joi.string()).required(),
});

const addNewResultSchema = Joi.object({
  bookId: Joi.string().required(),
  date: Joi.string().required(),
  pages: Joi.number().required(),
});

const Training = model("Training", trainingSchema);

const schemas = { addNewTrainingSchema, addNewResultSchema };

module.exports = { schemas, Training };
