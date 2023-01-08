const express = require("express");
const {
  validateBody,
  authenticate,
  createTryCatchWrapper,
} = require("../../middlewares");
const { schemas } = require("../../models/training");
const trainingControllers = require("../../controllers/training-controllers");

const router = express.Router();

router.get(
  "/check",
  authenticate,
  createTryCatchWrapper(trainingControllers.check)
);

router.post(
  "/add",
  validateBody(schemas.addNewTrainingSchema),
  authenticate,
  createTryCatchWrapper(trainingControllers.add)
);

router.post(
  "/remove",
  authenticate,
  createTryCatchWrapper(trainingControllers.remove)
);

router.post(
  "/addresult",
  validateBody(schemas.addNewResultSchema),
  authenticate,
  createTryCatchWrapper(trainingControllers.addResult)
);

module.exports = router;
