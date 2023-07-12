import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Dropzone from "../../../services/hookDropzone";

export default function ModifyUser({
  setShowUpdateUser,
  setCurrentUser,
  currentUser,
  userModifNotif,
  userDeleteNotif,
  emailSend,
  emailNotSend,
}) {
  const [dropzoneImage, setDropzoneImage] = useState([]);
  const [newUploadedFileName, setNewUploadedFileName] = useState("");
  const [rolesData, setRolesData] = useState([]);
  const [rolesFromUser, setRolesFromUser] = useState([]);
  const [reinicializePassword, setReinicializePassword] = useState(false);

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
        }
        emailNotSend();
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
        setShowUpdateUser(false);
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
        <h2 className="add-user-title">Modification d'utilisateur</h2>
        <div className="close-modal-button-container">
          <button
            type="button"
            className="close-modal-button"
            onClick={() => setShowUpdateUser(false)}
          >
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
        <div className="remove-button-container-2">
          <button type="button" onClick={deactivateUser}>
            Supprimer
          </button>
        </div>
      </div>
      <div className="user-management-container">
        <div className="input-container">
          <div className="input-fields">
            <div className="input-fields name-inputs-container">
              <label htmlFor="lastName" className="lastName">
                Nom <br />
                <input
                  type="text"
                  name="lastname"
                  placeholder={currentUser.lastname}
                  onChange={update}
                />
              </label>
              <label htmlFor="firstName" className="firstName">
                Prénom <br />
                <input
                  type="text"
                  name="firstname"
                  placeholder={currentUser.firstname}
                  onChange={update}
                />
              </label>
            </div>
            <label htmlFor="email">
              Email <br />
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
                <label htmlFor="role">
                  Rôle <br />
                  <select name="role" onChange={update}>
                    <option value="0">Sélectionne votre rôle</option>
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
                  Expert(e)
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
              <label htmlFor="role">
                Rôle <br />
                <select name="role" onChange={update}>
                  <option value="0">Sélectionne votre rôle</option>
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
                Expert(e)
              </label>
            </div>
          </div>
          <div className="add-remove-buttons-container-1">
            <div className="add-button-container-1">
              <button type="submit">Valider les modifications</button>
            </div>
            <div className="remove-button-container-1">
              <button type="button" onClick={deactivateUser}>
                Supprimer
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
  userModifNotif: PropTypes.func.isRequired,
  userDeleteNotif: PropTypes.func.isRequired,
  emailSend: PropTypes.func.isRequired,
  emailNotSend: PropTypes.func.isRequired,
};
