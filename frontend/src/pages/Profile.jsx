import AdminProfile from "../components/Profiles/AdminProfile";
import UserProfile from "../components/Profiles/UserProfile";
import userContext from "../contexts/userContext";

export default function Profile() {
  const { user } = userContext(userContext);
  return (
    <div className="profile">
      {user.role_id === 1 ? <AdminProfile /> : <UserProfile />}
    </div>
  );
}
