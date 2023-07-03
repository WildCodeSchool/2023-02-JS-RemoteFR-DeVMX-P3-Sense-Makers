const argon2 = require("argon2");
const models = require("../models");

const login = async (req, res) => {
  const [user] = await models.users.findOneByEmail(req.body.email);

  if (user[0]) {
    const check = await argon2.verify(user[0].password, req.body.password);

    if (check) {
      res.status(200).json({ msg: "connected" });
    } else {
      res.status(401).json({ msg: "not connected" });
    }
  } else {
    res.status(401).json({ msg: "not connected" });
  }
};

module.exports = {
  login,
};
