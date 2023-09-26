const models = require("../models");

// Affichage question
const randomize = async (req, res) => {
  try {
    const questions = await models.questions.readRandom();
    res.json(questions);
  } catch (err) {
    console.error(err);
  }
};

// Création question
const add = async (req, res, next) => {
  const question = req.body;
  try {
    console.info(req.body);
    const insertId = await models.questions.create(question);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  randomize,
  add,
};
