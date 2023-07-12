import { Slide, ToastContainer, toast } from "react-toastify";
import AdminProfile from "../components/Profiles/AdminProfile";
import UserProfile from "../components/Profiles/UserProfile";

export default function Profile() {
  const userAddNotif = () => {
    toast.success("utilisateur ajouté", {
      color: "white",
      backgroundColor: "green",
      icon: "✔️",
    });
    toast.success("email envoyé", {
      color: "white",
      backgroundColor: "green",
      icon: "✔️",
    });
  };

  const userNotAddNotif = () => {
    toast.error("l'email existe déjà", {
      color: "white",
      backgroundColor: "red",
      icon: "❌",
    });
  };

  const userModifNotif = () => {
    toast.success("utilisateur modifié", {
      color: "white",
      backgroundColor: "green",
      icon: "✔️",
    });
  };
  const userDeleteNotif = () => {
    toast.success("utilisateur supprimé", {
      color: "white",
      backgroundColor: "green",
      icon: "✔️",
    });
  };
  const emailSend = () => {
    toast.success("email envoyé", {
      color: "white",
      backgroundColor: "green",
      icon: "✔️",
    });
  };
  const emailNotSend = () => {
    toast.error("email non envoyé", {
      color: "white",
      backgroundColor: "red",
      icon: "❌",
    });
  };

  return (
    <div className="profile">
      <AdminProfile
        userAddNotif={userAddNotif}
        userNotAddNotif={userNotAddNotif}
        userModifNotif={userModifNotif}
        userDeleteNotif={userDeleteNotif}
        emailSend={emailSend}
        emailNotSend={emailNotSend}
      />{" "}
      <UserProfile />
      <ToastContainer autoClose={1500} transition={Slide} />
    </div>
  );
}
