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
    return requiredTraining;
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
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { training: null },
    { new: true }
  );
  return updatedUser;
};

module.exports = { checkTraining, addTrainingToUser, removeTrainingOfUser };
