const { Book } = require("../models/book");
const { User } = require("../models/user");

const addNewBook = async (book) => {
  const newBook = await Book.create({ ...book });
  return newBook;
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

const removeBookFromUser = async (userId, bookId) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { $pull: { books: bookId } },
    { new: true }
  ).populate("books");
  return user;
};

module.exports = { addNewBook, addBookToUser, removeBookFromUser };
