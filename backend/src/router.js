const express = require("express");

const router = express.Router();
const UserControllers = require("./controllers/UserControllers");
const QuestionsControllers = require("./controllers/QuestionsControllers");

// ***USER***
// Affichage du score final :
router.get("/score", UserControllers.ranking);
// Affichage de l'user lors du jeu et login :
router.get("/users/:id", UserControllers.read);
// Création d'un user :
router.post("/createUser", UserControllers.add);
// Mise a jour score :
router.put("/users/update/:id", UserControllers.update);

// ***QUESTIONS***
// Création d'une question
router.post("/createQuest", QuestionsControllers.add);
// Affichage aléatoire de 10 questions
router.get("/questions", QuestionsControllers.randomize);
module.exports = router;
