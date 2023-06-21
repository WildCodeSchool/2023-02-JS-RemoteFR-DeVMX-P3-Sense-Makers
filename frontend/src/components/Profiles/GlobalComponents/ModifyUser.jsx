import { useState, useEffect } from "react";
import axios from "axios";
import Dropzone from "../../../services/hookDropzone";
import isValidEmail from "../../../services/isValidEmail";
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

  const isValidPhoto = () => {
    if (dropzoneImage.length === 0) return false;
    return true;
  };

  const validationRules = {
    firstName:
      !!targetValues.firstName && targetValues.firstName.match(/^ *$/) === null,
    lastName:
      !!targetValues.lastName && targetValues.lastName.match(/^ *$/) === null,
    email: isValidEmail(targetValues.email),
    password:
      !!targetValues.password &&
      targetValues.password.length > 8 &&
      targetValues.password.match(/^ *$/) === null,
    photo: isValidPhoto(),
    role: targetValues.role !== "0",
    roleExperts: true,
  };

  const submit = (event) => {
    event.preventDefault();

    const isValidForm = Object.values(validationRules).every((key) => key);

    if (isValidForm) {
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
        .then((response) => console.info(response))
        .catch((err) => console.error(err));
    } else {
      console.info("XXX Submitting form with state:", targetValues);
    }
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users/1`)
      .then((result) => {
        console.info(result);
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
              placeholder="Insérez votre nom"
              defaultValue={dataUser.lastname}
              onChange={update}
              required
            />
          </label>
          <label htmlFor="firstName">
            Prénom <br />
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Insérez votre prénom"
              defaultValue={dataUser.firstname}
              onChange={update}
              required
            />
          </label>
          <label htmlFor="email">
            Email <br />
            <input
              type="email"
              id="email"
              name="email"
              className="input-email"
              placeholder="Insérez votre email"
              defaultValue={dataUser.email}
              onChange={update}
              required
            />
          </label>
          <label htmlFor="password">
            Mot de passe <br />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Insérez votre mot de passe"
              defaultValue={dataUser.password}
              onChange={update}
              required
            />
          </label>
          <div className="roles-container">
            <label htmlFor="role">
              Role <br />
              <select id="role" name="role" onChange={update} required>
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
        <div className="remove-button-container">
          <button type="submit">Supprimer l'utilisateur</button>
        </div>
        <div className="add-button-container">
          <button type="submit">Modifier l'utilisateur</button>
        </div>
      </div>
    </form>
  );
}
