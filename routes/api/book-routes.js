const express = require("express");
const {
  validateBody,
  createTryCatchWrapper,
  authenticate,
} = require("../../middlewares");
const { schemas } = require("../../models/book");
const bookControllers = require("../../controllers/book-controllers");

const router = express.Router();

router.get(
  "/getAll",
  authenticate,
  createTryCatchWrapper(bookControllers.getAll)
);

router.post(
  "/add",
  validateBody(schemas.addNewBookSchema),
  authenticate,
  createTryCatchWrapper(bookControllers.add)
);

router.post(
  "/relocate/ftpr/:bookId",
  authenticate,
  createTryCatchWrapper(bookControllers.relocateToPresent)
);

router.post(
  "/relocate/prtf/:bookId",
  authenticate,
  createTryCatchWrapper(bookControllers.relocateToFuture)
);

router.delete(
  "/remove/:bookId",
  authenticate,
  createTryCatchWrapper(bookControllers.remove)
);

router.patch(
  "/resume/:bookId",
  validateBody(schemas.addNewResumeSchema),
  authenticate,
  createTryCatchWrapper(bookControllers.changeResume)
);

module.exports = router;
