import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import axios from "axios";
import {
  userModifNotif,
  userDeleteNotif,
  emailSend,
  emailNotSend,
} from "../../services/toast";
import Dropzone from "../../services/hookDropzone";

export default function ModifyUser({
  setShowUpdateUser,
  setCurrentUser,
  currentUser,
}) {
  const [dropzoneImage, setDropzoneImage] = useState([]);
  const [newUploadedFileName, setNewUploadedFileName] = useState("");
  const [rolesData, setRolesData] = useState([]);
  const [rolesFromUser, setRolesFromUser] = useState([]);
  const [reinicializePassword, setReinicializePassword] = useState(false);
  const { t } = useTranslation();

  const [targetValues, setTargetValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    photo: "",
    role: "",
    roleExpert: "",
  });

  const update = (event) => {
    const target = event.currentTarget;

    setTargetValues({
      ...targetValues,
      [target.name]: target.type === "checkbox" ? target.checked : target.value,
    });
  };

  const submit = (event) => {
    event.preventDefault();
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/users/${currentUser.id}`,
        {
          firstname:
            targetValues.firstname !== ""
              ? targetValues.firstname
              : currentUser.firstname,
          lastname:
            targetValues.lastname !== ""
              ? targetValues.lastname
              : currentUser.lastname,
          photo:
            newUploadedFileName !== ""
              ? newUploadedFileName
              : currentUser.photo,
          email:
            targetValues.email !== "" ? targetValues.email : currentUser.email,
          password:
            targetValues.password !== ""
              ? targetValues.password
              : currentUser.password,
        },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        if (targetValues.role !== "") {
          axios
            .put(
              `${import.meta.env.VITE_BACKEND_URL}/users/${
                currentUser.id
              }/role`,
              { role: targetValues.role },
              {
                withCredentials: true,
              }
            )
            .catch((err) => console.error(err));
        }

        if (targetValues.roleExpert === true && rolesFromUser.length <= 1) {
          axios
            .post(
              `${import.meta.env.VITE_BACKEND_URL}/users/${
                currentUser.id
              }/role`,
              { roleId: 3 },
              {
                withCredentials: true,
              }
            )
            .catch((err) => console.error(err));
        }

        if (targetValues.roleExpert === false && rolesFromUser.length >= 2) {
          axios
            .delete(
              `${import.meta.env.VITE_BACKEND_URL}/users/${
                currentUser.id
              }/roleexpert`,
              {
                withCredentials: true,
              }
            )
            .catch((err) => console.error(err));
        }
      })
      .then(() => {
        userModifNotif();
        setShowUpdateUser(false);
        setTimeout(() => {
          axios
            .get(
              `${import.meta.env.VITE_BACKEND_URL}/users/${currentUser.id}`,
              {
                withCredentials: true,
              }
            )
            .then((result) => {
              setCurrentUser(result.data[0]);
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
      .then((response) => {
        if (response.status === 200) {
          setShowUpdateUser(false);
          emailSend();
        } else {
          emailNotSend();
        }
      })
      .catch((err) => {
        console.error(err);
        return setReinicializePassword(false);
      });
  };

  const deactivateUser = () => {
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/users/${currentUser.id}/isactive`,
        { isActive: false },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        userDeleteNotif();
      })
      .catch((err) => console.error(err));
    setShowUpdateUser(false);
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/roles`, {
        withCredentials: true,
      })
      .then((response) => setRolesData(response.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const splitUserRoles = currentUser.roles?.split(", ");
    setRolesFromUser(splitUserRoles);
  }, [currentUser]);

  return (
    <form className="modify-user-management" onSubmit={submit}>
      <div className="add-user-title-container">
        <h2 className="add-user-title">{t("modifyProfil.userModif")}</h2>
        <div className="close-modal-button-container">
          <div className="close-btn">
            <button type="button" onClick={() => setShowUpdateUser(false)}>
              {" "}
              X{" "}
            </button>
          </div>
        </div>
        <div className="remove-button-container-2">
          <button type="button" onClick={deactivateUser}>
            {t("modifyProfil.modifyUser.delete")}
          </button>
        </div>
      </div>
      <div className="user-management-container">
        <div className="input-container">
          <div className="input-fields">
            <div className="input-fields name-inputs-container">
              <label htmlFor="lastName" className="lastName">
                {t("modifyProfil.lastname")} <br />
                <input
                  type="text"
                  name="lastname"
                  placeholder={currentUser.lastname}
                  onChange={update}
                />
              </label>
              <label htmlFor="firstName" className="firstName">
                {t("modifyProfil.firstname")} <br />
                <input
                  type="text"
                  name="firstname"
                  placeholder={currentUser.firstname}
                  onChange={update}
                />
              </label>
            </div>
            <label htmlFor="email">
              {t("modifyProfil.mail")} <br />
              <input
                type="email"
                name="email"
                className="input-email"
                placeholder={currentUser.email}
                onChange={update}
              />
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
                <label htmlFor="role">
                  {t("modifyProfil.modifyUser.role")} <br />
                  <select name="role" onChange={update}>
                    <option value="0">
                      {t("modifyProfil.modifyUser.roleSelect")}
                    </option>
                    {rolesData
                      .filter((roleExpert) => roleExpert.role_name !== "Expert")
                      .map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.role_name}
                        </option>
                      ))}
                  </select>
                </label>
                <label htmlFor="roleExpert" className="role-expert">
                  {rolesFromUser?.length > 1 ? (
                    <input
                      type="checkbox"
                      name="roleExpert"
                      defaultChecked
                      onClick={update}
                    />
                  ) : (
                    <input type="checkbox" name="roleExpert" onClick={update} />
                  )}
                  {t("modifyProfil.modifyUser.expert")}
                </label>
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
              <h4 className="role-actuel-title">{t("modifyProfil.roles")}</h4>
              <span className="role-actuel-data">{currentUser?.roles}</span>
              <label htmlFor="role">
                {t("modifyProfil.modifyUser.role")} <br />
                <select name="role" onChange={update}>
                  <option value="0">
                    {t("modifyProfil.modifyUser.roleSelect")}
                  </option>
                  {rolesData
                    .filter((roleExpert) => roleExpert.role_name !== "Expert")
                    .map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.role_name}
                      </option>
                    ))}
                </select>
              </label>
              <label htmlFor="roleExpert" className="role-expert-2">
                {rolesFromUser?.length > 1 ? (
                  <input
                    type="checkbox"
                    name="roleExpert"
                    defaultChecked
                    onClick={update}
                  />
                ) : (
                  <input type="checkbox" name="roleExpert" onClick={update} />
                )}
                {t("modifyProfil.modifyUser.expert")}
              </label>
            </div>
          </div>
          <div className="add-remove-buttons-container-1">
            <div className="add-button-container-1">
              <button type="submit">{t("modifyProfil.validation")}</button>
            </div>
            <div className="remove-button-container-1">
              <button type="button" onClick={deactivateUser}>
                {t("modifyProfil.modifyUser.delete")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

ModifyUser.propTypes = {
  setShowUpdateUser: PropTypes.func.isRequired,
  setCurrentUser: PropTypes.func.isRequired,
  currentUser: PropTypes.shape().isRequired,
};
