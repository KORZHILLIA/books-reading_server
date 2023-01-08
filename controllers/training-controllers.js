const { createReqError } = require("../middlewares");
const {
  checkTraining,
  addTrainingToUser,
  removeTrainingOfUser,
} = require("../services/training-service");

const check = async (req, res) => {
  const { _id } = req.user;
  const training = await checkTraining(_id);
  res.json({ training });
};

const add = async (req, res) => {
  const { _id } = req.user;
  const userTraining = await checkTraining(_id);
  if (!userTraining) {
    const training = await addTrainingToUser(_id, req.body);
    res.json({ training });
  } else {
    throw createReqError(404, "This user already has active training");
  }
};

const remove = async (req, res) => {
  const { _id } = req.user;
  const { books, training } = await removeTrainingOfUser(_id);
  res.json({ books, training });
};

const addResult = async (req, res) => {
  const { _id } = req.user;
  const { books, training } = await handleNewResult(_id, req.body);
  res.json({ books, training });
};

module.exports = { check, add, remove, addResult };
