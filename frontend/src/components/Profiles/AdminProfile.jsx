import DecisionsDetails from "./AdminComponents/DecisionsDetails";
import DecisionsManagement from "./AdminComponents/DecisionsManagement";
import AddUser from "./AdminComponents/AddUser";

export default function AdminProfile() {
  return (
    <div className="adminProfile">
      <DecisionsDetails />
      <DecisionsManagement />
      {/* <details>
        <summary> */}
      {/* Gestion des utilisateurs */}
      {/* <hr />
        </summary> */}
      <AddUser />
      {/* </details> */}
    </div>
  );
}
