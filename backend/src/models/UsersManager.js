const AbstractManager = require("./AbstractManager");

class UsersManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  findAllUsers() {
    return this.database.query(`SELECT * FROM  ${this.table}`);
  }

  findUsersNameConcat() {
    return this.database.query(
      `SELECT id, CONCAT(firstname, ' ',lastname) AS label, firstname AS value FROM  ${this.table}`
    );
  }

  findUsersNameExpertConcat() {
    return this.database.query(
      `SELECT u.id, CONCAT(u.firstname, ' ',u.lastname) AS label, u.firstname AS value  FROM  users_roles ur
      INNER JOIN users u ON u.id = ur.user_id
      WHERE role_id = 3`
    );
  }

  insert(user) {
    return this.database.query(
      `insert into ${this.table} (firstname, lastname, photo, email, password, role_id, creation_date) values (?, ?, ?, ?, ?, ?, ?, ?)`,
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

  findAllDecisionsByUserId(id) {
    return this.database.query(
      `SELECT d.id d_id, d.title AS title_decision, d.status_id, c.title, u.firstname, u.lastname, u.photo, u.id u_id, s.title title_status FROM decisions d
      JOIN users_decisions ON users_decisions.decision_id = d.id
      JOIN users u ON u.id = users_decisions.user_id
      JOIN status s ON s.id = d.status_id
      JOIN concernedhub c ON c.id = d.concerned_hub_id
      WHERE u.id = ?`,
      [id]
    );
  }
}

module.exports = UsersManager;
