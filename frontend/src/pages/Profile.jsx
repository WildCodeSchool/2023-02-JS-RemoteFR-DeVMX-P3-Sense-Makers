import AdminProfile from "../components/Profiles/AdminProfile";
import UserProfile from "../components/Profiles/UserProfile";

export default function Profile() {
  return (
    <div className="profile">
      <AdminProfile /> <UserProfile />
    </div>
  );
}
