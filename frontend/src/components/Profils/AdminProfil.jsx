import DecisionsDetails from "./AdminComponents/DecisionsDetails";
import DecisionsManagement from "./AdminComponents/DecisionsManagement";
import UserManagement from "./AdminComponents/UserManagement";
import "../../scss/Profils_scss/adminProfil.scss";

export default function AdminProfil() {
  return (
    <div className="adminProfil">
      <DecisionsDetails />
      <UserManagement />
      <DecisionsManagement />
    </div>
  );
}
