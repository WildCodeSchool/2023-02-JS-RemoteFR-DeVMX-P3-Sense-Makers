import AdminProfil from "../components/Profils/AdminProfil";
import UserProfil from "../components/Profils/UserProfil";

export default function Profil() {
  return (
    <div className="profil">
      <AdminProfil />
      <UserProfil />
    </div>
  );
}
