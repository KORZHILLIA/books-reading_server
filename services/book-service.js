const { Book } = require("../models/book");
const { User } = require("../models/user");

const addNewBook = async (book) => {
  const newBook = await Book.create({ ...book });
  return newBook;
};

const getAllBooks = async (userId) => {
  const { books } = await User.findById(userId).populate("books");
  return books;
};

const addBookToUser = async (userId, bookId) => {
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $push: { books: bookId },
    },
    { new: true }
  ).populate("books");
  return user;
};

const changeBookStatus = async (userId, bookId, status) => {
  await Book.findByIdAndUpdate(bookId, { status });
  const user = User.findById(userId).populate("books");
  return user;
};

const removeBookFromUser = async (userId, bookId) => {
  await Book.findByIdAndDelete(bookId);
  const user = await User.findByIdAndUpdate(
    userId,
    { $pull: { books: bookId } },
    { new: true }
  ).populate("books");
  return user;
};

module.exports = {
  addNewBook,
  getAllBooks,
  addBookToUser,
  changeBookStatus,
  removeBookFromUser,
};
