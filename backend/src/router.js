const express = require("express");

const router = express.Router();
const UserControllers = require("./controllers/UserControllers");
const QuestionsControllers = require("./controllers/QuestionsControllers");
const {
  hashThePassword,
  verifyPassword,
  verifyUser,
} = require("./services/auth");

// ***USER***
// Affichage du score final :
router.get("/score", UserControllers.ranking);
// Affichage de l'user lors du jeu :
router.get("/users/:id", UserControllers.read);
// Affichage de l'user lors du jeu :
router.post("/users/login", verifyUser, verifyPassword, UserControllers.login);
// Création d'un user :
router.post("/createUser", hashThePassword, UserControllers.add);
// Mise a jour score :
router.put("/users/update/:userId", UserControllers.update);

// ***QUESTIONS***
// Création d'une question
router.post("/createQuest/:authorId", QuestionsControllers.add);
// Affichage aléatoire de 10 questions
router.get("/questions", QuestionsControllers.randomize);
module.exports = router;
