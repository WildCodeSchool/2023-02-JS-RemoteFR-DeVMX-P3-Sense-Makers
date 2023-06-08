const AbstractManager = require("./AbstractManager");

class CommentsManager extends AbstractManager {
  constructor() {
    super({ table: "comments" });
  }

  insert(comment) {
    return this.database.query(
      `insert into ${this.table} (user_id, decision_id, creation_date, comment, vote) values (?,?,?,?,?)`,
      [
        comment.user_id,
        comment.decision_id,
        comment.creation_date,
        comment.comment,
        comment.vote,
      ]
    );
  }

  update(comment) {
    return this.database.query(
      `update ${this.table} set comment = ?, vote = ? where id = ?`,
      [comment.comment, comment.vote, comment.id]
    );
  }
}

module.exports = CommentsManager;
