const AbstractManager = require("./AbstractManager");

class DecisionManager extends AbstractManager {
  constructor() {
    super({ table: "decisions" });
  }

  insert(decision) {
    return this.database.query(
      `insert into ${this.table} (title, content, usefulness,context, benefit,disavantages,positives_votes, negatives_votes, status_id) values (?,?,?,?,?,?,?,?,?)`,
      [
        decision.title,
        decision.content,
        decision.usefulness,
        decision.context,
        decision.benefit,
        decision.disavantages,
        decision.positives_votes,
        decision.negatives_votes,
        decision.status_id,
      ]
    );
  }

  update(decision) {
    return this.database.query(
      `update ${this.table} set title = ?, content = ?, usefulness = ?,context = ?, benefit = ?,disavantages = ?,positives_votes = ?, negatives_votes = ?, status_id = ? where id = ?`,
      [
        decision.title,
        decision.content,
        decision.usefulness,
        decision.context,
        decision.benefit,
        decision.disavantages,
        decision.positives_votes,
        decision.negatives_votes,
        decision.status_id,
        decision.id,
      ]
    );
  }

  findDecision(id) {
    return this.database.query(
      `select title, content, usefulness,context, benefit,disavantages,positives_votes, negatives_votes, comment, comments.creation_date, users.firstname, users.lastname from  comments
      INNER JOIN ${this.table} ON ${this.table}.id = comments.decision_id
      INNER JOIN users ON users.id = comments.user_id
    where ${this.table}.id = ?`,
      [id]
    );
  }
}

module.exports = DecisionManager;
