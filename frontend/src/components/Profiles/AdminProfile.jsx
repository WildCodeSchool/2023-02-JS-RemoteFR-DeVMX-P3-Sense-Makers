import DecisionsDetails from "./AdminComponents/DecisionsDetails";
import DecisionsManagement from "./AdminComponents/DecisionsManagement";
import AddUser from "./AdminComponents/AddUser";

export default function AdminProfile() {
  return (
    <div className="adminProfile">
      <DecisionsDetails />
      <AddUser />
      <DecisionsManagement />
    </div>
  );
}
