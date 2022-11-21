const createReqError = require("./createReqError");

const validateBody = (schema) => {
  const func = (req, _, next) => {
    const { body } = req;
    const result = schema.validate(body);
    if (result.error) {
      const { details } = result.error;
      const [{ message }] = details;
      next(createReqError(400, message));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
