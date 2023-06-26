// const { hashPassword } = require("../services/checkAuth");
// const models = require("../models");

const user = {
  email: "toto@toto.com",
  password: "toto",
};

const login = (req, res) => {
  if (req.body.email === user.email && req.body.password === user.password) {
    res.status(200).json({ msg: "Access granted" });
  } else {
    res.status(401).json({ msg: "Access denied" });
  }
};

const signup = (req, res) => {
  // const hash = await hashPassword(req.body.password);

  // models.users
  res.status(201).json({ msg: "User created" });
};

module.exports = {
  login,
  signup,
};
