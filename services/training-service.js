const { Training } = require("../models/training");
const { User } = require("../models/user");
const { Book } = require("../models/book");

const checkTraining = async (userId) => {
  const { training } = await User.findById(userId);
  if (!training) {
    return training;
  } else {
    const requiredTraining = await Training.findById(training).populate(
      "books"
    );
    const { books, results, finish } = requiredTraining;
    const allBooksPages = books.reduce((acc, { pages }) => acc + pages, 0);
    const allResultsPages = results.reduce((acc, { pages }) => acc + pages, 0);
    const isReadingFinished = allResultsPages >= allBooksPages;
    const isTrainingFinished =
      new Date(finish).getTime() <= new Date().getTime();
    if (isReadingFinished && !isTrainingFinished) {
      const goodFinishedTraining = await Training.findByIdAndUpdate(
        training,
        { isFinished: true },
        { new: true }
      );
      return goodFinishedTraining.populate("books");
    } else if (!isReadingFinished && isTrainingFinished) {
      const badFinishedTraining = await Training.findByIdAndUpdate(
        training,
        { isFinished: true },
        { new: true }
      );
      return badFinishedTraining.populate("books");
    } else {
      return requiredTraining;
    }
  }
};

const addTrainingToUser = async (userId, trainingData) => {
  const { _id } = await Training.create({ ...trainingData, isActive: true });
  const { training } = await User.findByIdAndUpdate(
    userId,
    { training: _id },
    { new: true }
  ).populate("training");
  return training.populate("books");
};

const removeTrainingOfUser = async (userId) => {
  const user = await User.findById(userId);
  await Training.findByIdAndDelete(user.training);
  user.books.forEach(async (id) => {
    const { status } = await Book.findById(id);
    if (status === "present") {
      await Book.findByIdAndUpdate(id, { status: "future" });
      return;
    }
    if (status === "past") {
      await Book.findByIdAndDelete(id);
    }
  });
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { training: null },
    { new: true }
  ).populate("books");
  return updatedUser;
};

const handleNewResult = async (userId, newResult) => {
  const { bookId } = newResult;
  const user = await User.findById(userId);
  const { results } = await Training.findByIdAndUpdate(
    user.training,
    {
      $push: { results: newResult },
    },
    { new: true }
  );
  const totalPagesRead = results
    .filter((result) => result.bookId === bookId)
    .reduce((acc, { pages }) => acc + pages, 0);
  const book = await Book.findById(bookId);
  if (book.pages <= totalPagesRead) {
    await Book.findByIdAndUpdate(bookId, { status: "past" });
  }
  const { training } = await User.findById(userId).populate("training");
  return training.populate("books");
};

module.exports = {
  checkTraining,
  addTrainingToUser,
  removeTrainingOfUser,
  handleNewResult,
};
