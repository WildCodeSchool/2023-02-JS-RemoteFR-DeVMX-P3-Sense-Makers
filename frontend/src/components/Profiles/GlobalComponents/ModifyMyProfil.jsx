import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Slide, ToastContainer, toast } from "react-toastify";
import Dropzone from "../../../services/hookDropzone";
import userContext from "../../../contexts/userContext";

export default function ModifyMyProfil() {
  const { user, setUser } = useContext(userContext);
  const [currentUser, setCurrentUser] = useState([]);
  const [reinicializePassword, setReinicializePassword] = useState(false);
  const [dropzoneImage, setDropzoneImage] = useState([]);
  const [newUploadedFileName, setNewUploadedFileName] = useState("");

  const userModifNotif = () => {
    toast.success("utilisateur modifié", {
      color: "white",
      backgroundColor: "green",
      icon: "✔️",
    });
  };
  const userNotModifyNotif = () => {
    toast.error("Aucune modification effectué", {
      color: "white",
      backgroundColor: "red",
      icon: "❌",
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

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users/${user.id}`, {
        withCredentials: true,
      })
      .then((response) => setCurrentUser(response.data[0]))
      .catch((err) => console.error(err));
  }, []);

  const submit = (event) => {
    event.preventDefault();
    if (newUploadedFileName === "") return userNotModifyNotif();

    return axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/users/${currentUser.id}/myprofil`,
        {
          photo:
            newUploadedFileName !== ""
              ? newUploadedFileName
              : currentUser.photo,
        },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        userModifNotif();
        setTimeout(() => {
          axios
            .get(
              `${import.meta.env.VITE_BACKEND_URL}/users/${currentUser.id}`,
              {
                withCredentials: true,
              }
            )
            .then((result) => {
              setUser((previousState) => ({
                ...previousState,
                photo: result.data[0].photo,
              }));
            })
            .catch((err) => console.error(err));
        }, 500);
      })
      .catch((err) => console.error(err));
  };

  const sendEmailToReinitializePassword = () => {
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/forgotpassword`,
        {
          email: currentUser.email,
        },
        {
          withCredentials: true,
        }
      )
      .then(() => emailSend())
      .catch((err) => {
        emailNotSend();
        console.error(err);
      });
    setReinicializePassword(true);
  };

  return (
    <>
      <form className="modify-my-profil-management" onSubmit={submit}>
        <div className="add-user-title-container">
          <h2 className="add-user-title">Modification d'utilisateur</h2>
        </div>
        <div className="user-management-container">
          <div className="input-container">
            <div className="input-fields">
              <div className="input-fields name-inputs-container">
                <label htmlFor="lastName" className="lastName">
                  Nom <br />
                  <p>{currentUser.lastname}</p>
                </label>
                <label htmlFor="firstName" className="firstName">
                  Prénom <br />
                  <p>{currentUser.firstname}</p>
                </label>
              </div>
              <label htmlFor="email">
                Email <br />
                <p>{currentUser.email}</p>
              </label>
              <div className="reinicialize-password-container">
                {!reinicializePassword ? (
                  <span
                    role="button"
                    tabIndex="0"
                    onKeyDown={() => {}}
                    className="reinicialize-password"
                    onClick={sendEmailToReinitializePassword}
                  >
                    Réinitialiser le mot de passe!
                  </span>
                ) : (
                  <span> Mot de passe réinitialisée!!!</span>
                )}
              </div>
              <div className="roles-container-1">
                <div className="role-actuel-container">
                  <div className="role">
                    <h4 className="role-actuel-title"> Rôle(s) actuel(s) </h4>
                    <p className="role-actuel-data">{currentUser?.roles}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="profile-photo-container">
            <label htmlFor="profile-photo-input">
              <div className="img-container">
                {dropzoneImage[0]?.preview ? (
                  <img src={dropzoneImage[0]?.preview} alt="profil" />
                ) : (
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${
                      currentUser?.photo
                    }`}
                    alt="profil"
                  />
                )}
              </div>
              <Dropzone
                className="dropzone"
                dropzoneImage={dropzoneImage}
                setDropzoneImage={setDropzoneImage}
                setNewUploadedFileName={setNewUploadedFileName}
              />
            </label>
          </div>
          <div className="input-buttons-container">
            <div className="roles-container-2">
              <div className="role-actuel">
                <h4 className="role-actuel-title"> Rôle(s) actuel(s) </h4>
                <span className="role-actuel-data">{currentUser?.roles}</span>
              </div>
            </div>
            <div className="add-button-container-1">
              <button type="submit">Valider les modifications</button>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer autoClose={1500} transition={Slide} />
    </>
  );
}
