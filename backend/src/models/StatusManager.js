const AbstractManager = require("./AbstractManager");

class StatusManager extends AbstractManager {
  constructor() {
    super({ table: "status" });
  }

  findAllStatus() {
    return this.database.query(`SELECT title FROM  ${this.table}`);
  }

  insert(status) {
    return this.database.query(`insert into ${this.table} (title) values (?)`, [
      status.title,
    ]);
  }

  update(status) {
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [status.title, status.id]
    );
  }
}

module.exports = StatusManager;
