const argon2 = require("argon2");
const models = require("../models");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashThePassword = (req, res, next) => {
  argon2
    .hash(req.body.password, hashingOptions)
    .then((hashPassword) => {
      req.body.hashPassword = hashPassword;
      delete req.body.password;
      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const verifyUser = async (req, res, next) => {
  const { pseudo } = req.body;

  if (!pseudo) {
    res.sendStatus(422);
  }

  try {
    const user = await models.user.login(pseudo);

    if (!user) {
      res.sendStatus(401);
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Erreur lors de l'authentification :", err);
    res.sendStatus(500);
  }
};

const verifyPassword = (req, res, next) => {
  argon2.verify(req.user.hashPassword, req.body.password).then((ok) => {
    if (ok) {
      next();
    } else {
      res.sendStatus(401);
    }
  });
};

module.exports = {
  hashThePassword,
  verifyUser,
  verifyPassword,
};
