export default function MonthlyStats() {
  return (
    <div className="global-monthly-stats-container">
      <div className="round-container">
        <p className="total-decisions text">146</p>
        <p className="round-text text">décisions au total, dont</p>
        <p className="decisions-created text">24</p>
        <p className="round-text text">débutées ce mois</p>
      </div>
      <div className="first-square-container card">
        <div className="top-div-in-square-containers">
          <p className="total-numbers text">12</p>
          <p className="title text">prises de décisions en attente</p>
        </div>
        <p className="total-numbers text">3</p>
        <p className="title text">premières décisions prises</p>
      </div>
      <div className="second-square-container card">
        <div className="top-div-in-square-containers">
          <p className="total-numbers text">12</p>
          <p className="title text">
            décisions définitives en attente d'experts
          </p>
        </div>
        <p className="total-numbers text">3</p>
        <p className="title text">décisions non abouties</p>
      </div>
      <div className="third-square-container card">
        <div className="top-div-in-square-containers">
          <p className="total-numbers text">12</p>
          <p className="title text">décisions définitives validées</p>
        </div>
        <p className="total-numbers text">3</p>
        <p className="title text">décisions définitives non validées</p>
      </div>
    </div>
  );
}
