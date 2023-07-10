import DecisionsDetails from "./AdminComponents/DecisionsDetails";
import DecisionsList from "./AdminComponents/DecisionsList";
import DecisionsManagement from "./AdminComponents/DecisionsManagement";
import UsersList from "./AdminComponents/UsersList";

export default function AdminProfile() {
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
