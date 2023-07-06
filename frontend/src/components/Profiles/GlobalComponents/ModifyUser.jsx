import { useState, useEffect } from "react";
import axios from "axios";
import Dropzone from "../../../services/hookDropzone";
import Avatar0 from "../../../assets/avatar0.png";

export default function ModifyUser() {
  const [userData, setUserData] = useState([]);
  const [dropzoneImage, setDropzoneImage] = useState([]);
  const [newUploadedFileName, setNewUploadedFileName] = useState("");
  const [rolesData, setRolesData] = useState([]);
  const [rolesFromUser, setRolesFromUser] = useState([]);

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
      .put(`${import.meta.env.VITE_BACKEND_URL}/users/${userData.id}`, {
        firstname:
          targetValues.firstname !== ""
            ? targetValues.firstname
            : userData.firstname,
        lastname:
          targetValues.lastname !== ""
            ? targetValues.lastname
            : userData.lastname,
        photo: !newUploadedFileName && userData.photo,
        email: targetValues.email !== "" ? targetValues.email : userData.email,
        password:
          targetValues.password !== ""
            ? targetValues.password
            : userData.password,
      })
      .then((response) => {
        if (targetValues.role !== "") {
          axios
            .put(
              `${import.meta.env.VITE_BACKEND_URL}/users/${userData.id}/role`,
              { role: targetValues.role }
            )
            .then((res) => console.info(res))
            .catch((err) => console.error(err));
        }

        if (targetValues.roleExpert && rolesFromUser.length <= 1) {
          axios
            .post(
              `${import.meta.env.VITE_BACKEND_URL}/users/${userData.id}/role`,
              { roleExpert: 3 }
            )
            .then((res) => console.info(res))
            .catch((err) => console.error(err));
          console.info({
            message: "Add new expert user role done!!!",
            response,
          });
        }

        if (!targetValues.roleExpert && rolesFromUser.length >= 2) {
          axios
            .delete(
              `${import.meta.env.VITE_BACKEND_URL}/users/${
                userData.id
              }/roleexpert`
            )
            .then((res) => console.info(res))
            .catch((err) => console.error(err));
          console.info({
            message: "Delete expert user role done!!!",
            response,
          });
        }
      })
      .then(() => {
        setTimeout(() => {
          axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/users/4`)
            .then((result) => {
              setUserData(result.data[0]);
            })
            .catch((err) => console.error(err));
        }, 500);
      })
      .catch((err) => console.error(err));
    console.info("Submitted new values form with state:", targetValues);
  };

  const disableUser = () => {
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/users/${userData.id}/isactive`,
        { isActive: false }
      )
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/roles`)
      .then((response) => setRolesData(response.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users/4`)
      .then((result) => {
        setUserData(result.data[0]);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const sliptUserRoles = userData.roles?.split(", ");
    setRolesFromUser(sliptUserRoles);
  }, [userData]);

  return (
    <form className="modify-user-management" onSubmit={submit}>
      <div className="add-user-title-container">
        <h2 className="add-user-title">Modification d'utilisateur</h2>
        <div className="remove-button-container-2">
          <button type="button" onClick={disableUser}>
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
                  placeholder={userData.lastname}
                  onChange={update}
                />
              </label>
              <label htmlFor="firstName" className="firstName">
                Prénom <br />
                <input
                  type="text"
                  name="firstname"
                  placeholder={userData.firstname}
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
                placeholder={userData.email}
                onChange={update}
              />
            </label>
            <div className="roles-container-1">
              <div className="role-actuel-container">
                <div className="role">
                  <h4 className="role-actuel-title"> Rôle(s) actuel(s) </h4>
                  <p className="role-actuel-data">{userData?.roles}</p>
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
              {userData?.photo ? (
                <img
                  src={
                    userData
                      ? `${import.meta.env.VITE_BACKEND_URL}/uploads/${
                          userData?.photo
                        }`
                      : Avatar0
                  }
                  alt="profil"
                />
              ) : (
                <img
                  src={
                    dropzoneImage[0]?.preview
                      ? dropzoneImage[0]?.preview
                      : Avatar0
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
              <h4 className="role-actuel-title"> Rôle(s) actuel(s) </h4>
              <span className="role-actuel-data">{userData?.roles}</span>
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
              <button type="button" onClick={() => disableUser()}>
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
