const AbstractManager = require("./AbstractManager");

class UsersManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  findAllUsersWithRoles() {
    return this.database.query(
      `SELECT ${this.table}.id, ${this.table}.firstname, ${this.table}.lastname, ${this.table}.photo, ${this.table}.email, ${this.table}.password, ${this.table}.creation_date, GROUP_CONCAT( r.role_name SEPARATOR ", " ) roles FROM  ${this.table}
      left join users_roles ur ON ur.user_id = ${this.table}.id
      inner join roles r ON r.id = ur.role_id
      group by ${this.table}.id;
      `
    );
  }

  findUserWithRolesById(id) {
    return this.database.query(
      `SELECT ${this.table}.id, ${this.table}.firstname, ${this.table}.lastname, ${this.table}.photo, ${this.table}.email, ${this.table}.password, ${this.table}.creation_date, GROUP_CONCAT ( r.role_name SEPARATOR ", " ) roles FROM  ${this.table}
      left join users_roles ur ON ur.user_id = ${this.table}.id
      inner join roles r ON r.id = ur.role_id
      where ${this.table}.id = ?
      group by ${this.table}.id;`,
      [id]
    );
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
      `insert into ${this.table} (firstname, lastname, photo, email, password, creation_date) values (?, ?, ?, ?, ?, ?)`,
      [
        user.firstname,
        user.lastname,
        user.photo,
        user.email,
        user.password,
        user.creation_date,
      ]
    );
  }

  insertRoleIntoUser(userId, roleId) {
    return this.database.query(
      `insert into users_roles (user_id, role_id) values ( ?, ?)`,
      [userId, roleId]
    );
  }

  update(user) {
    return this.database.query(
      `update ${this.table} set firstname = ?, lastname = ?, photo = ?, email = ?, password = ?, creation_date =? where id = ?`,
      [
        user.firstname,
        user.lastname,
        user.photo,
        user.email,
        user.password,
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

  findOneByEmail(email) {
    return this.database.query(`SELECT * FROM ${this.table} WHERE email = ?`, [
      email,
    ]);
  }
}

module.exports = UsersManager;
