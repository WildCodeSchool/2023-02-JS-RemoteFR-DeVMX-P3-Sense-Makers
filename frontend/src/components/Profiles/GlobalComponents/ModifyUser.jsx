import { useState, useEffect } from "react";
import axios from "axios";
import Dropzone from "../../../services/hookDropzone";
import Avatar0 from "../../../assets/avatar0.png";

export default function ModifyUser() {
  const [dataUser, setDataUser] = useState([]);
  const [dropzoneImage, setDropzoneImage] = useState([]);
  const [newUploadedFileName, setNewUploadedFileName] = useState("");
  const [targetValues, setTargetValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    photo: "",
    role: 0,
    roleExpert: false,
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
      targetValues.firstName = dataUser.firstname;

    if (targetValues.lastName === "") targetValues.lastName = dataUser.lastname;

    if (targetValues.email === "") targetValues.email = dataUser.email;

    if (targetValues.photo === "") targetValues.photo = dataUser.photo;

    if (targetValues.role === "") targetValues.role = dataUser.role_id;

    if (targetValues.roleExpert === "")
      targetValues.roleExpert = dataUser.is_expert;
  };

  const submit = (event) => {
    event.preventDefault();

    subitOldAndNewValues();

    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/users/${dataUser.id}`, {
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
      .get(`${import.meta.env.VITE_BACKEND_URL}/users/2`)
      .then((result) => {
        console.info("User data on DB", result.data);
        setDataUser(result.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <form className="user-management" onSubmit={submit}>
      <div className="input-container">
        <h2 className="input-title">Modification d'utilisateur</h2>
        <div className="input-fields">
          <label htmlFor="lastName">
            Nom <br />
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder={dataUser.lastname}
              onChange={update}
            />
          </label>
          <label htmlFor="firstName">
            Prénom <br />
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder={dataUser.firstname}
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
              placeholder={dataUser.email}
              onChange={update}
            />
          </label>
          <label htmlFor="password">
            Mot de passe <br />
            <input
              type="password"
              id="password"
              name="password"
              placeholder={dataUser.password}
              onChange={update}
            />
          </label>
          <div className="roles-container">
            <label htmlFor="role">
              Role <br />
              <select
                id="role"
                name="role"
                onChange={update}
                selected={dataUser.role_id}
              >
                <option value="0">Sélectionne votre role</option>
                <option value="1">Admin</option>
                <option value="2">Utilisateur</option>
              </select>
            </label>
            <label htmlFor="role-expert" className="role-expert">
              Expert <br />
              <input
                type="checkbox"
                id="role-expert"
                name="roleExpert"
                onChange={update}
              />
            </label>
          </div>
        </div>
      </div>
      <div className="profile-photo-container">
        <label htmlFor="profile-photo-input">
          <Dropzone
            className="dropzone"
            dropzoneImage={dropzoneImage}
            setDropzoneImage={setDropzoneImage}
            setNewUploadedFileName={setNewUploadedFileName}
          />

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
                dataUser?.photo
                  ? `${import.meta.env.VITE_BACKEND_URL}/uploads/${
                      dataUser.photo
                    }`
                  : Avatar0
              }
              alt="profil"
            />
          )}
        </label>
      </div>
      <div className="input-buttons-container">
        {/* <div className="remove-button-container">
          <button type="submit">Supprimer l'utilisateur</button>
        </div> */}
        <div className="add-button-container">
          <button type="submit">Modifier l'utilisateur</button>
        </div>
      </div>
    </form>
  );
}
