const AbstractManager = require("./AbstractManager");

class DecisionManager extends AbstractManager {
  constructor() {
    super({ table: "decisions" });
  }

  insert(decision) {
    return this.database.query(
      `insert into ${this.table} (title, content, usefulness,context, benefit,disadvantages,concerned_hub,deadline,positives_votes, negatives_votes, status_id) values (?,?,?,?,?,?,?,?,?,?,?)`,
      [
        decision.title,
        decision.content,
        decision.usefulness,
        decision.context,
        decision.benefit,
        decision.disadvantages,
        decision.concerned_hub_id,
        decision.deadline,
        decision.positives_votes,
        decision.negatives_votes,
        decision.status_id,
      ]
    );
  }

  update(decision) {
    return this.database.query(
      `update ${this.table} set title = ?, content = ?, usefulness = ?,context = ?, benefit = ?,disadvantages = ?,positives_votes = ?, negatives_votes = ?, status_id = ? where id = ?`,
      [
        decision.title,
        decision.content,
        decision.usefulness,
        decision.context,
        decision.benefit,
        decision.disadvantages,
        decision.positives_votes,
        decision.negatives_votes,
        decision.status_id,
        decision.id,
      ]
    );
  }

  findAllDecisionsWithStatusAndNameOfCreatorForCard() {
    return this.database.query(
      `SELECT d.id, d.title AS title_decision, d.status_id, c.title, s.title AS title_status, u.firstname, u.lastname, u.photo  FROM ${this.table} d
     JOIN status s ON s.id = d.status_id
     INNER JOIN users_decisions ON users_decisions.decision_id = d.id
     INNER JOIN users u ON users_decisions.user_id = u.id
     INNER JOIN concernedhub c ON c.id=d.concerned_hub_id`
    );
  }

  findDecisionWithStatusById(id) {
    return this.database.query(
      `SELECT d.title AS title_decision, s.title AS title_status, d.content, d.context, d.usefulness, d.benefit, d.disadvantages, c.title, d.initial_date, d.deadline, u.firstname, u.lastname, u.photo FROM ${this.table} d
      INNER JOIN status s ON s.id = d.status_id
      INNER JOIN users_decisions ud ON d.id = ud.decision_id
      INNER JOIN users u ON ud.user_id = u.id 
      INNER JOIN concernedhub c ON c.id=d.concerned_hub_id
      where d.id = ?`,
      [id]
    );
  }

  findImpactedOnDecisionById(id) {
    return this.database.query(
      `SELECT u.id, u.firstname, u.lastname, u.photo FROM tagged_as_impacted ti
      INNER JOIN users u ON u.id = ti.user_id
    where ti.decision_id = ?`,
      [id]
    );
  }

  findExpertOnDecisionById(id) {
    return this.database.query(
      `SELECT u.id, u.firstname, u.lastname, u.photo  FROM tagged_as_experts te
      INNER JOIN users u ON u.id = te.user_id
    where te.decision_id = ?`,
      [id]
    );
  }

  insertImpactedOnDecisionById(impactedId, decisionId) {
    return this.database.query(
      `INSERT INTO tagged_as_impacted (user_id,decision_id) VALUES (?,?)`,
      [impactedId, decisionId]
    );
  }

  insertExpertOnDecisionById(expertId, decisionId) {
    return this.database.query(
      `INSERT INTO tagged_as_experts (user_id,decision_id)  VALUES (?,?)`,
      [expertId, decisionId]
    );
  }

  findConcernedHub() {
    return this.database.query(`SELECT * FROM concernedhub c`);
  }
}

module.exports = DecisionManager;
