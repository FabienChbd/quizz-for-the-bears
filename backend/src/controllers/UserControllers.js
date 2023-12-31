const models = require("../models");

// Affichage score
const ranking = async (req, res) => {
  try {
    const users = await models.user.classAll();
    res.json(users);
  } catch (err) {
    console.error(err);
  }
};

// Jeu
const read = async (req, res, next) => {
  try {
    const user = await models.user.read(req.params.id);
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
};

// Login
const login = async (req, res, next) => {
  try {
    if (req.user) {
      res.status(200).json({ userId: req.user.id });
    } else {
      res.status(401).json({ error: "Identifiants incorrects" });
    }
  } catch (err) {
    next(err);
  }
};

// Mise a jour du score
const update = async (req, res, next) => {
  const { userId } = req.params;
  console.info("UserID:", userId);
  const { score } = req.body;
  console.info(req.body);
  try {
    const updateUser = await models.user.update(userId, score);
    res.status(201).json(updateUser);
  } catch (err) {
    next(err);
  }
};

// Création user
const add = async (req, res, next) => {
  const user = req.body;
  try {
    console.info(req.body);
    const insertId = await models.user.create(user);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  ranking,
  read,
  login,
  update,
  add,
};
