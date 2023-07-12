import { useState, useContext, useEffect } from "react";
import axios from "axios";
import Dropzone from "../../../services/hookDropzone";
import userContext from "../../../contexts/userContext";

export default function ModifyMyProfil() {
  const { user, setUser } = useContext(userContext);
  const [currentUser, setCurrentUser] = useState([]);
  const [reinicializePassword, setReinicializePassword] = useState(false);
  const [dropzoneImage, setDropzoneImage] = useState([]);
  const [newUploadedFileName, setNewUploadedFileName] = useState("");

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
    axios
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
      .catch((err) => console.error(err));
    setReinicializePassword(true);
  };

  return (
    <form className="modify-my-profil-management" onSubmit={submit}>
      <div className="add-user-title-container">
        <h2 className="add-user-title">Modification d'utilisateur</h2>
        <div className="close-modal-button-container">
          <button type="button" className="close-modal-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-x"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
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
          <div className="add-remove-buttons-container-1">
            <div className="add-button-container-1">
              <button type="submit">Valider les modifications</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
