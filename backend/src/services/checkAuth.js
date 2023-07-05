const Joi = require("joi");
const argon2 = require("argon2");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  time: 5,
  parellelism: 1,
};

const hashPassword = (req, res, next) => {
  argon2
    .hash(req.body.password, hashingOptions)
    .then((hashedPassword) => {
      req.body.hpassword = hashedPassword;
      delete req.body.password;

      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500).send("Error saving user");
    });
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
