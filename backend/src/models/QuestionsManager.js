const AbstractManager = require("./AbstractManager");

class QuestionsManager extends AbstractManager {
  constructor() {
    super({ table: "questions" });
  }

  async create(questions) {
    // Add user
    const [result] = await this.database.query(
      `insert into ${this.table} (quest, repA, repB, repC, repD, goodReponse, authorId) values (?,?,?,?,?,?,?)`,
      [
        questions.quest,
        questions.repA,
        questions.repB,
        questions.repC,
        questions.repD,
        questions.goodReponse,
        questions.authorId,
      ]
    );
    return result.insertId;
  }

  async readRandom() {
    // View 10 randoms questions
    const [rows] = await this.database.query(
      `select * from ${this.table} order by rand() limit 10`
    );
    return rows;
  }
}

module.exports = QuestionsManager;
