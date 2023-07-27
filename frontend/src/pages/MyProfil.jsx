import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Slide, ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import Dropzone from "../services/hookDropzone";
import userContext from "../contexts/userContext";

export default function MyProfil() {
  const { user, setUser } = useContext(userContext);
  const [currentUser, setCurrentUser] = useState([]);
  const [reinicializePassword, setReinicializePassword] = useState(false);
  const [dropzoneImage, setDropzoneImage] = useState([]);
  const [newUploadedFileName, setNewUploadedFileName] = useState("");
  const { t } = useTranslation();

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
    if (newUploadedFileName === "")
      toast.error(t("Toast.userNotModifyNotif"), {
        color: "white",
        backgroundColor: "red",
        icon: "❌",
      });

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
        toast.success(t("Toast.userModifNotif"), {
          color: "white",
          backgroundColor: "green",
          icon: "✔️",
        });
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
      .then(() => toast.success(t("Toast.send")))
      .catch((err) => {
        toast.error(t("Toast.notSend"), {
          color: "white",
          backgroundColor: "red",
          icon: "❌",
        });
        console.error(err);
      });
    setReinicializePassword(true);
  };

  return (
    <>
      <form className="modify-my-profil-management" onSubmit={submit}>
        <div className="add-user-title-container">
          <h2 className="add-user-title">{t("modifyProfil.myProfile")}</h2>
        </div>
        <div className="user-management-container">
          <div className="input-container">
            <div className="input-fields">
              <div className="input-fields name-inputs-container">
                <label htmlFor="lastName" className="lastName">
                  {t("modifyProfil.lastname")} <br />
                  <p>{currentUser.lastname}</p>
                </label>
                <label htmlFor="firstName" className="firstName">
                  {t("modifyProfil.firstname")} <br />
                  <p>{currentUser.firstname}</p>
                </label>
              </div>
              <label htmlFor="email">
                {t("modifyProfil.mail")} <br />
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
                    {t("modifyProfil.resetPassword")}
                  </span>
                ) : (
                  <span> {t("modifyProfil.passReseted")}</span>
                )}
              </div>
              <div className="roles-container-1">
                <div className="role-actuel-container">
                  <div className="role">
                    <h4 className="role-actuel-title">
                      {" "}
                      {t("modifyProfil.roles")}{" "}
                    </h4>
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
                    src={
                      currentUser.photo === "default_avatar.png"
                        ? `${import.meta.env.VITE_BACKEND_URL}/assets/images/${
                            currentUser.photo
                          }`
                        : `${import.meta.env.VITE_BACKEND_URL}/uploads/${
                            currentUser.photo
                          }`
                    }
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
                <h4 className="role-actuel-title">
                  {" "}
                  {t("modifyProfil.roles")}{" "}
                </h4>
                <span className="role-actuel-data">{currentUser?.roles}</span>
              </div>
            </div>
            <div className="add-button-container-1">
              <button type="submit">{t("modifyProfil.validation")}</button>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer autoClose={1500} transition={Slide} />
    </>
  );
}
