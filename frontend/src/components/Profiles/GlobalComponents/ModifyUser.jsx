import { useState, useEffect } from "react";
import axios from "axios";
import Dropzone from "../../../services/hookDropzone";
// import inputValidationRules from "../../../services/inputValidationRules";
import Avatar0 from "../../../assets/avatar0.png";

export default function ModifyUser() {
  const [userData, setUserData] = useState([]);
  const [dropzoneImage, setDropzoneImage] = useState([]);
  const [newUploadedFileName, setNewUploadedFileName] = useState("");
  const [targetValues, setTargetValues] = useState({
    firstName: userData.firstname,
    lastName: userData.lastname,
    email: userData.email,
    password: userData.password,
    photo: userData.photo,
    role: userData.role_id,
  });

  const update = (event) => {
    const target = event.currentTarget;

    setTargetValues({
      ...targetValues,
      [target.name]: target.type === "checkbox" ? target.checked : target.value,
    });
  };

  const subitOldAndNewValues = () => {
    if (targetValues.firstName === "")
      targetValues.firstName = userData.firstname;

    if (targetValues.lastName === "") targetValues.lastName = userData.lastname;

    if (targetValues.email === "") targetValues.email = userData.email;

    if (targetValues.photo === "") targetValues.photo = userData.photo;

    if (targetValues.role === "") targetValues.role = userData.role_id;

    if (targetValues.roleExpert === "")
      targetValues.roleExpert = userData.is_expert;
  };

  const submit = (event) => {
    event.preventDefault();

    subitOldAndNewValues();

    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/users/${userData.id}`, {
        firstname: targetValues.firstName,
        lastname: targetValues.lastName,
        photo: newUploadedFileName,
        email: targetValues.email,
        password: targetValues.password,
        role_id: targetValues.role,
        is_expert: targetValues.roleExpert,
        creation_date: "2023-02-03",
      })
      .then((response) =>
        console.info({ message: "Update user done!!!", response })
      )
      .catch((err) => console.error(err));
    console.info("Submited new values form with state:", targetValues);
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users/1`)
      .then((result) => {
        console.info("User data on DB", result.data);
        setUserData(result.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <form className="user-management" onSubmit={submit}>
      <div className="profile-photo-container">
        <label htmlFor="profile-photo-input">
          {dropzoneImage[0]?.preview ? (
            <img
              src={
                dropzoneImage[0]?.preview ? dropzoneImage[0]?.preview : Avatar0
              }
              alt="profil"
            />
          ) : (
            <img
              src={
                userData?.photo
                  ? `${import.meta.env.VITE_BACKEND_URL}/uploads/${
                      userData.photo
                    }`
                  : Avatar0
              }
              alt="profil"
            />
          )}
          <Dropzone
            className="dropzone"
            dropzoneImage={dropzoneImage}
            setDropzoneImage={setDropzoneImage}
            setNewUploadedFileName={setNewUploadedFileName}
          />
        </label>
      </div>
      <div className="input-container">
        <h2 className="input-title">Modification d'utilisateur</h2>
        <div className="input-fields">
          <label htmlFor="lastName">
            Nom <br />
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder={userData.lastname}
              onChange={update}
            />
          </label>
          <label htmlFor="firstName">
            Prénom <br />
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder={userData.firstname}
              onChange={update}
            />
          </label>
          <label htmlFor="email">
            Email <br />
            <input
              type="email"
              id="email"
              name="email"
              className="input-email"
              placeholder={userData.email}
              onChange={update}
            />
          </label>
          <label htmlFor="password">
            Mot de passe <br />
            <input
              type="password"
              id="password"
              name="password"
              placeholder={userData.password}
              onChange={update}
            />
          </label>
          <div className="roles-container">
            <label htmlFor="role">
              Role <br />
              {parseInt(userData.role_id, 10) === 1 ? (
                <select
                  id="role"
                  name="role"
                  onChange={update}
                  // defaultValue={1}
                >
                  <option value="0">Sélectionne votre role</option>
                  <option value="1">Admin</option>
                  <option value="2">Utilisateur</option>
                </select>
              ) : (
                <select
                  id="role"
                  name="role"
                  onChange={update}
                  // defaultValue={2}
                >
                  <option value="0">Sélectionne votre role</option>
                  <option value="1">Admin</option>
                  <option value="2">Utilisateur</option>
                </select>
              )}
            </label>
            <label htmlFor="role-expert" className="role-expert">
              Expert <br />
              {parseInt(userData.is_expert, 10) === 1 ? (
                <input
                  type="checkbox"
                  id="role-expert"
                  name="roleExpert"
                  onChange={update}
                />
              ) : (
                <input
                  type="checkbox"
                  id="role-expert"
                  name="roleExpert"
                  onChange={update}
                />
              )}
            </label>
          </div>
        </div>
      </div>

      <div className="input-buttons-container">
        <div className="remove-button-container">
          <button type="submit">Supprimer</button>
        </div>
        <div className="add-button-container">
          <button type="submit">Valider les modifications</button>
        </div>
      </div>
    </form>
  );
}
