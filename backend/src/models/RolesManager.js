const AbstractManager = require("./AbstractManager");

class RolesManager extends AbstractManager {
  constructor() {
    super({ table: "roles" });
  }

  insert(role) {
    return this.database.query(
      `insert into ${this.table} (role_name) values (?)`,
      [role.roleName]
    );
  }

  update(role) {
    return this.database.query(
      `update ${this.table} set role_name = ? where id = ?`,
      [role.roleName, role.id]
    );
  }
}

module.exports = RolesManager;
