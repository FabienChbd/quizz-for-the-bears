const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  async create(user) {
    // Add user
    const [result] = await this.database.query(
      `insert into ${this.table} (pseudo, hashPassword) values (?,?)`,
      [user.pseudo, user.hashPassword]
    );
    return result.insertId;
  }

  async read(id) {
    // Retrieve a user by id
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );
    return rows[0];
  }

  async update(user) {
    // Update an user by id
    const [result] = await this.database.query(
      `update ${this.table} set score = ? where id =?`,
      [user.score, user.id]
    );
    return result;
  }

  async readAll() {
    // Retrieve all user
    const [rows] = await this.database.query(`select * from ${this.table}`);
    return rows;
  }

  async classAll() {
    // Retrieve all user (for score classment)
    const [rows] = await this.database.query(
      `select * from ${this.table} order by score desc`
    );
    return rows;
  }
}

module.exports = UserManager;
