const AbstractManager = require("./AbstractManager");

class CommentsManager extends AbstractManager {
  constructor() {
    super({ table: "comments" });
  }

  findAllCommentsForOneDecision(decisionId) {
    return this.database.query(
      `select c.user_id, c.id, c.comment, c.vote, c.creation_date, u.firstname, u.lastname, u.photo from ${this.table} c
      INNER JOIN users u ON c.user_id = u.id
      where decision_id = ?`,
      [decisionId]
    );
  }

  insert(comment, decisionId) {
    return this.database.query(
      `insert into ${this.table} (user_id, decision_id, creation_date, comment, vote) values (?,?,?,?,?)`,
      [
        comment.user_id,
        decisionId,
        comment.creation_date,
        comment.comment,
        comment.vote,
      ]
    );
  }

  update(comment) {
    return this.database.query(
      `update ${this.table} set comment = ?, vote = ? where id = ?`,
      [comment.comment, comment.vote, comment.commentid]
    );
  }
}

module.exports = CommentsManager;
