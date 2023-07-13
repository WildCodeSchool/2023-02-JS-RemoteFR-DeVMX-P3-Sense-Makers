export default function MonthlyStats() {
  return (
    <>
      <div className="round-container">
        <p className="total-decisions">146</p>
        <p className="round-text">décisions au total</p>
        <p className="round-text">dont</p>
        <p className="decisions-created">24</p>
        <p className="round-text">débutées ce mois</p>
      </div>
      <div className="first-square-container">
        <div>
          <div>
            <p className="total-numbers">12</p>
            <p>prises de décisions en attente</p>
          </div>
          <p className="total-numbers">3</p>
          <p>premières décisions prises</p>
        </div>
        <div>
          <div>
            <p className="total-numbers">12</p>
            <p>décisions définitives en attente d'experts</p>
          </div>
          <p className="total-numbers">3</p>
          <p>décisions non abouties</p>
        </div>
        <div>
          <div>
            <p className="total-numbers">12</p>
            <p>décisions définitives validées</p>
          </div>
          <p className="total-numbers">3</p>
          <p>décisions définitives non validées</p>
        </div>
      </div>
    </>
  );
}
