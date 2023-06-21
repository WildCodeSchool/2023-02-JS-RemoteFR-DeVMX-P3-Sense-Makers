import DecisionsDetails from "./AdminComponents/DecisionsDetails";
import DecisionsManagement from "./AdminComponents/DecisionsManagement";
import UserManagement from "./AdminComponents/UserManagement";

export default function AdminProfile() {
  return (
    <div className="adminProfile">
      <DecisionsDetails />
      <UserManagement />
      <DecisionsManagement />
    </div>
  );
}
