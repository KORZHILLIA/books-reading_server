const { findUserById } = require("../services/auth-service");
const createReqError = require("./createReqError");
const { verifyToken } = require("../helpers");

const authenticate = async (req, _, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw createReqError(401, "Not authorized");
    }
    try {
      const { id } = verifyToken(token);
      const user = await findUserById(id);
      if (!user || !user.token) {
        throw createReqError(401, "Not authorized");
      }
      req.user = user;
      next();
    } catch (error) {
      throw createReqError(401, "Not authorized");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
