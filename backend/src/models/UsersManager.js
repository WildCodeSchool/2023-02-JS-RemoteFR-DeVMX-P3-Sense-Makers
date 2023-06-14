const AbstractManager = require("./AbstractManager");

class UsersManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  findAllUsers() {
    return this.database.query(`SELECT * FROM  ${this.table}`);
  }

  insert(user) {
    return this.database.query(
      `insert into ${this.table} (firstname, lastname, photo, email, password, role_id, creation_date) values (?, ?, ?, ?, ?, ?, ?)`,
      [
        user.firstname,
        user.lastname,
        user.photo,
        user.email,
        user.password,
        user.role_id,
        user.creation_date,
      ]
    );
  }

  update(user) {
    return this.database.query(
      `update ${this.table} set firstname = ?, lastname = ?, photo = ?, email = ?, password = ?, role_id = ?, creation_date =? where id = ?`,
      [
        user.firstname,
        user.lastname,
        user.photo,
        user.email,
        user.password,
        user.role_id,
        user.creation_date,
        user.id,
      ]
    );
  }
}

module.exports = UsersManager;
