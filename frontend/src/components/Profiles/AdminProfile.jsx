import DecisionsDetails from "./AdminComponents/DecisionsDetails";
import DecisionsManagement from "./AdminComponents/DecisionsManagement";
import UsersList from "./AdminComponents/UsersList";

export default function AdminProfile() {
  return (
    <div className="adminProfile">
      <DecisionsDetails />
      <DecisionsManagement />
      <details>
        <summary>
          Statistiques
          <hr />
        </summary>
        <UsersList />
      </details>
      <details>
        <summary>
          Gestion des utilisateurs
          <hr />
        </summary>
        <UsersList />
      </details>
      <details>
        <summary>
          Gestion des decisions
          <hr />
        </summary>
        <UsersList />
      </details>
    </div>
  );
}
