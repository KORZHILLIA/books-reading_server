const express = require("express");
const {
  validateBody,
  createTryCatchWrapper,
  authenticate,
} = require("../../middlewares");
const { schemas } = require("../../models/user");
const authControllers = require("../../controllers/auth-controllers");

const router = express.Router();

router.post(
  "/signup",
  validateBody(schemas.registerUserSchema),
  createTryCatchWrapper(authControllers.signup)
);

router.get(
  "/verify/:verificationToken",
  createTryCatchWrapper(authControllers.verifyEmail)
);

router.post(
  "/verify",
  validateBody(schemas.verifyEmailSchema),
  createTryCatchWrapper(authControllers.resendVerifyEmail)
);

router.post(
  "/signin",
  validateBody(schemas.loginUserSchema),
  createTryCatchWrapper(authControllers.signin)
);

router.get(
  "/current",
  authenticate,
  createTryCatchWrapper(authControllers.getCurrent)
);

router.get(
  "/logout",
  authenticate,
  createTryCatchWrapper(authControllers.logout)
);

module.exports = router;
