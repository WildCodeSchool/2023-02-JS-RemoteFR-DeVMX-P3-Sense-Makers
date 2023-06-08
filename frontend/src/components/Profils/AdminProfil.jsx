import DecisionsDetails from "./AdminComponents/DecisionsDetails";
import DecisionsManagement from "./AdminComponents/DecisionsManagement";
import UserManagement from "./AdminComponents/UserManagement";

export default function AdminProfil() {
  return (
    <div className="adminProfil">
      <DecisionsDetails />
      <UserManagement />
      <DecisionsManagement />
    </div>
  );
}
