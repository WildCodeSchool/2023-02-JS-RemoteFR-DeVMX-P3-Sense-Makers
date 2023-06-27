const Joi = require("joi");
const argon2 = require("argon2");

const options = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  time: 5,
  parellelism: 1,
};

const hashPassword = (password) => {
  return argon2.hash(password, options);
};

const authSchema = () => {
  return Joi.object({
    firstname: Joi.string(),
    lastname: Joi.string(),
    photo: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
};

const checkUserData = (req, res, next) => {
  const { error } = authSchema().validate(req.body, { abortEarly: false });
  if (error) {
    res.status(401).json({ msg: "Invalid user" });
  } else {
    next();
  }
};

module.exports = {
  checkUserData,
  hashPassword,
};
