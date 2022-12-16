const {
  addNewBook,
  getAllBooks,
  addBookToUser,
  removeBookFromUser,
} = require("../services/book-service");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const books = await getAllBooks(_id);
  res.json({ books });
};

const add = async (req, res) => {
  const { _id } = req.user;
  const newBook = await addNewBook(req.body);
  const { books } = await addBookToUser(_id, newBook._id);
  res.status(201).json({ books });
};

const remove = async (req, res) => {
  const { _id } = req.user;
  const { bookId } = req.params;
  const { books } = await removeBookFromUser(_id, bookId);
  res.json({ books });
};

module.exports = { getAll, add, remove };
