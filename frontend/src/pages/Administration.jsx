import DecisionsDetails from "../components/Profiles/AdminComponents/DecisionsDetails";
import DecisionsList from "../components/Profiles/AdminComponents/DecisionsList";
import DecisionsManagement from "../components/Profiles/AdminComponents/DecisionsManagement";
import UsersList from "../components/Profiles/AdminComponents/UsersList";

export default function Administration() {
  return (
    <div className="admin-global-container">
      <DecisionsDetails />
      <DecisionsManagement />
      <details className="details-container">
        <summary>
          Statistiques
          <hr />
        </summary>
      </details>
      <details className="details-container">
        <summary>
          Gestion des utilisateurs
          <hr />
        </summary>
        <UsersList />
      </details>
      <details className="details-container">
        <summary>
          Gestion des decisions
          <hr />
        </summary>
        <DecisionsList />
      </details>
    </div>
  );
}
