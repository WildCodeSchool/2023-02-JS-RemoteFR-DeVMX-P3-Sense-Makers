const AbstractManager = require("./AbstractManager");

class CommentsManager extends AbstractManager {
  constructor() {
    super({ table: "comments" });
  }

  findAllCommentsForOneDecision(decisionId) {
    return this.database.query(
      `select c.user_id, c.id, c.comment, c.vote, DATE_FORMAT(c.creation_date, "%d/%m/%Y") AS date , u.firstname, u.lastname, u.photo from ${this.table} c
      INNER JOIN users u ON c.user_id = u.id
      where decision_id = ?`,
      [decisionId]
    );
  }

  insert(comment, decisionId) {
    return this.database.query(
      `insert into ${this.table} (user_id, decision_id, comment, vote) values (?,?,?,?,?)`,
      [
        comment.user_id,
        decisionId,
        comment.creation_date,
        comment.comment,
        comment.vote,
      ]
    );
  }
}

module.exports = CommentsManager;
